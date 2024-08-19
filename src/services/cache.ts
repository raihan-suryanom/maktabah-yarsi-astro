import Time from "~/lib/utils/time";

export interface ICache<P> {
  get(key: string): P | undefined;
  has(key: string): boolean;
  set(key: string, value: P, ttl: number): void;
  del(key: string, tag?: string): void;
}

type CacheEntry<P> = {
  value: P;
  expiration: number;
};

export class MemoryCache<P> implements ICache<P> {
  private cache: Map<string, CacheEntry<P>> = new Map();

  constructor() {
    setInterval(() => this.cleanUpExpiredCache(), Time.minutes(1));
  }

  get(key: string): P | undefined {
    const entry = this.cache.get(key);

    if (!entry) return undefined;
    if (entry.expiration < Date.now()) return undefined;

    console.info(new Date().toLocaleTimeString(), "[cache] GET:", key);
    return entry.value;
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  set(key: string, value: P, ttl: number): void {
    console.info(new Date().toLocaleTimeString(), "[cache] SET:", key);

    this.cache.set(key, {
      value,
      expiration: Date.now() + ttl,
    });
  }

  del(key: string, tag?: string): void {
    console.info(new Date().toLocaleTimeString(), `${tag}[cache] DEL:`, key);
    this.cache.delete(key);
  }

  private cleanUpExpiredCache() {
    const now = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiration < now) {
        this.del(key, "[clean-up]");
      }
    }
  }
}
