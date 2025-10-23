export const userSettingsService = {
  get: (key: string): string | null => {
    return localStorage.getItem(key);
  },
  getBoolean: (key: string): boolean | null => {
    const value = localStorage.getItem(key);
    if (value === null) return null;
    return value === 'true';
  },
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
