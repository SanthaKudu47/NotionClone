import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
  timestamp,
  text,
  foreignKey,
  pgPolicy,
  jsonb,
  boolean,
  check,
  bigint,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const pricingPlanInterval = pgEnum("pricing_plan_interval", [
  "day",
  "week",
  "month",
  "year",
]);
export const pricingType = pgEnum("pricing_type", ["one_time", "recurring"]);
export const subscriptionStatus = pgEnum("subscription_status", [
  "trialing",
  "active",
  "canceled",
  "incomplete",
  "incomplete_expired",
  "past_due",
  "unpaid",
]);

export const workSpaces = pgTable("workspaces", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }),
  workspaceOwner: uuid("workspace_owner").notNull(),
  title: text("title").notNull(),
  iconId: text("icon_id").notNull(),
  data: text("data"),
  inTrash: text("in_trash"),
  logo: text("logo"),
  bannerUrl: text("banner_url"),
});

export const folders = pgTable("folders", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }),
  title: text("title").notNull(),
  iconId: text("icon_id").notNull(),
  data: text("data"),
  inTrash: text("in_trash"),
  bannerUrl: text("banner_url"),
  workspaceId: uuid("workspace_id").references(() => workSpaces.id, {
    onDelete: "cascade",
  }),
});

export const files = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }),
  title: text("title").notNull(),
  iconId: text("icon_id").notNull(),
  data: text("data"),
  inTrash: text("in_trash"),
  bannerUrl: text("banner_url"),
  workspaceId: uuid("workspace_id")
    .references(() => workSpaces.id, {
      onDelete: "cascade",
    })
    .notNull(),
  folderId: uuid("folder_id").references(() => folders.id, {
    onDelete: "cascade",
  }),
});

export const users = pgTable(
  "users",
  {
    id: uuid().primaryKey().notNull(),
    fullName: text("full_name"),
    avatarUrl: text("avatar_url"),
    billingAddress: jsonb("billing_address"),
    paymentMethod: jsonb("payment_method"),
    email: text(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "string",
    }).default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    // foreignKey({
    // 		columns: [table.id],
    // 		foreignColumns: [table.id],
    // 		name: "users_id_fkey"
    // 	}),
    pgPolicy("Can update own user data.", {
      as: "permissive",
      for: "update",
      to: ["public"],
      using: sql`(( SELECT auth.uid() AS uid) = id)`,
    }),
    pgPolicy("Can view own user data.", {
      as: "permissive",
      for: "select",
      to: ["public"],
    }),
  ]
);

export const customers = pgTable(
  "customers",
  {
    id: uuid().primaryKey().notNull(),
    stripeCustomerId: text("stripe_customer_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.id],
      foreignColumns: [users.id],
      name: "customers_id_fkey",
    }),
  ]
);

export const products = pgTable(
  "products",
  {
    id: text().primaryKey().notNull(),
    active: boolean(),
    name: text(),
    description: text(),
    image: text(),
    metadata: jsonb(),
  },
  (table) => [
    pgPolicy("Allow public read-only access.", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`true`,
    }),
  ]
);

export const prices = pgTable(
  "prices",
  {
    id: text().primaryKey().notNull(),
    productId: text("product_id"),
    active: boolean(),
    description: text(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    unitAmount: bigint("unit_amount", { mode: "number" }),
    currency: text(),
    type: pricingType(),
    interval: pricingPlanInterval(),
    intervalCount: integer("interval_count"),
    trialPeriodDays: integer("trial_period_days"),
    metadata: jsonb(),
  },
  (table) => [
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "prices_product_id_fkey",
    }),
    pgPolicy("Allow public read-only access.", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`true`,
    }),
    check("prices_currency_check", sql`char_length(currency) = 3`),
  ]
);

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: text().primaryKey().notNull(),
    userId: uuid("user_id").notNull(),
    status: subscriptionStatus(),
    metadata: jsonb(),
    priceId: text("price_id"),
    quantity: integer(),
    cancelAtPeriodEnd: boolean("cancel_at_period_end"),
    created: timestamp({ withTimezone: true, mode: "string" })
      .default(sql`timezone('utc'::text, now())`)
      .notNull(),
    currentPeriodStart: timestamp("current_period_start", {
      withTimezone: true,
      mode: "string",
    })
      .default(sql`timezone('utc'::text, now())`)
      .notNull(),
    currentPeriodEnd: timestamp("current_period_end", {
      withTimezone: true,
      mode: "string",
    })
      .default(sql`timezone('utc'::text, now())`)
      .notNull(),
    endedAt: timestamp("ended_at", {
      withTimezone: true,
      mode: "string",
    }).default(sql`timezone('utc'::text, now())`),
    cancelAt: timestamp("cancel_at", {
      withTimezone: true,
      mode: "string",
    }).default(sql`timezone('utc'::text, now())`),
    canceledAt: timestamp("canceled_at", {
      withTimezone: true,
      mode: "string",
    }).default(sql`timezone('utc'::text, now())`),
    trialStart: timestamp("trial_start", {
      withTimezone: true,
      mode: "string",
    }).default(sql`timezone('utc'::text, now())`),
    trialEnd: timestamp("trial_end", {
      withTimezone: true,
      mode: "string",
    }).default(sql`timezone('utc'::text, now())`),
  },
  (table) => [
    foreignKey({
      columns: [table.priceId],
      foreignColumns: [prices.id],
      name: "subscriptions_price_id_fkey",
    }),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "subscriptions_user_id_fkey",
    }),
    pgPolicy("Can only view own subs data.", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`(( SELECT auth.uid() AS uid) = user_id)`,
    }),
  ]
);

//soft relations

export const workSpacesRelations = relations(workSpaces, ({ many }) => {
  return {
    files: many(files),
    folders: many(folders),
  };
});

export const foldersRelations = relations(folders, ({ one, many }) => {
  return {
    files: many(files),
    workspace: one(workSpaces, {
      fields: [folders.workspaceId],
      references: [workSpaces.id],
    }),
  };
});

//relationship between file and workspace
//workspace can have many
//file needs to be belongs to only one workspace

export const filesRelations = relations(files, ({ one }) => {
  return {
    folder: one(folders, {
      fields: [files.folderId],
      references: [folders.id],
    }),
    workSpace: one(workSpaces, {
      fields: [files.workspaceId],
      references: [workSpaces.id],
    }),
  };
});

export const customersRelations = relations(customers, ({ one }) => ({
  usersInAuth: one(users, {
    fields: [customers.id],
    references: [users.id],
  }),
}));

export const pricesRelations = relations(prices, ({ one, many }) => ({
  product: one(products, {
    fields: [prices.productId],
    references: [products.id],
  }),
  subscriptions: many(subscriptions),
}));

export const productsRelations = relations(products, ({ many }) => ({
  prices: many(prices),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  price: one(prices, {
    fields: [subscriptions.priceId],
    references: [prices.id],
  }),
  users: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}));
