import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Nama, email, dan pesan wajib diisi." },
        { status: 400 }
      );
    }

    // In production, this can send an email via Resend / SendGrid or save to database
    console.log("Pesan Kontak Diterima:", { name, email, phone, message, timestamp: new Date().toISOString() });

    return NextResponse.json({
      success: true,
      message: `Terima kasih Bapak/Ibu ${name}. Pesan Anda telah kami terima. Tim Customer Care Barberia Luxe akan segera menghubungi Anda.`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal mengirim pesan: " + (error as Error).message },
      { status: 500 }
    );
  }
}
