import { axiosClient } from '@/lib/axios';

const playerImageCache = new Map<string, string | null>();
const cacheStorageKey = 'score90x-player-images';

function getCachedPlayerImageKey(playerName: string) {
  return playerName.trim().toLowerCase();
}

function readPersistedCache() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const raw = window.localStorage.getItem(cacheStorageKey);

    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw) as Record<string, string | null>;

    Object.entries(parsed).forEach(([key, value]) => {
      playerImageCache.set(key, value ?? null);
    });
  } catch {
    // Ignore malformed cache data.
  }
}

function writePersistedCache() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const entries = Object.fromEntries(playerImageCache.entries());
    window.localStorage.setItem(cacheStorageKey, JSON.stringify(entries));
  } catch {
    // Ignore storage write failures.
  }
}

if (typeof window !== 'undefined') {
  readPersistedCache();
}

export async function getPlayerImage(playerName: string) {
  const normalizedName = getCachedPlayerImageKey(playerName);

  if (!normalizedName) {
    return null;
  }

  const cached = playerImageCache.get(normalizedName);

  if (cached !== undefined) {
    return cached;
  }

  try {
    const response = await axiosClient.get<{ success: boolean; data: string | null }>(
      '/player-image',
      {
        params: { name: playerName },
        timeout: 10000,
      },
    );

    const image = response.data.data ?? null;
    playerImageCache.set(normalizedName, image);
    writePersistedCache();

    return image;
  } catch {
    playerImageCache.set(normalizedName, null);
    writePersistedCache();
    return null;
  }
}
