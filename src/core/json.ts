/**
 * Serialize a value to JSON.
 * @param value A JavaScript value, usually an object or array, to be converted.
 * @param replacer A function that transforms the results.
 * @param space Adds indentation, white space, and line break characters to the return-value JSON text.
 * @returns JSON string
 */
export const toJson = (
  value: unknown,
  replacer?: (this: unknown, key: string, value: unknown) => unknown,
  space?: string | number,
): string => {
  return JSON.stringify(value, replacer, space);
};

/**
 * Parse a JSON string to an object, array, or other type.
 * @param text A valid JSON string.
 * @param reviver A function that transforms the results, called for each member of the object.
 * @returns Parsed object, array, or other type
 */
export function fromJson<T = unknown>(
  text: string,
  reviver?: (this: unknown, key: string, value: unknown) => unknown,
): T {
  return JSON.parse(text, reviver);
}
