import { NextResponse } from "next/server";
import { updateAppointmentStatus, deleteAppointment } from "@/lib/data";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, cancellation_reason } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "ID dan status harus disertakan." },
        { status: 400 }
      );
    }

    const updated = updateAppointmentStatus(id, status, cancellation_reason);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Data reservasi tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Status reservasi ${id} berhasil diubah menjadi ${status}.`,
      appointment: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui status: " + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID reservasi harus disertakan." },
        { status: 400 }
      );
    }

    const success = deleteAppointment(id);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Reservasi tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Reservasi ${id} berhasil dihapus.`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal menghapus reservasi: " + (error as Error).message },
      { status: 500 }
    );
  }
}
