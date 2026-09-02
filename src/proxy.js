import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export default async function middleware(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );








  

  const { data: { user } } = await supabase.auth.getUser();

  const pathName = request.nextUrl.pathname;
// if any one want the manifest for me i'll use it for PWA Builder by microsoft opensource project
 if (pathName === '/manifest.json' || pathName.startsWith('/icons/')) {
    return response;
  }
  


const isAuthPage =
  pathName === '/login' ||
  pathName === '/signup' ||
  pathName.startsWith('/auth');
  if (!user && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

    // لو معملش clinic name وديه علي الصفحه يعمل 
  const hasClinic = user?.user_metadata?.clinicName;
  if (user && !hasClinic && pathName !== '/onboarding') {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }
  // لو عامل اصلا خلاص باي روح عادي 
  if (user && hasClinic && pathName === '/onboarding') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;


}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};