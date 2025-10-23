import { describe, it, expect } from 'vitest';
import { formatDateAndTime } from './datetimeconverter.helper';

describe('DateTimeConverter Helper', () => {
  it('should format Unix timestamp to readable date and time', () => {
    // Unix timestamp for 2024-01-15 12:30:45 UTC
    const timestamp = 1705323045;
    const result = formatDateAndTime(timestamp);
    
    // The result should contain date components
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });

  it('should handle null or undefined input', () => {
    expect(formatDateAndTime(null as any)).toBe('');
    expect(formatDateAndTime(undefined as any)).toBe('');
  });

  it('should handle zero timestamp', () => {
    const result = formatDateAndTime(0);
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });

  it('should format timestamp consistently', () => {
    const timestamp = 1705323045;
    const result1 = formatDateAndTime(timestamp);
    const result2 = formatDateAndTime(timestamp);
    
    expect(result1).toBe(result2);
  });
});
