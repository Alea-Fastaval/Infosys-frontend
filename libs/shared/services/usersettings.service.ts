export const userSettingsService = {
  get: (key: string): string | null => {
    return localStorage.getItem(key);
  },
  getBoolean: (key: string): boolean | null => {
    const value = localStorage.getItem(key);
    if (value === null) return null;
    return value === 'true';
  },
  /**
   * Get a numeric value from localStorage.
   * Returns null if the key doesn't exist or if the value cannot be parsed as a valid number.
   * Note: This returns null instead of NaN for invalid numeric strings, providing clearer type safety.
   */
  getNumber: (key: string): number | null => {
    const value = localStorage.getItem(key);
    if (value === null) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  },
  set: (key: string, value: string | number | boolean): void => {
    localStorage.setItem(key, String(value));
  },
  remove: (key: string): void => {
    localStorage.removeItem(key);
  },
  clear: (): void => {
    localStorage.clear();
  }
};
