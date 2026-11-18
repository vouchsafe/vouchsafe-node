import { ContentType } from '../types';

/**
 * Determines the ContentType enum value from a MIME type string.
 * Maps HTTP Content-Type header values to the SDK's ContentType enum.
 * Handles special cases like text/json (parsed as JSON), image/svg+xml (text), and wildcards.
 * @param contentType - The Content-Type header value (e.g., "application/json", "text/plain")
 * @returns The corresponding ContentType enum value
 */
export function getContentTypeDefinition(contentType: string): ContentType {
  const ct = contentType.toLowerCase();

  // XML is handled as text
  if (ct.startsWith('application/') && ct.includes('xml')) {
    return ContentType.Text;
  }

  if (ct === 'application/x-www-form-urlencoded') {
    return ContentType.FormUrlEncoded;
  }

  if (ct === 'text/event-stream') {
    return ContentType.EventStream;
  }

  // Check for JSON content types (including text/json) before text types
  if (ct === 'application/json' || ct === 'text/json' || ct.includes('+json')) {
    return ContentType.Json;
  }

  if (ct === 'application/javascript') {
    return ContentType.Text;
  }

  if (ct.startsWith('text/')) {
    return ContentType.Text;
  }

  // SVG is text-based XML, not binary
  if (ct === 'image/svg+xml') {
    return ContentType.Text;
  }

  if (ct.startsWith('image/')) {
    return ContentType.Image;
  }

  if (ct === 'application/octet-stream' || ct === 'application/pdf') {
    return ContentType.Binary;
  }

  // Wildcard content type
  if (ct === '*/*') {
    return ContentType.Binary;
  }

  return ContentType.Binary;
}

const JSON_ERROR_MEDIA_TYPES = new Set([
  'application/hal+json',
  'application/json',
  'application/ld+json',
  'application/problem+json',
  'application/vnd.api+json',
  'text/json',
]);

function isJsonErrorMediaType(mediaType: string): boolean {
  return (
    JSON_ERROR_MEDIA_TYPES.has(mediaType) ||
    (mediaType.startsWith('application/vnd.') && mediaType.endsWith('+json'))
  );
}

export function decodeErrorBody(
  raw: ArrayBuffer | ArrayBufferView,
  contentType: string | undefined,
): unknown {
  const text = new TextDecoder().decode(raw);
  const mediaType = contentType?.split(';')[0]?.trim().toLowerCase() ?? '';
  if (mediaType.length > 0 && !isJsonErrorMediaType(mediaType)) {
    return text;
  }
  if (text.length === 0) {
    return undefined;
  }
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
