import {
  clearSession,
  getAccessToken,
  getRefreshToken,
  readSession,
  writeSession,
} from './sessionStorage';

export const DEFAULT_API_BASE_URL = 'http://localhost:3000/api/v1';

export class ApiError extends Error {
  constructor(message, status = 0, details = null) {
    super(message || 'Request failed');
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export function getApiBaseUrl() {
  const value = process.env.REACT_APP_API_BASE_URL || DEFAULT_API_BASE_URL;
  return value.replace(/\/+$/, '');
}

function isAbsoluteUrl(path) {
  return /^https?:\/\//i.test(path);
}

function buildQuery(query) {
  if (!query) return '';
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
      return;
    }
    params.set(key, value);
  });

  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export function buildApiUrl(path, query) {
  const rawPath = String(path || '');
  if (isAbsoluteUrl(rawPath)) {
    return `${rawPath}${buildQuery(query)}`;
  }

  const normalizedPath = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  return `${getApiBaseUrl()}${normalizedPath}${buildQuery(query)}`;
}

async function parseResponse(response) {
  if (response.status === 204) return null;

  const text = await response.text();
  if (!text) return null;

  const contentType = response.headers?.get?.('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function errorMessage(payload, fallback) {
  if (!payload) return fallback;
  if (typeof payload === 'string') return payload;
  if (Array.isArray(payload.message)) return payload.message.join(', ');
  return payload.message || payload.error || fallback;
}

async function refreshSession() {
  const refreshToken = getRefreshToken();
  const response = await fetch(buildApiUrl('/auth/refresh'), {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(refreshToken ? { Authorization: `Bearer ${refreshToken}` } : {}),
    },
    body: refreshToken ? JSON.stringify({ refreshToken }) : undefined,
  });

  const payload = await parseResponse(response);
  if (!response.ok) {
    throw new ApiError(
      errorMessage(payload, 'Session refresh failed'),
      response.status,
      payload,
    );
  }

  return writeSession(payload);
}

export async function apiRequest(path, options = {}) {
  const {
    method = 'GET',
    body,
    headers = {},
    query,
    auth = true,
    retryOnUnauthorized = true,
    signal,
  } = options;

  const requestHeaders = {
    Accept: 'application/json',
    ...headers,
  };

  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
  let requestBody = body;
  if (body !== undefined && body !== null && !isFormData) {
    requestHeaders['Content-Type'] = requestHeaders['Content-Type'] || 'application/json';
    requestBody = JSON.stringify(body);
  }

  const accessToken = getAccessToken();
  if (auth && accessToken) {
    requestHeaders.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(buildApiUrl(path, query), {
    method,
    credentials: 'include',
    headers: requestHeaders,
    body: requestBody,
    signal,
  });

  const payload = await parseResponse(response);

  if (response.status === 401 && auth && retryOnUnauthorized) {
    try {
      await refreshSession();
      return apiRequest(path, {
        ...options,
        retryOnUnauthorized: false,
      });
    } catch (error) {
      clearSession();
      throw error;
    }
  }

  if (!response.ok) {
    throw new ApiError(errorMessage(payload, response.statusText), response.status, payload);
  }

  return payload;
}

export function hasStoredSession() {
  return Boolean(readSession()?.accessToken || readSession()?.user);
}
