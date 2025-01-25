"use server";

import {
  FormState,
  ResetFormSchema,
  ResetFormState,
  SignupFormSchema,
} from "@/lib/definitions";
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

async function resetPassword(formState: ResetFormState, formData: FormData) {
  console.log(formState, formData);
  const BASEURL = process.env.BASE_URL;
  const currentStatus = { ...formState };
  currentStatus.errors = { ...formState?.errors };

  if (!BASEURL) {
    console.log("failed to get env variable");
    return currentStatus;
  }

  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
  };

  const { success, error } = ResetFormSchema.safeParse({
    email: data.email,
  });

  if (!success) {
    const emailErrors = error.flatten().fieldErrors.email;
    const currentStatus = {
      errors: {
        email: emailErrors,
      },
      message: "Form Validation Error",
    };

    return currentStatus;
  } else {
    const email = data.email;
    const response = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${BASEURL}/password-update`,
    });

    if (response.error) {
      currentStatus.message = "Failed to send Email";
    } else {
      currentStatus.message = "Done";
    }
  }

  return currentStatus;
}

export { signup, signin, resetPassword };
