import { column, defineDb, defineTable } from 'astro:db';

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    email: column.text(),
    reminders: column.json({ default: [] }),
  },
});

const Subscription = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    userId: column.text({ references: () => User.columns.id }),
    endpoint: column.text({ unique: true }),
    expirationTime: column.number({ optional: true }),
    keys: column.json({ optional: true }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    User,
    Subscription,
  },
});
