import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";
const COOKIE_NAME = "barber_admin_session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const cookieStore = await cookies();
      cookieStore.set(COOKIE_NAME, "admin_authenticated_token_xyz", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({
        success: true,
        message: "Login berhasil! Selamat datang di Panel Administrator Barberia Luxe.",
        user: {
          username: "admin",
          name: "Master Administrator",
          role: "admin",
        },
      });
    }

    return NextResponse.json(
      { success: false, error: "Username atau kata sandi tidak valid. (Gunakan demo: admin / admin123)" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Kesalahan server: " + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    return NextResponse.json({
      success: true,
      message: "Logout berhasil.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal logout: " + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(COOKIE_NAME);
    const isAuthenticated = !!session && session.value === "admin_authenticated_token_xyz";

    return NextResponse.json({
      authenticated: isAuthenticated,
      user: isAuthenticated
        ? {
            username: "admin",
            name: "Master Administrator",
            role: "admin",
          }
        : null,
    });
  } catch (error) {
    return NextResponse.json(
      { authenticated: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
