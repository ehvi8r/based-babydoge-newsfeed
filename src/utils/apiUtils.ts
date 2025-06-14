
interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
};

class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

// Type definitions for API responses
export interface GlobalData {
  data: {
    total_market_cap: { usd: number };
    total_volume: { usd: number };
    market_cap_percentage: { btc: number };
    market_cap_change_percentage_24h_usd: number;
  };
}

export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

export interface BitcoinPriceData {
  prices: [number, number][];
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchWithRetry = async <T>(
  url: string,
  config: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      console.log(`API Request attempt ${attempt + 1} for: ${url}`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        // Handle rate limiting specifically
        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After');
          const delay = retryAfter ? parseInt(retryAfter) * 1000 : config.baseDelay * Math.pow(2, attempt);
          console.log(`Rate limited. Waiting ${delay}ms before retry...`);
          await sleep(Math.min(delay, config.maxDelay));
          continue;
        }
        
        throw new ApiError(`HTTP ${response.status}: ${response.statusText}`, response.status);
      }
      
      const data = await response.json();
      console.log(`API Request successful for: ${url}`);
      return data;
    } catch (error) {
      lastError = error as Error;
      console.error(`API Request failed (attempt ${attempt + 1}):`, error);
      
      if (attempt < config.maxRetries) {
        const delay = Math.min(config.baseDelay * Math.pow(2, attempt), config.maxDelay);
        console.log(`Retrying in ${delay}ms...`);
        await sleep(delay);
      }
    }
  }
  
  throw lastError!;
};

// Cache implementation
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class ApiCache {
  private cache = new Map<string, CacheEntry<any>>();
  
  set<T>(key: string, data: T, ttlMinutes: number = 5): void {
    const now = Date.now();
    this.cache.set(key, {
      data,
      timestamp: now,
      expiry: now + (ttlMinutes * 60 * 1000)
    });
  }
  
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }
  
  clear(): void {
    this.cache.clear();
  }
}

export const apiCache = new ApiCache();

export const fetchWithCache = async <T>(
  url: string,
  cacheKey: string,
  cacheTtlMinutes: number = 5
): Promise<T> => {
  // Try cache first
  const cached = apiCache.get<T>(cacheKey);
  if (cached) {
    console.log(`Using cached data for: ${cacheKey}`);
    return cached;
  }
  
  // Fetch with retry
  const data = await fetchWithRetry<T>(url);
  
  // Cache the result
  apiCache.set(cacheKey, data, cacheTtlMinutes);
  
  return data;
};
