import { NextResponse } from "next/server";
import { getAppointments, createAppointment } from "@/lib/data";

export async function GET() {
  try {
    const appointments = getAppointments();
    return NextResponse.json({ success: true, appointments });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data reservasi: " + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      client_name,
      client_phone,
      client_email,
      service_ids,
      barber_id,
      appointment_date,
      appointment_time,
      notes,
    } = body;

    // Validate required fields
    if (!client_name || !client_phone || !client_email || !service_ids || service_ids.length === 0 || !appointment_date || !appointment_time) {
      return NextResponse.json(
        { success: false, error: "Mohon lengkapi semua kolom yang wajib diisi." },
        { status: 400 }
      );
    }

    const appointment = createAppointment({
      client_name,
      client_phone,
      client_email,
      service_ids,
      barber_id: barber_id ? Number(barber_id) : null,
      appointment_date,
      appointment_time,
      notes: notes || "",
    });

    return NextResponse.json({
      success: true,
      message: "Reservasi berhasil dibuat!",
      appointment,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal memproses reservasi: " + (error as Error).message },
      { status: 500 }
    );
  }
}
