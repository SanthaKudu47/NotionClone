import { updateSession } from "@/app/utils/superbase/middleware";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/dashboard", "/signin", "/signup","/password-reset"],
};
