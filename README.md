# KEPIFISH — Website Katalog Digital

Website katalog digital untuk KEPIFISH (kuliner seafood). Satu halaman scroll: Hero, Our Menu, Katalog Foto, About Us, Contact, QR Code, dan Footer, dengan tombol pemesanan langsung ke WhatsApp.

Tagline: **"Sea-riously Good."**

## Menjalankan di VS Code

1. Install [Node.js 20+](https://nodejs.org) (atau gunakan [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).
2. Clone repo ini, lalu buka foldernya di VS Code (`File → Open Folder`).
3. VS Code akan menyarankan ekstensi (Tailwind, ESLint, Prettier) — klik *Install* pada notifikasi.
4. Di terminal VS Code:

```sh
npm install
npm run dev
```

5. Buka `http://localhost:8080` di browser.

## Mengubah isi katalog (menu, harga, kontak, dll)

Semua isi yang bisa diubah pemilik ada di **satu file**: `src/lib/data.ts`

- Daftar menu (nama, harga, deskripsi, foto)
- Nomor WhatsApp untuk tombol "Pesan Sekarang"
- Instagram, alamat, jam buka
- URL katalog untuk QR Code
- Teks About Us

Cukup edit file itu, simpan, dan tampilan ikut berubah.

## Struktur proyek

```
src/
├── components/kepifish/   # Section satu per satu (Navbar, Hero, Menu, Contact, ...)
├── lib/data.ts            # SEMUA konten yang bisa diedit pemilik
├── lib/links.ts           # Pembuat link WhatsApp / Instagram
├── routes/index.tsx       # Halaman utama (menyusun semua section)
└── styles.css             # Warna & font (design tokens)
```

## Perintah yang tersedia

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan situs di lokal (hot reload) |
| `npm run build` | Build untuk produksi |
| `npm run lint` | Cek kualitas kode |
| `npm run format` | Rapikan format kode |
| `npm run test` | Jalankan tes |

## Sinkronisasi dengan GitHub

Proyek ini tersambung dua arah dengan repository GitHub pemilik workspace: setiap perubahan dari Lovable otomatis masuk ke repo, dan perubahan yang di-push dari VS Code masuk kembali ke Lovable.

- Kerjakan perubahan lokal di branch sendiri, lalu merge ke branch utama agar tersinkron.
- Lihat panduan lengkap: https://docs.lovable.dev/integrations/github

## Dibangun dengan

- TanStack Start (React + TypeScript)
- Tailwind CSS v4
- shadcn/ui
- Lovable
