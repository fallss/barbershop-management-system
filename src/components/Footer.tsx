import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer_section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 xs-padding">
            <div className="copyright">
              © {new Date().getFullYear()}{" "}
              <strong>BARBERIA LUXE</strong> — Barbershop & Salon Grooming Pria Premium. Seluruh hak cipta dilindungi.
            </div>
          </div>
          <div className="col-md-6 xs-padding text-md-right">
            <ul className="footer_social">
              <li>
                <Link href="/booking">
                  <i className="far fa-calendar-check mr-1"></i> Reservasi
                </Link>
              </li>
              <li>
                <Link href="/#services">Layanan</Link>
              </li>
              <li>
                <Link href="/#contact-us">Lokasi & Kontak</Link>
              </li>
              <li>
                <Link href="/admin/login" style={{ color: "var(--primary-gold)" }}>
                  <i className="fas fa-user-shield mr-1"></i> Portal Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
