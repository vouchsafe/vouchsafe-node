// Const object + derived type (not a bare union) to match Fern's real oracle shape exactly
// (`core/logging/logger.ts`) — Fern's `LogLevel` is a real runtime value (`LogLevel.Info`), not
// just a type, and customer code that names it as a value needs the same symbol here.
export const LogLevel = {
  Debug: 'debug',
  Info: 'info',
  Warn: 'warn',
  Error: 'error',
} as const;
export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

/**
 * Pluggable logging backend. Implement this to route SDK log output to your own logger (e.g.
 * pino, winston) instead of the console.
 */
export interface ILogger {
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
}

/**
 * Configuration for SDK logging. Silent by default (see `Logger.from`) — set `silent: false`
 * to enable output.
 */
export interface LogConfig {
  level?: LogLevel;
  logger?: ILogger;
  silent?: boolean;
}

const LOG_LEVEL_ORDER: Record<LogLevel, number> = { debug: 1, info: 2, warn: 3, error: 4 };

export class ConsoleLogger implements ILogger {
  debug(message: string, ...args: unknown[]): void {
    console.debug(message, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    console.info(message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    console.error(message, ...args);
  }
}

const DEFAULT_CONSOLE_LOGGER = new ConsoleLogger();

/**
 * Resolves `BaseClientOptions.logging` into a level/silent-filtering logger. Silent by default —
 * matching every other fernMode language's `LogConfig`, and Fern's own `LogConfig | Logger`
 * input shape exactly (confirmed against real Fern output: petstore/cohere/square all declare
 * this same 2-member union, with no bare-logger-object input path at all) — unless a `LogConfig`
 * explicitly sets `silent: false`.
 */
export class Logger {
  private static readonly DEFAULT = new Logger('info', DEFAULT_CONSOLE_LOGGER, true);

  private constructor(
    private readonly level: LogLevel,
    private readonly logger: ILogger,
    private readonly silent: boolean,
  ) {}

  static from(options: LogConfig | Logger | undefined | null): Logger {
    // Loose enough to also treat an explicit `null` (e.g. from a spread config object, or a
    // framework that defaults unset fields to `null` rather than `undefined`) as "not configured".
    if (options === undefined || options === null) {
      return Logger.DEFAULT;
    }
    // An already-resolved Logger passes through unchanged, preserving its configured level/silent
    // state.
    if (options instanceof Logger) {
      return options;
    }
    return new Logger(
      options.level ?? 'info',
      options.logger ?? DEFAULT_CONSOLE_LOGGER,
      options.silent ?? true,
    );
  }

  // Public (not `private`) to match Fern's shape — the resolved `Logger` class itself stays
  // unexported (see barrel-export-template-builder.ts), but a type-reachability walk from a
  // resource client's options still surfaces whichever of its members are public.
  shouldLog(messageLevel: LogLevel): boolean {
    return !this.silent && LOG_LEVEL_ORDER[this.level] <= LOG_LEVEL_ORDER[messageLevel];
  }

  isDebug(): boolean {
    return this.shouldLog('debug');
  }

  isInfo(): boolean {
    return this.shouldLog('info');
  }

  isWarn(): boolean {
    return this.shouldLog('warn');
  }

  isError(): boolean {
    return this.shouldLog('error');
  }

  debug(message: string, ...args: unknown[]): void {
    if (this.shouldLog('debug')) {
      this.logger.debug(message, ...args);
    }
  }

  info(message: string, ...args: unknown[]): void {
    if (this.shouldLog('info')) {
      this.logger.info(message, ...args);
    }
  }

  warn(message: string, ...args: unknown[]): void {
    if (this.shouldLog('warn')) {
      this.logger.warn(message, ...args);
    }
  }

  error(message: string, ...args: unknown[]): void {
    if (this.shouldLog('error')) {
      this.logger.error(message, ...args);
    }
  }
}

/**
 * Standalone equivalent of `Logger.from` — the resolved `Logger` class itself stays unexported
 * (customers configure logging via `LogConfig`/`ILogger`, never naming `Logger` directly), but
 * Fern exposes this constructor function as real public API for the rare caller building a logger
 * ahead of time rather than passing raw config through `BaseClientOptions.logging`.
 */
export function createLogger(options?: LogConfig | Logger): Logger {
  return Logger.from(options);
}

const SENSITIVE_QUERY_PARAMS = new Set([
  'api_key',
  'apikey',
  'api-key',
  'access_token',
  'accesstoken',
  'access-token',
  'token',
  'auth_token',
  'auth-token',
  'refresh_token',
  'id_token',
  'client_secret',
  'client-secret',
  'secret',
  'password',
  'signature',
  'sig',
]);

/**
 * Redacts sensitive query-string values (credentials are commonly passed as query params, e.g.
 * `?api_key=...`, presigned `X-Amz-*` params) before a URL is logged. Rebuilds the query manually
 * — a repeated param (`?token=a&token=b`) keeps both entries this way, where `URLSearchParams.
 * set()` would collapse them to one — and keeps `[REDACTED]` readable, since `URLSearchParams`
 * would otherwise percent-encode it to `%5BREDACTED%5D`.
 */
export function sanitizeLogUrl(url: string): string {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }
  const entries = Array.from(parsed.searchParams.entries());
  if (entries.length === 0) {
    return parsed.toString();
  }
  const query = entries
    .map(([key, value]) => {
      const lower = key.toLowerCase();
      const isSensitive = SENSITIVE_QUERY_PARAMS.has(lower) || lower.startsWith('x-amz-');
      return isSensitive
        ? `${encodeURIComponent(key)}=[REDACTED]`
        : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');
  // Clear the hash too before rebuilding, and re-append it last — otherwise the manually-appended
  // `?query` would land after the fragment (`#frag?query`), which isn't a valid URL structure.
  const hash = parsed.hash;
  parsed.search = '';
  parsed.hash = '';
  return `${parsed.toString()}?${query}${hash}`;
}

const SENSITIVE_HEADERS = new Set([
  'authorization',
  'www-authenticate',
  'x-api-key',
  'api-key',
  'apikey',
  'x-api-token',
  'x-auth-token',
  'auth-token',
  'proxy-authenticate',
  'proxy-authorization',
  'cookie',
  'set-cookie',
  'x-csrf-token',
  'x-xsrf-token',
  'x-session-token',
  'x-access-token',
]);

function toLogHeaderEntries(
  headers: HeadersInit | Record<string, string> | undefined,
): [string, string][] {
  if (!headers) {
    return [];
  }
  if (headers instanceof Headers) {
    return Array.from(headers.entries());
  }
  if (Array.isArray(headers)) {
    return headers;
  }
  return Object.entries(headers);
}

/** Formats headers for logging, redacting sensitive ones (Authorization, Cookie, etc). */
export function formatLogHeaders(
  headers: HeadersInit | Record<string, string> | undefined,
): string {
  const entries = toLogHeaderEntries(headers);
  return `{${entries
    .map(
      ([key, value]) => `${key}=${SENSITIVE_HEADERS.has(key.toLowerCase()) ? '[REDACTED]' : value}`,
    )
    .join(', ')}}`;
}
