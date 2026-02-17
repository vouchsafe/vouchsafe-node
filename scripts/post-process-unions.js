#!/usr/bin/env node
/**
 * Post-process generated TypeScript to fix discriminated unions.
 * 
 * This is a general purpose solution that automatically detects and fixes
 * ALL discriminated unions without hardcoded type names.
 */

const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, '../src/openapi/models');

console.log('Post-processing generated TypeScript files...');

// Step 1: Scan the patched OpenAPI spec to find all discriminated unions
const swaggerPath = path.join(__dirname, '../swagger-temp.json');
let discriminatedUnions = [];

if (fs.existsSync(swaggerPath)) {
  console.log('✓ Scanning OpenAPI spec for discriminated unions...');
  const swagger = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));
  
  // Find all schemas with anyOf
  for (const [schemaName, schema] of Object.entries(swagger.components?.schemas || {})) {
    if (!schema.anyOf || schema.anyOf.length === 0) continue;
    
    // Already has discriminator mapping? Use it
    if (schema.discriminator?.mapping) {
      discriminatedUnions.push({
        schemaName,
        discriminatorProperty: schema.discriminator.propertyName,
        mapping: schema.discriminator.mapping,
        variantCount: Object.keys(schema.discriminator.mapping).length
      });
      console.log(`  Found: ${schemaName} (${Object.keys(schema.discriminator.mapping).length} variants, discriminator: ${schema.discriminator.propertyName})`);
      continue;
    }
    
    // No discriminator? Try to infer it
    console.log(`  Found anyOf without discriminator: ${schemaName}`);
    
    const result = inferDiscriminator(swagger, schema, schemaName);
    if (result) {
      discriminatedUnions.push(result);
      console.log(`    Inferred: ${schemaName} (${result.variantCount} variants, discriminator: ${result.discriminatorProperty})`);
    } else {
      console.log(`    ⚠️  Could not infer discriminator for ${schemaName}`);
    }
  }
}

if (discriminatedUnions.length === 0) {
  console.log('⚠️  No discriminated unions found in OpenAPI spec');
  console.log('✅ Post-processing complete (nothing to fix)');
  process.exit(0);
}

console.log(`\n✓ Found ${discriminatedUnions.length} discriminated union(s) to fix\n`);

// Step 2: Fix each discriminated union
for (const union of discriminatedUnions) {
  const { schemaName, discriminatorProperty, mapping } = union;
  
  const fileName = schemaName.replace(/_/g, '');
  const filePath = path.join(modelsDir, `${fileName}.ts`);
  
  console.log(`  🔧 Fixing ${schemaName}...`);
  
  // Delete the file if it exists
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`     Deleted ${fileName}.ts`);
  }
  
  // Create proper union type
  createUnionType(schemaName, fileName, discriminatorProperty, mapping);
}

// Step 3: Fix imports in other files
console.log('\n✓ Scanning for files with broken imports...');
fixBrokenImports(discriminatedUnions);

console.log('\n✅ Post-processing complete!');

/**
 * Try to infer discriminator from anyOf variants
 */
function inferDiscriminator(swagger, schema, schemaName) {
  const variants = [];
  
  // Resolve all variant schemas
  for (const variant of schema.anyOf) {
    if (!variant.$ref) continue;
    
    const refSchemaName = variant.$ref.split('/').pop();
    const refSchema = swagger.components?.schemas?.[refSchemaName];
    if (!refSchema || !refSchema.properties) continue;
    
    variants.push({ refSchemaName, refSchema, ref: variant.$ref });
  }
  
  if (variants.length === 0) return null;
  
  // Find a property that exists in ALL variants and has enum values
  const firstVariantProps = variants[0].refSchema.properties;
  
  for (const [propName, propDef] of Object.entries(firstVariantProps)) {
    // Must have enum values
    if (!propDef.enum || propDef.enum.length === 0) continue;
    
    // Check if all variants have this property with enum
    const allHaveIt = variants.every(v => {
      const prop = v.refSchema.properties?.[propName];
      return prop?.enum && prop.enum.length > 0;
    });
    
    if (!allHaveIt) continue;
    
    // Found a discriminator! Build mapping
    const mapping = {};
    variants.forEach(v => {
      const enumValue = v.refSchema.properties[propName].enum[0];
      mapping[enumValue] = v.ref;
    });
    
    return {
      schemaName,
      discriminatorProperty: propName,
      mapping,
      variantCount: Object.keys(mapping).length
    };
  }
  
  return null;
}

