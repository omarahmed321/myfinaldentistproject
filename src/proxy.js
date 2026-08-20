import { NextResponse } from 'next/server';


export default function middleware(request) {
const token = request.cookies.get('token')?.value;
const pathName =request.nextUrl.pathname;
const isAuthPage = pathName === "/login" || pathName=="/signup";
if(!token && !isAuthPage){
    return NextResponse.redirect(new URL('/login',request.url));

}
if(token && isAuthPage){
    return NextResponse.redirect(new URL('/',request.url));
}
return NextResponse.next();
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
