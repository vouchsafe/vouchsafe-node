import { RUNTIME, type Runtime } from './runtime';

const RUNTIME_DISPLAY_NAMES: Record<Runtime['type'], string | undefined> = {
  node: 'Node',
  deno: 'Deno',
  bun: 'Bun',
  browser: undefined,
  'web-worker': undefined,
  'react-native': undefined,
  workerd: undefined,
  'edge-runtime': undefined,
  unknown: undefined,
};

const X86_64_ARCH_ALIASES = new Set(['x64', 'amd64', 'x86_64']);

function normalizeArch(arch: string | undefined): string | undefined {
  if (arch == null) {
    return arch;
  }
  return X86_64_ARCH_ALIASES.has(arch.toLowerCase()) ? 'x86_64' : arch;
}

function encodeProductName(sdkName: string): string {
  return sdkName.replace(/@/g, '%40').replace(/\//g, '%2F');
}

export function getUserAgent(sdkName: string, sdkVersion: string): string {
  let userAgent = `${encodeProductName(sdkName)}/${sdkVersion}`;

  const platform = [RUNTIME.os, normalizeArch(RUNTIME.arch)].filter(
    (part): part is string => part != null && part.length > 0,
  );
  if (platform.length > 0) {
    userAgent += ` (${platform.join('; ')})`;
  }

  const runtimeName = RUNTIME_DISPLAY_NAMES[RUNTIME.type];
  if (runtimeName != null) {
    userAgent += ` ${runtimeName}`;
    if (RUNTIME.version != null && RUNTIME.version.length > 0) {
      userAgent += `/${RUNTIME.version}`;
    }
  }

  return userAgent;
}
