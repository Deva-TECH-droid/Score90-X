const cache = new Map();
const inFlightRequests = new Map<string, Promise<unknown>>();

export const getCache = (key: string) => {
  const item = cache.get(key);

  if (!item) return null;

  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }

  return item.data;
};

export const setCache = (key: string, data: any, ttl = 1000 * 60 * 30) => {
  cache.set(key, {
    data,
    expiry: Date.now() + ttl,
  });
};

export const getOrSetInFlightRequest = <T>(key: string, request: () => Promise<T>) => {
  const existing = inFlightRequests.get(key);

  if (existing) {
    return existing as Promise<T>;
  }

  const promise = request().finally(() => {
    inFlightRequests.delete(key);
  });

  inFlightRequests.set(key, promise as Promise<unknown>);

  return promise;
};
