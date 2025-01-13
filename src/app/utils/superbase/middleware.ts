import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  let loggedIn = user ? true : false;

  if (error) {
    console.log( error.message);
    if (
      request.nextUrl.pathname.startsWith("/signin") ||
      request.nextUrl.pathname.startsWith("/signup") ||
      request.nextUrl.pathname.startsWith("/password-reset")
    ) {
      return supabaseResponse;
    } else {
      const url = request.nextUrl.clone();
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  } else {
    if (loggedIn) {
      if (
        request.nextUrl.pathname.startsWith("/signup") ||
        request.nextUrl.pathname.startsWith("/signin") ||
        request.nextUrl.pathname.startsWith("/password-reset")
      ) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      } else {
        return supabaseResponse;
      }
    } else {
      if (
        !(
          request.nextUrl.pathname.startsWith("/signin") ||
          request.nextUrl.pathname.startsWith("/signup")
        )
      ) {
        const url = request.nextUrl.clone();
        url.pathname = "/signin";
        return NextResponse.redirect(url);
      } else {
        return supabaseResponse;
      }
    }
    // if (
    //   !user &&
    //   !request.nextUrl.pathname.startsWith("/signup") &&
    //   !request.nextUrl.pathname.startsWith("/signin")
    // ) {
    //   //no user, potentially respond by redirecting the user to the login page
    //   const url = request.nextUrl.clone();
    //   url.pathname = "/signin";
    //   return NextResponse.redirect(url);
    // } else {
    //   console.log("we have user");
    //   return supabaseResponse;
    // }

    // if (
    //   (user && request.nextUrl.pathname.startsWith("signin")) ||
    //   (user && request.nextUrl.pathname.startsWith("signup"))
    // ) {
    //   const url = request.nextUrl.clone();
    //   url.pathname = "/dashboard";
    //   return NextResponse.redirect(url);
    // }
  }
}
