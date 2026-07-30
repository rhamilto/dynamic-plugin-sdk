const bytesToHexString = (bytes: Uint8Array) =>
  [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');

/**
 * Generate new random string containing lowercase hex characters.
 */
export const randomString = (length = 32) => {
  const bytes = new Uint8Array(Math.ceil(length / 2));

  crypto.getRandomValues(bytes);

  return bytesToHexString(bytes).slice(0, length);
};

/**
 * Generate new UUID v4 compatible string.
 *
 * Uses {@link crypto.getRandomValues} to ensure compatibility with non-secure contexts
 * i.e. unlike {@link crypto.randomUUID} this function should work also on pages served
 * over plain HTTP on a non-localhost domain.
 */
export const uuidv4 = () => {
  const bytes = new Uint8Array(16);

  crypto.getRandomValues(bytes);

  /* eslint-disable no-bitwise */
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // RFC 4122 variant
  /* eslint-enable no-bitwise */

  const hex = bytesToHexString(bytes);

  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};
