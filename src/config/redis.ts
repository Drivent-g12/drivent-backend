import { createClient } from 'redis';
import { loadEnv } from './envs';

loadEnv();

export const DEFAULT_EXP = 1800;

const redis = createClient({
  password: 'TkKca11ptozDN8yPyuORxL8Ii4JSU6RH',
  socket: {
    host: 'redis-19937.c259.us-central1-2.gce.cloud.redislabs.com',
    port: 19937,
  },
});

async () => {
  console.log('connecting redis...');
  await redis.connect();
};

export default redis;
