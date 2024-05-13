import { randomUUID } from 'crypto';
import { defineAction, z } from 'astro:actions';
import { Subscription, User, db, eq } from 'astro:db';

const updateReminders = defineAction({
  accept: 'form',
  input: z.object({
    userId: z.string(),
    reminders: z.string(),
  }),
  async handler({ userId, reminders }) {
    const remindersArray = reminders.split('\r\n');
    await db.update(User).set({ reminders: remindersArray }).where(eq(User.id, userId));
  },
});

const subscribe = defineAction({
  accept: 'json',
  input: z.object({
    userId: z.string(),
    subscription: z.object({
      endpoint: z.string(),
      expirationTime: z.number().nullable().optional(),
      keys: z.record(z.string()).optional(),
    }),
  }),
  async handler({ userId, subscription }) {
    try {
      await db
        .insert(Subscription)
        .values({
          id: randomUUID(),
          userId,
          ...subscription,
        })
        .onConflictDoUpdate({
          target: Subscription.endpoint,
          set: {
            expirationTime: subscription.expirationTime,
            keys: subscription.keys,
          },
        });

      return { success: true };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
});

export const server = {
  updateReminders,
  subscribe,
};
