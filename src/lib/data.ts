// ============================================================
// KEPIFISH — Sumber data tunggal (edit semua isi website di sini)
// Single source of truth: ganti semua placeholder di file ini.
// ============================================================

import menuKepiting from "@/assets/menu-kepiting.jpg";
import menuNasiCokot from "@/assets/menu-nasi-cokot.jpg";

export const TAGLINE = "Sea-riously Good.";

/**
 * URL katalog publik yang dipakai QR Code.
 * Setelah website dipublikasikan, ganti placeholder ini dengan URL produksi
 * (contoh: "https://kepifish.lovable.app"). URL di bagian QR Code juga bisa
 * diisi ulang langsung dari halaman tanpa edit file.
 */
export const CATALOG_URL_PLACEHOLDER = "https://ganti-dengan-url-website-kepifish.com";

// ---- Kontak (belum tersedia — jangan diisi data fiktif) ----
export const CONTACT = {
  /** Nomor WhatsApp pemilik, format internasional tanpa "+" dan tanpa spasi.
   *  Contoh: "6281234567890" (62 untuk Indonesia). Kosong = tombol belum aktif. */
  whatsappNumber: "",
  whatsappMessage: "Halo Kepifish, saya ingin memesan menu",
  /** Username Instagram tanpa "@". Kosong = tautan belum aktif. */
  instagramUsername: "",
  /** Alamat usaha. Kosong = placeholder tampil di website. */
  address: "",
  /** Jam operasional. Kosong = placeholder tampil di website. */
  hours: "",
} as const;

// ---- Menu: tepat dua produk sesuai katalog resmi ----
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  /** Harga belum diberikan — placeholder, jangan mengarang angka. */
  price: string;
};

export const MENU: MenuItem[] = [
  {
    id: "kepiting-kuah-santan",
    name: "Kepiting Kuah Santan",
    description:
      "Nikmati sajian kepiting dengan kuah santan gurih yang kaya cita rasa.",
    image: menuKepiting,
    price: "Harga menyusul",
  },
  {
    id: "nasi-cokot",
    name: "Nasi Cokot",
    description:
      "Deskripsi sementara — ganti dengan deskripsi asli Nasi Cokot Kepifish.",
    image: menuNasiCokot,
    price: "Harga menyusul",
  },
];

// ---- Teks About Us (editable) ----
export const ABOUT_TEXT =
  "Kepifish hadir untuk menyajikan hidangan yang nikmat dengan karakter rasa yang khas. Kami percaya bahwa makanan lezat dapat menjadi bagian dari momen sederhana yang berkesan.";
