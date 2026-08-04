type CacheItem<T> = {
  data: T;
  timestamp: number;
};

const cache = new Map<string, CacheItem<any>>();

export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = 5 * 60 * 1000,
): Promise<T> {
  const now = Date.now();
  const cached = cache.get(key);

  if (cached) {
    const age = now - cached.timestamp;

    if (age < ttl) {
      console.log(`
================ CACHE HIT ================
Key          : ${key}
Age          : ${(age / 1000).toFixed(1)} sec
Expires In   : ${((ttl - age) / 1000).toFixed(1)} sec
Cache Size   : ${cache.size}
===========================================
`);

      return cached.data;
    }

    console.log(`
============= CACHE EXPIRED ==============
Key          : ${key}
Expired After: ${(age / 1000).toFixed(1)} sec
==========================================
`);

    cache.delete(key);
  }

  console.log(`
================ CACHE MISS ===============
Key          : ${key}
Fetching fresh data from API...
===========================================
`);

  const start = Date.now();

  const data = await fetcher();

  const fetchTime = Date.now() - start;

  cache.set(key, {
    data,
    timestamp: now,
  });

  console.log(`
================ CACHE SAVED ==============
Key          : ${key}
Fetch Time   : ${fetchTime} ms
TTL          : ${ttl / 1000} sec
Cache Size   : ${cache.size}
===========================================
`);

  return data;
}