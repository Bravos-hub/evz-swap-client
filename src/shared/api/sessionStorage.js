export const SESSION_STORAGE_KEY = 'evz.auth.session';
export const LEGACY_SESSION_KEY = 'evz.session';

function getStorage() {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function firstValue(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== '');
}

export function normalizeUser(payload) {
  if (!payload || typeof payload !== 'object') return null;
  return firstValue(payload.user, payload.data?.user, payload.profile, payload.data) || null;
}

export function normalizeSession(payload = {}, existing = {}) {
  const source = payload && typeof payload === 'object' ? payload : {};
  const data = source.data && typeof source.data === 'object' ? source.data : {};

  const accessToken = firstValue(
    source.accessToken,
    source.access_token,
    source.token,
    source.jwt,
    data.accessToken,
    data.access_token,
    data.token,
    existing.accessToken,
  );
  const refreshToken = firstValue(
    source.refreshToken,
    source.refresh_token,
    data.refreshToken,
    data.refresh_token,
    existing.refreshToken,
  );
  const user = normalizeUser(source) || existing.user || null;

  return {
    ...existing,
    ...source,
    accessToken,
    refreshToken,
    user,
  };
}

export function readSession() {
  const storage = getStorage();
  if (!storage) return null;

  try {
    const raw = storage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

export function writeSession(session) {
  const storage = getStorage();
  if (!storage || !session) return null;

  const normalized = normalizeSession(session, readSession() || {});
  try {
    storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(normalized));
    if (normalized.accessToken) {
      storage.setItem(LEGACY_SESSION_KEY, 'active');
      storage.setItem('evz.auth.verified', 'true');
    }
    if (normalized.user?.name || normalized.user?.displayName) {
      storage.setItem(
        'evz.profile.name',
        normalized.user.name || normalized.user.displayName,
      );
    }
  } catch {
    // Storage is best-effort; the returned session remains authoritative for callers.
  }

  return normalized;
}

export function updateSession(patch) {
  return writeSession(normalizeSession(patch, readSession() || {}));
}

export function clearSession() {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.removeItem(SESSION_STORAGE_KEY);
    storage.removeItem(LEGACY_SESSION_KEY);
    storage.removeItem('evz.auth.verified');
  } catch {
    // ignore
  }
}

export function getAccessToken() {
  return readSession()?.accessToken || '';
}

export function getRefreshToken() {
  return readSession()?.refreshToken || '';
}

