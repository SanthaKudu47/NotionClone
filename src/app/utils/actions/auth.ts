"use server";

import { FormState, SignupFormSchema } from "@/lib/definitions";
import { createClient } from "../superbase/server";
import { getConnectedDB } from "@/lib/superbase/db/db";
import { users } from "../../../../drizzle/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function signup(formState: FormState, formData: FormData) {
  const currentStatus = { ...formState };
  currentStatus.errors = { ...formState?.errors };

  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { success, error } = SignupFormSchema.safeParse({
    email: data.email,
    password: data.password,
  });

  if (!success) {
    const emailErrors = error.flatten().fieldErrors.email;
    const passwordErrors = error.flatten().fieldErrors.password;
    const currentStatus = {
      errors: {
        email: emailErrors,
        password: passwordErrors,
      },
      message: "Form Validation Error",
    };

    return currentStatus;
  } else {
    //no validation errors

    //check for exiting user

    try {
      const db = getConnectedDB();
      if (db) {
        const userId = await db
          .select({ id: users.id })
          .from(users)
          .where(eq(users.email, data.email));

        if (userId && userId.length > 0) {
          const currentStatus = {
            errors: undefined,
            message: "User with this email already exists",
          };

          return currentStatus;
        }
      }
    } catch (error) {
      console.log("Failed to fetch data from database");
      const currentStatus = {
        errors: undefined,
        message: "Something went wrong...!",
      };

      return currentStatus;
    }

    const response = await supabase.auth.signUp(data);
    if (response.error) {
      console.log("Failed Create User in SuperBase", response.error.message);
      currentStatus.errors = undefined;
      currentStatus.message = "Failed to Create Account";
      return currentStatus;
    } else {
      currentStatus.message = "Done";
      return currentStatus;
    }
  }
}

async function signin(formState: FormState, formData: FormData) {
  const currentStatus = { ...formState };
  currentStatus.errors = { ...formState?.errors };
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { success, error } = SignupFormSchema.safeParse({
    email: data.email,
    password: data.password,
  });

  if (!success) {
    const emailErrors = error.flatten().fieldErrors.email;
    const passwordErrors = error.flatten().fieldErrors.password;
    const currentStatus = {
      errors: {
        email: emailErrors,
        password: passwordErrors,
      },
      message: "Form Validation Error",
    };

    return currentStatus;
  } else {
    const response = await supabase.auth.signInWithPassword(data);
    if (response.error) {
      console.log("Failed Logged in SuperBase", response.error.message);
      currentStatus.errors = undefined;
      currentStatus.message = response.error.message;
      return currentStatus;
    } else {
      currentStatus.message = "Done";
      revalidatePath("/", "layout");
      redirect("/dashboard");
      //return currentStatus;
    }
  }
}

export { signup, signin };
