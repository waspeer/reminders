import { parseEnv, z } from 'znv';

export const env = parseEnv(import.meta.env, {
  PUBLIC_VAPID_KEY: z.string().min(1),
  PRIVATE_VAPID_KEY: z.string().min(1),
  USER_EMAIL: z.string().email().min(1),
  USER_PASSWORD: z.string().min(1),
});
