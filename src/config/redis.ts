import { createClient } from 'redis';
import { loadEnv } from './envs';

loadEnv();

export const DEFAULT_EXP = 1800;

export const redis = createClient({
  password: process.env.REDIS_PASSWORD,
  legacyMode: true,
  socket: {
    host: process.env.REDIS_HOSTNAME,
    port: Number(process.env.REDIS_PORT),
  },
});

(async () => {
  console.log('Connecting to Redis...');
  await redis.connect();
})();

export default redis;
