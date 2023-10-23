import { createClient } from 'redis';

export const DEFAULT_EXP = 3600;

export const redis = createClient({
  password: 'TkKca11ptozDN8yPyuORxL8Ii4JSU6RH',
  socket: {
    host: 'redis-19937.c259.us-central1-2.gce.cloud.redislabs.com',
    port: 19937,
  },
});

export async function connectRedis(): Promise<void> {
  console.log('Connecting to Redis...');
  await redis.on('error', (err) => console.log('Redis Client Error', err)).connect();
}
