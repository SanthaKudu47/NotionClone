-- DROP TYPE IF EXISTS "public"."pricing_plan_interval";--> statement-breakpoint
-- DROP TYPE IF EXISTS "public"."pricing_type";--> statement-breakpoint
-- DROP TYPE IF EXISTS "public"."subscription_status";--> statement-breakpoint

-- CREATE TYPE "public"."pricing_plan_interval" AS ENUM('day', 'week', 'month', 'year');--> statement-breakpoint
-- CREATE TYPE "public"."pricing_type" AS ENUM('one_time', 'recurring');--> statement-breakpoint
-- CREATE TYPE "public"."subscription_status" AS ENUM('trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid');

