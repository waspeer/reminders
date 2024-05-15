import type { Config } from '@netlify/functions';

export default async function handler(request: Request) {
  const url = new URL(request.url);
  const pushUrl = new URL('/api/push', url.origin);

  const response = await fetch(pushUrl, { method: 'POST' });

  console.log('triggered push, got response:', await response.text());
}

export const config: Config = {
  schedule: '0 7 * * *',
};
