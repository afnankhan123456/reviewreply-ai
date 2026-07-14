type CacheItem<T> = {
  value: T;
  expiresAt: number;
};

class MemoryCache {
  private cache = new Map<string, CacheItem<any>>();

  set<T>(key: string, value: T, ttlSeconds: number = 60): void {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.cache.set(key, { value, expiresAt });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return item.value as T;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const cache = new MemoryCache();
