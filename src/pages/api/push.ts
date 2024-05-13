import type { APIRoute } from 'astro';
import { User, db, eq, Subscription as SubscriptionTable } from 'astro:db';
import Queue from 'p-queue';
import webpush from 'web-push';
import { z } from 'zod';
import { env } from '../../lib/env';

const Subscription = z.object({
  endpoint: z.string(),
  keys: z.object({
    p256dh: z.string(),
    auth: z.string(),
  }),
});

const Reminders = z.array(z.string());

const queue = new Queue();

export const POST: APIRoute = async () => {
  const users = await db
    .select({
      id: User.id,
      reminders: User.reminders,
      endpoint: SubscriptionTable.endpoint,
      keys: SubscriptionTable.keys,
    })
    .from(User)
    .innerJoin(SubscriptionTable, eq(SubscriptionTable.userId, User.id));

  if (users.length === 0) {
    return new Response('No users found', { status: 202 });
  }

  for (const user of users) {
    const subscriptionResult = Subscription.safeParse(user);
    const remindersResult = Reminders.safeParse(user.reminders);

    if (!subscriptionResult.success) {
      console.log('Subscription not found', user.id);
      continue;
    }

    if (!remindersResult.success || remindersResult.data.length === 0) {
      console.log('No reminders found', user.id);
      continue;
    }

    const subscription = subscriptionResult.data;
    const reminders = remindersResult.data;
    const randomReminder = reminders[Math.floor(Math.random() * reminders.length)];

    queue.add(async () => {
      const sendResult = await webpush.sendNotification(subscription, randomReminder, {
        vapidDetails: {
          subject: 'mailto:mail@wannessalome.nl',
          privateKey: env.PRIVATE_VAPID_KEY,
          publicKey: env.PUBLIC_VAPID_KEY,
        },
      });

      console.log('sendResult', sendResult);
    });
  }

  await queue.onEmpty();

  return new Response('ok', { status: 200 });
};
