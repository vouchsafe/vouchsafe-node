/**
 * A value that may be provided directly, as a promise, or as a function (sync or async) that
 * produces one. Used for config fields whose value may need to be computed lazily or fetched
 * asynchronously (e.g. a `baseUrl` resolved from a token exchange) rather than known up front.
 */
export type Supplier<T> = T | Promise<T> | (() => T | Promise<T>);

export const Supplier = {
  /**
   * Resolves a `Supplier<T>` to its underlying value, calling it if it's a function and awaiting
   * the result either way. `undefined` (an unset optional config field) passes through unchanged
   * rather than throwing, since callers generally have their own fallback for "not configured".
   */
  get: async <T>(supplier: Supplier<T> | undefined): Promise<T | undefined> => {
    if (supplier === undefined) {
      return undefined;
    }
    if (typeof supplier === 'function') {
      return await (supplier as () => T | Promise<T>)();
    }
    return await supplier;
  },
};

/**
 * Resolves a header map whose values may be plain strings or `Supplier<string>` (e.g. a token
 * fetched asynchronously per request) into a plain string map, dropping any entry that resolves
 * to `null`/`undefined` — matching Fern's own header-Supplier behavior.
 */
export async function resolveHeaders(
  headers: Record<string, Supplier<string | null | undefined> | null | undefined> | undefined,
): Promise<Record<string, string> | undefined> {
  if (!headers) {
    return undefined;
  }
  const entries = await Promise.all(
    Object.entries(headers).map(async ([key, value]) => [key, await Supplier.get(value)] as const),
  );
  const resolved: Record<string, string> = {};
  for (const [key, value] of entries) {
    if (value !== null && value !== undefined) {
      resolved[key] = value;
    }
  }
  return resolved;
}
