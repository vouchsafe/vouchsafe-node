#!/usr/bin/env node
/**
 * Post-process the OpenAPI spec to add discriminator mappings
 * for proper SDK generation with discriminated unions.
 * 
 * This should be run AFTER TSOA generates the swagger.json
 * and BEFORE the OpenAPI Generator creates the SDK.
 * 
 * Usage: node scripts/patch-openapi-discriminators.js path/to/swagger.json
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const swaggerPath = args[0] || path.join(__dirname, '../swagger.json');

if (!fs.existsSync(swaggerPath)) {
  console.error(`❌ File not found: ${swaggerPath}`);
  console.error('Usage: node patch-openapi-discriminators.js path/to/swagger.json');
  process.exit(1);
}

console.log(`Reading OpenAPI spec from: ${swaggerPath}`);
const swagger = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));

let patched = false;

// Patch Api_VerificationCheck_ with proper discriminator
if (swagger.components?.schemas?.Api_VerificationCheck_) {
  console.log('✓ Patching Api_VerificationCheck_ discriminator...');
  
  // Extract the anyOf array to build mapping
  const anyOf = swagger.components.schemas.Api_VerificationCheck_.anyOf || [];
  const mapping = {};
  // Track variants grouped by step value to handle v2 types that share a step (e.g. step_identity)
  const stepGroups = {};

  // Build discriminator mapping from each variant's step enum value
  anyOf.forEach((variant, index) => {
    const stepEnum = variant.properties?.step?.enum?.[0];
    if (stepEnum) {
      // Create a named schema for this variant
      const schemaName = `Api_VerificationCheck_${index}`;
      swagger.components.schemas[schemaName] = variant;
      if (!stepGroups[stepEnum]) stepGroups[stepEnum] = [];
      stepGroups[stepEnum].push(`#/components/schemas/${schemaName}`);
    }
  });

  // Build final mapping — group multiple variants sharing the same step value into a combined anyOf schema
  for (const [stepEnum, refs] of Object.entries(stepGroups)) {
    if (refs.length === 1) {
      mapping[stepEnum] = refs[0];
    } else {
      // Multiple subtypes share this step value (e.g. step_identity has photo_id / vouch / digital_id)
      // Create a combined anyOf schema so the secondary discriminator (method) can be resolved downstream
      const combinedSchemaName = `Api_VerificationCheck_${stepEnum.replace(/_/g, '')}`;
      swagger.components.schemas[combinedSchemaName] = {
        anyOf: refs.map(ref => ({ $ref: ref }))
      };
      mapping[stepEnum] = `#/components/schemas/${combinedSchemaName}`;
    }
  }

  // Replace inline anyOf with refs
  swagger.components.schemas.Api_VerificationCheck_.anyOf = Object.keys(mapping).map(key => {
    return { $ref: mapping[key] };
  });
  
  swagger.components.schemas.Api_VerificationCheck_.discriminator = {
    propertyName: 'step',
    mapping: mapping
  };
  patched = true;
}

// Patch Api_VerificationEnrichment_ with proper discriminator  
if (swagger.components?.schemas?.Api_VerificationEnrichment_) {
  console.log('✓ Patching Api_VerificationEnrichment_ discriminator...');
  
  // Extract the anyOf array to build mapping
  const anyOf = swagger.components.schemas.Api_VerificationEnrichment_.anyOf || [];
  const mapping = {};
  const checkGroups = {};

  // Build discriminator mapping from each variant's check enum value
  anyOf.forEach((variant, index) => {
    const checkEnum = variant.properties?.check?.enum?.[0];
    if (checkEnum) {
      // Create a named schema for this variant
      const schemaName = `Api_VerificationEnrichment_${index}`;
      swagger.components.schemas[schemaName] = variant;
      if (!checkGroups[checkEnum]) checkGroups[checkEnum] = [];
      checkGroups[checkEnum].push(`#/components/schemas/${schemaName}`);
    }
  });

  // Build final mapping — group multiple variants sharing the same check value into a combined anyOf schema
  for (const [checkEnum, refs] of Object.entries(checkGroups)) {
    if (refs.length === 1) {
      mapping[checkEnum] = refs[0];
    } else {
      const combinedSchemaName = `Api_VerificationEnrichment_${checkEnum.replace(/_/g, '')}`;
      swagger.components.schemas[combinedSchemaName] = {
        anyOf: refs.map(ref => ({ $ref: ref }))
      };
      mapping[checkEnum] = `#/components/schemas/${combinedSchemaName}`;
    }
  }

  // Replace inline anyOf with refs
  swagger.components.schemas.Api_VerificationEnrichment_.anyOf = Object.keys(mapping).map(key => {
    return { $ref: mapping[key] };
  });
  
  swagger.components.schemas.Api_VerificationEnrichment_.discriminator = {
    propertyName: 'check',
    mapping: mapping
  };
  patched = true;
}

if (patched) {
  // Write back
  fs.writeFileSync(swaggerPath, JSON.stringify(swagger, null, 2));
  console.log('✅ OpenAPI spec patched successfully!');
} else {
  console.log('⚠️  No schemas found to patch');
}