/**
 * Create a proper discriminated union type file
 */
function createUnionType(schemaName, fileName, discriminatorProperty, mapping) {
  const variants = Object.entries(mapping);
  
  // Generate imports for all variant types
  const imports = variants.map(([discriminatorValue, schemaRef], index) => {
    const variantSchemaName = schemaRef.split('/').pop();
    const variantFileName = variantSchemaName.replace(/_/g, '');
    
    return {
      index,
      discriminatorValue,
      variantSchemaName,
      variantFileName,
      typeName: `${fileName}${index}`,
      importType: `import type { ${variantFileName} } from './${variantFileName}';`,
      importFromJSON: `import { ${variantFileName}FromJSON, ${variantFileName}ToJSON } from './${variantFileName}';`
    };
  }).filter(v => {
    // Check if the variant file exists
    const variantPath = path.join(modelsDir, `${v.variantFileName}.ts`);
    if (!fs.existsSync(variantPath)) {
      console.log(`     ⚠️  Warning: Variant file not found: ${v.variantFileName}.ts`);
      return false;
    }
    return true;
  });
  
  if (imports.length === 0) {
    console.log(`     ❌ No valid variant files found for ${schemaName}`);
    return;
  }
  
  // Generate the union type file
  const content = `/* tslint:disable */
/* eslint-disable */
/**
 * Proper discriminated union for ${schemaName}.
 * This file is auto-generated by post-processing script.
 */

${imports.map(v => v.importType).join('\n')}

${imports.map(v => v.importFromJSON).join('\n')}

/**
 * Discriminated union of all ${schemaName} types
 * @export
 */
export type ${fileName} =
${imports.map(v => `  | ${v.variantFileName}`).join('\n')};

export function ${fileName}FromJSON(json: any): ${fileName} {
  return ${fileName}FromJSONTyped(json, false);
}

export function ${fileName}FromJSONTyped(json: any, ignoreDiscriminator: boolean): ${fileName} {
  if (json == null) {
    return json;
  }
  
  if (ignoreDiscriminator) {
    // If ignoring discriminator, try to parse as first variant
    return ${imports[0]?.variantFileName}FromJSON(json);
  }
  
  // Use discriminator to determine which type to parse
  switch (json['${discriminatorProperty}']) {
${imports.map(v => `    case '${v.discriminatorValue}':\n      return ${v.variantFileName}FromJSON(json);`).join('\n')}
    default:
      throw new Error(\`Unknown ${discriminatorProperty} value: \${json['${discriminatorProperty}']}\`);
  }
}

export function ${fileName}ToJSON(value: ${fileName}): any {
  return ${fileName}ToJSONTyped(value, false);
}

export function ${fileName}ToJSONTyped(value: ${fileName} | undefined, ignoreDiscriminator: boolean): any {
  if (value == null) {
    return value;
  }
  
  if (ignoreDiscriminator) {
    // If ignoring discriminator, serialize normally
  }
  
  // Use discriminator to determine which serializer to use
  switch ((value as any).${discriminatorProperty}) {
${imports.map(v => `    case '${v.discriminatorValue}':\n      return ${v.variantFileName}ToJSON(value as ${v.variantFileName});`).join('\n')}
    default:
      throw new Error(\`Unknown ${discriminatorProperty} value: \${(value as any).${discriminatorProperty}}\`);
  }
}
`;
  
  const filePath = path.join(modelsDir, `${fileName}.ts`);
  fs.writeFileSync(filePath, content);
  console.log(`     Created union type ${fileName}.ts with ${imports.length} variants`);
}

/**
 * Fix files that import the deleted/recreated types
 */
function fixBrokenImports(discriminatedUnions) {
  const allFiles = fs.readdirSync(modelsDir).filter(f => f.endsWith('.ts'));
  
  for (const file of allFiles) {
    const filePath = path.join(modelsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    for (const union of discriminatedUnions) {
      const fileName = union.schemaName.replace(/_/g, '');
      
      // Check if this file imports the union type
      const importRegex = new RegExp(`from '\\.\\/(?:${union.schemaName}|${fileName})'`, 'g');
      if (importRegex.test(content)) {
        // Replace schema name with file name in imports
        content = content.replace(
          new RegExp(`from '\\.\\/${union.schemaName}'`, 'g'),
          `from './${fileName}'`
        );
        
        // Replace type references
        content = content.replace(
          new RegExp(`\\b${union.schemaName}\\b`, 'g'),
          fileName
        );
        
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`  Fixed imports in ${file}`);
    }
  }
}
