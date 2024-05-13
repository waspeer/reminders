import { randomUUID } from 'crypto';
import { User, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(User).values({ id: randomUUID(), email: 'mail@wannessalome.nl' });
}
