import { MemoryCache } from "./cache";

import type { ICache } from "./cache";

class IsrService implements ICache<Response> {
  constructor(private cache: ICache<Response>) {}

  get(key: string): Response | undefined {
    const result = this.cache.get(key);
    if (!result) return undefined;

    return result.clone();
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  set(key: string, value: Response, ttl: number): void {
    this.cache.set(key, value.clone(), ttl);
  }

  del(key: string, tag?: string): void {
    this.cache.del(key, tag);
  }
}

const cache = new MemoryCache<Response>();

export const isr = new IsrService(cache);

export function invalidate(key: string) {
  isr.del(key, "[isr]");
}
