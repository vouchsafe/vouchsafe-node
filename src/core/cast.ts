/**
 * Fern's real serde-off behavior is a bare type-cast with zero runtime validation. This SDK still
 * renames wire keys to idiomatic property names (Fern's own output never needs to, since it never
 * renames anything) — `CastSchema` is the minimal, non-validating substitute for zod that carries
 * just that rename, matching Fern's behavior everywhere it doesn't need a rename to compile.
 */
export interface CastSchema<Raw, Parsed> {
  /** Renames Raw -> Parsed with no validation; never throws. */
  parse(raw: Raw): Parsed;
  /**
   * Same rename as parse(), gated by a shallow required-key presence check on `raw` — enough to
   * mirror `.safeParse()`'s call sites here (a "never throws, fall back to the untransformed
   * value" caller, and error-response-union member dispatch, which needs SOME way to tell members
   * apart without zod's full structural validation).
   */
  safeParse(raw: Raw): { success: true; data: Parsed } | { success: false };
  nullable(): CastSchema<Raw | null, Parsed | null>;
  optional(): CastSchema<Raw | undefined, Parsed | undefined>;
}

function makeSchema<Raw, Parsed>(
  parse: (raw: Raw) => Parsed,
  safeParse: (raw: Raw) => { success: true; data: Parsed } | { success: false },
): CastSchema<Raw, Parsed> {
  return {
    parse,
    safeParse,
    nullable: () =>
      makeSchema<Raw | null, Parsed | null>(
        (raw) => (raw === null ? null : parse(raw)),
        (raw) => (raw === null ? { success: true, data: null } : safeParse(raw)),
      ),
    optional: () =>
      makeSchema<Raw | undefined, Parsed | undefined>(
        (raw) => (raw === undefined ? undefined : parse(raw)),
        (raw) => (raw === undefined ? { success: true, data: undefined } : safeParse(raw)),
      ),
  };
}

/** A schema that performs no rename at all — every enum/union/primitive model uses this. */
export function identity<T>(): CastSchema<T, T> {
  return makeSchema(
    (raw) => raw,
    (raw) => ({ success: true, data: raw }),
  );
}

/**
 * An object model's schema: `toParsed` performs the real (possibly no-op) wire<->app rename,
 * `requiredKeys` names the keys `raw` must carry (in `raw`'s own key space) for `safeParse` to
 * consider it a match — same shallow presence check every real call site already only needs.
 */
export function object<Raw, Parsed>(
  toParsed: (raw: Raw) => Parsed,
  requiredKeys: string[],
): CastSchema<Raw, Parsed> {
  return makeSchema<Raw, Parsed>(toParsed, (raw: Raw) => {
    if (
      raw === null ||
      raw === undefined ||
      typeof raw !== 'object' ||
      !requiredKeys.every((key) => key in (raw as object))
    ) {
      return { success: false };
    }
    return { success: true, data: toParsed(raw) };
  });
}

/**
 * A top-level array/record response or pagination-page schema whose element is itself a model
 * needing a real rename (`item` is that model's own `.request`/`.response` export) — recurses
 * exactly like a declared property's array/record schema does in cast-schema-from-model.ts, so a
 * rename inside array/record elements isn't silently dropped just because the array/record itself
 * sits at a call site outside that per-model builder (buildResponsesDefinition.ts's non-sentinel
 * branch, build-set-pagination.ts).
 */
export function list<Raw, Parsed>(item: CastSchema<Raw, Parsed>): CastSchema<Raw[], Parsed[]> {
  return makeSchema<Raw[], Parsed[]>(
    (raw) => (Array.isArray(raw) ? raw.map((v) => item.parse(v)) : (raw as unknown as Parsed[])),
    (raw) =>
      Array.isArray(raw)
        ? { success: true, data: raw.map((v) => item.parse(v)) }
        : { success: false },
  );
}

export function record<Raw, Parsed>(
  item: CastSchema<Raw, Parsed>,
): CastSchema<Record<string, Raw>, Record<string, Parsed>> {
  return makeSchema<Record<string, Raw>, Record<string, Parsed>>(
    (raw) =>
      raw && typeof raw === 'object'
        ? Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, item.parse(v)]))
        : (raw as unknown as Record<string, Parsed>),
    (raw) =>
      raw && typeof raw === 'object'
        ? {
            success: true,
            data: Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, item.parse(v)])),
          }
        : { success: false },
  );
}

/** The NO_CONTENT sentinel — replaces `instanceof ZodUndefined` as the "no body" marker. */
export const NEVER: CastSchema<never, never> = identity<never>();
