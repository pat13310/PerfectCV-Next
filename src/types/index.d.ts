declare module '@upstash/ratelimit' {
  import { Redis } from '@upstash/redis';

  export interface RateLimitOptions {
    redis: Redis;
    limiter: any;
  }

  export interface RateLimitResponse {
    success: boolean;
  }

  export class Ratelimit {
    constructor(options: RateLimitOptions);
    static slidingWindow(requests: number, interval: string): any;
    limit(key: string): Promise<RateLimitResponse>;
  }

  export default Ratelimit;
}
