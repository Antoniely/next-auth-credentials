import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // El token va a existir si el usuario inicio session
  const token = await getToken({
    req,
    secret: process.env.JWT_SIGNING_PRIVATE_KEY,
  });

  // Permite la request si lo siguiente es verdadero
  // 1- Es una request para next-auth session & provider fetching
  // 2- El token existe
  const { pathname } = req.nextUrl;
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // Redireciona a login si no tienen un token & si solicitan una ruta protegida
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
