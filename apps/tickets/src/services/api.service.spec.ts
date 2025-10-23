import { describe, it, expect, vi, beforeEach } from 'vitest';
import { get, post } from './api.service';

describe('API Service', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = vi.fn();
  });

  describe('get', () => {
    it('should fetch data successfully', async () => {
      const mockData = { status: 'success', data: { id: 1, name: 'Test' } };
      (global.fetch as any).mockResolvedValue({
        headers: {
          get: () => null
        },
        json: async () => mockData
      });

      const result = await get('/test-endpoint');
      
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith('/test-endpoint');
    });

    it('should throw ApiError on non-success status', async () => {
      const mockError = { status: 'error', message: 'Something went wrong' };
      (global.fetch as any).mockResolvedValue({
        headers: {
          get: () => null
        },
        json: async () => mockError
      });

      await expect(get('/test-endpoint')).rejects.toThrow('Error in API route');
    });

    it('should redirect if Location header is present', async () => {
      const originalLocation = window.location.href;
      const mockData = { status: 'success' };
      
      (global.fetch as any).mockResolvedValue({
        headers: {
          get: (header: string) => header === 'Location' ? 'http://redirect-url.com' : null
        },
        json: async () => mockData
      });

      // Mock window.location
      delete (window as any).location;
      (window as any).location = { href: originalLocation };

      await get('/test-endpoint');
      
      expect(window.location.href).toBe('http://redirect-url.com');
    });
  });

  describe('post', () => {
    it('should post data successfully', async () => {
      const mockData = { status: 'success', data: { id: 1 } };
      const postData = { name: 'Test', value: 123 };
      
      (global.fetch as any).mockResolvedValue({
        headers: {
          get: () => null
        },
        json: async () => mockData
      });

      const result = await post('/test-endpoint', postData);
      
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith('/test-endpoint', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { 'Content-Type': 'application/json' }
      });
    });

    it('should throw ApiError on non-success status', async () => {
      const mockError = { status: 'error', message: 'Bad request' };
      
      (global.fetch as any).mockResolvedValue({
        headers: {
          get: () => null
        },
        json: async () => mockError
      });

      await expect(post('/test-endpoint', {})).rejects.toThrow('Error in API route');
    });
  });
});
