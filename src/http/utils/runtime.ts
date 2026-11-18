interface DenoGlobal {
  version: {
    deno: string;
  };
  build?: {
    os?: string;
    arch?: string;
  };
}

interface BunGlobal {
  version: string;
}

declare const Deno: DenoGlobal | undefined;
declare const Bun: BunGlobal | undefined;
declare const EdgeRuntime: string | undefined;
declare const self: typeof globalThis.self & {
  importScripts?: unknown;
};

export interface Runtime {
  type:
    | 'browser'
    | 'web-worker'
    | 'deno'
    | 'bun'
    | 'node'
    | 'react-native'
    | 'workerd'
    | 'edge-runtime'
    | 'unknown';
  version?: string;
  /** Major version only, for range checks. Populated on Node, where the version is a semver. */
  parsedVersion?: number;
  os?: string;
  arch?: string;
}

/**
 * Which environment and version the SDK is running in. Evaluated once at module load — every
 * check below reads an immutable property of the host, so re-evaluating could never change the
 * answer.
 */
export const RUNTIME: Runtime = evaluateRuntime();

function evaluateRuntime(): Runtime {
  // Order is load-bearing. Cloudflare, Vercel Edge and web workers all come before Deno because
  // each is its own runtime that would otherwise fall through; Deno comes before Bun; and React
  // Native comes before Node because RN ships a `process` polyfill that would make it look like
  // Node.
  const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
  if (isBrowser) {
    return { type: 'browser', version: window.navigator.userAgent };
  }

  // https://developers.cloudflare.com/workers/runtime-apis/web-standards/#navigatoruseragent
  const isCloudflare =
    typeof globalThis !== 'undefined' && globalThis?.navigator?.userAgent === 'Cloudflare-Workers';
  if (isCloudflare) {
    return { type: 'workerd' };
  }

  // https://vercel.com/docs/functions/runtimes/edge-runtime#check-if-you're-running-on-the-edge-runtime
  const isEdgeRuntime = typeof EdgeRuntime === 'string';
  if (isEdgeRuntime) {
    return { type: 'edge-runtime' };
  }

  const isWebWorker =
    typeof self === 'object' &&
    typeof self?.importScripts === 'function' &&
    (self.constructor?.name === 'DedicatedWorkerGlobalScope' ||
      self.constructor?.name === 'ServiceWorkerGlobalScope' ||
      self.constructor?.name === 'SharedWorkerGlobalScope');
  if (isWebWorker) {
    return { type: 'web-worker' };
  }

  // Deno spoofs `process.versions.node`, so it has to be identified by its own global.
  // https://deno.land/std@0.177.0/node/process.ts?s=versions
  const isDeno =
    typeof Deno !== 'undefined' &&
    typeof Deno.version !== 'undefined' &&
    typeof Deno.version.deno !== 'undefined';
  if (isDeno) {
    return {
      type: 'deno',
      version: Deno.version.deno,
      os: Deno.build?.os,
      arch: Deno.build?.arch,
    };
  }

  const isBun = typeof Bun !== 'undefined' && typeof Bun.version !== 'undefined';
  if (isBun) {
    return {
      type: 'bun',
      version: Bun.version,
      os: typeof process !== 'undefined' ? process.platform : undefined,
      arch: typeof process !== 'undefined' ? process.arch : undefined,
    };
  }

  // https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Core/setUpNavigator.js
  const isReactNative = typeof navigator !== 'undefined' && navigator?.product === 'ReactNative';
  if (isReactNative) {
    return { type: 'react-native' };
  }

  // Aliased into a local first so bundlers that statically analyse `process.versions` (Next.js on
  // the edge runtime) don't warn about a Node API they can see but never reach.
  const localProcess = typeof process !== 'undefined' ? process : undefined;
  const isNode =
    typeof localProcess !== 'undefined' && typeof localProcess.versions?.node === 'string';
  if (isNode) {
    return {
      type: 'node',
      version: localProcess.versions.node,
      parsedVersion: Number(localProcess.versions.node.split('.')[0]),
      os: localProcess.platform,
      arch: localProcess.arch,
    };
  }

  return { type: 'unknown' };
}

/**
 * Base64-encodes a UTF-8 string.
 *
 * Feature-detected rather than keyed off `RUNTIME`: a `typeof window === 'undefined'` test (what
 * this replaced) sends every non-browser runtime down the `Buffer` branch, and `Buffer` is absent
 * on workerd without `nodejs_compat`, on Deno, and inside a web worker — so HTTP basic auth threw
 * `Buffer is not defined` there. `Buffer` is still tried first so Node keeps its existing,
 * faster path and byte-identical output.
 */
export function toBase64(str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf-8').toString('base64');
  }
  if (typeof btoa === 'function') {
    // `btoa` takes one byte per code unit, so the string has to be UTF-8 encoded first or any
    // character above U+00FF throws InvalidCharacterError.
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    for (const byte of bytes) {
      binary += String.fromCharCode(byte);
    }
    return btoa(binary);
  }
  throw new Error(
    `No base64 encoder available in this runtime (${RUNTIME.type}): neither Buffer nor btoa is defined.`,
  );
}
