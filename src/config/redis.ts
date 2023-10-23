import { createClient } from 'redis';
import { loadEnv } from './envs';

loadEnv();

export const DEFAULT_EXP = 1800;

const redis = createClient({
  url: process.env.REDIS_URL,
});

async () => {
  console.log('connecting redis...');
  await redis.connect();
};

export default redis;
