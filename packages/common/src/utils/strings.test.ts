import { randomString, uuidv4 } from './strings';

describe('randomString', () => {
  it('should return a string containing lowercase hex characters', () => {
    expect(randomString()).toMatch(/^[0-9a-f]{32}$/);
    expect(randomString(16)).toMatch(/^[0-9a-f]{16}$/);
  });

  it('should return a new string', () => {
    expect(randomString()).not.toBe(randomString());
  });
});

describe('uuidv4', () => {
  it('should return a UUID v4 compatible string', () => {
    // https://www.rfc-editor.org/info/rfc9562/#section-5.4
    expect(uuidv4()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
  });

  it('should return a new string', () => {
    expect(uuidv4()).not.toBe(uuidv4());
  });
});
