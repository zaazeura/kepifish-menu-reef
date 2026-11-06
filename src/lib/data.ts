// ============================================================
// KEPIFISH — Sumber data tunggal (edit semua isi website di sini)
// Single source of truth: ganti semua placeholder di file ini.
// ============================================================

import menuKepiting from "@/assets/menu-kepiting.jpg";
import menuNasiCokot from "@/assets/menu-nasi-cokot.jpg";
import logoAsset from "@/assets/kepifish-logo.jpg.asset.json";
import katalogDaftarMenu from "@/assets/katalog-daftar-menu.jpg.asset.json";
import katalogKepiting from "@/assets/katalog-kepiting.png.asset.json";
import katalogNasiCokot from "@/assets/katalog-nasi-cokot.png.asset.json";

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
  whatsappNumber: "628219710724",
  whatsappMessage: "Halo Kepifish, saya ingin memesan menu",
  /** Username Instagram tanpa "@". Kosong = tautan belum aktif. */
  instagramUsername: "kepifish_",
  /** Alamat usaha. Kosong = placeholder tampil di website. */
  address: "balikpapan, kalimantan timur",
  /** Jam operasional. Kosong = placeholder tampil di website. */
  hours: "Senin - Minggu, 10:00 - 21:00",
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
      "Perpaduan gurihnya kepiting dengan kuah santan yang lezat, terasa semakin nikmat dengan rempah pilihan.",
    image: menuKepiting,
    price: "Rp 35.000",
  },
  {
    id: "nasi-cokot",
    name: "Nasi Cokot",
    description:
      "Nasi hangat dengan suwiran ikan dan kepiting, dipadukan dengan bumbu khas kelapa yang gurih dan nikmat.",
    image: menuNasiCokot,
    price: "Rp 20.000",
  },
];

// ---- Logo asli (jangan digambar ulang / diubah warnanya) ----
export const LOGO_URL = logoAsset.url;

// ---- Katalog gambar (poster). Tambah/ganti/hapus item di sini kapan saja.
//      Unggah gambar baru, lalu ganti `image` dengan URL-nya. ----
export type CatalogImage = { id: string; title: string; image: string };

export const CATALOG_IMAGES: CatalogImage[] = [
  { id: "daftar-menu", title: "Daftar Menu Kepifish", image: katalogDaftarMenu.url },
  { id: "kepiting", title: "Kepiting Kuah Santan", image: katalogKepiting.url },
  { id: "nasi-cokot", title: "Nasi Cokot", image: katalogNasiCokot.url },
];

// ---- Teks About Us (editable) ----
export const ABOUT_TEXT =
  "Kepifish hadir untuk menyajikan hidangan yang nikmat dengan karakter rasa yang khas. Kami percaya bahwa makanan lezat dapat menjadi bagian dari momen sederhana yang berkesan.";
