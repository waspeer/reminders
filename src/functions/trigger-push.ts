import type { Config } from '@netlify/functions';

export default async function handler(request: Request) {
  const url = new URL(request.url);
  const pushUrl = new URL('/api/push', url.origin);

  await fetch(pushUrl, { method: 'POST' });
}

export const config: Config = {
  // Daily at 9am
  schedule: '0 9 * * *',
};
