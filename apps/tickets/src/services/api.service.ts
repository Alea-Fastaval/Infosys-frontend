interface ApiResponse<T = unknown> {
  status: 'success' | 'error';
  data?: T;
  [key: string]: unknown;
}

class ApiError extends Error {
  constructor(public json: ApiResponse) {
    super('Error in API route');
    this.name = 'ApiError';
  }
}

const checkError = (json: ApiResponse): void => {
  if (json.status !== 'success') {
    throw new ApiError(json);
  }
};

export const get = async <T = unknown>(path: string): Promise<T> => {
  const response = await fetch(`${path}`);
  const locationHeader = response.headers.get('Location');
  if (locationHeader) window.location.href = locationHeader;
  const json = await response.json();
  checkError(json);

  return json as T;
};

export const post = async <T = unknown>(path: string, data: unknown): Promise<T> => {
  const response = await fetch(`${path}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });
  const locationHeader = response.headers.get('Location');
  if (locationHeader) window.location.href = locationHeader;
  const json = await response.json();
  checkError(json);

  return json as T;
};
