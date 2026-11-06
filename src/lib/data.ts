
import menuKepiting from "@/assets/menu-kepiting.jpg";
import menuNasiCokot from "@/assets/menu-nasi-cokot.jpg";
import logo from "@/assets/kepifish-logo-transparent.png";

export const TAGLINE = "Sea-riously Good.";

export const ABOUT_TEXT =
  "Kepifish hadir untuk menyajikan hidangan yang nikmat dengan karakter rasa yang khas. Kami percaya bahwa makanan lezat dapat menjadi bagian dari momen sederhana yang berkesan.";

export const CATALOG_URL_PLACEHOLDER =
  "https://kepifish-menu-reef-ro1d.vercel.app";

export const CONTACT = {
  whatsappNumber: "628219710724",
  whatsappMessage: "Halo Kepifish, saya ingin memesan menu",
  instagramUsername: "kepifish_",
  address: "Balikpapan, Kalimantan Timur",
  hours: "Senin - Minggu, 10:00 - 21:00",
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  image: string;
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

export const LOGO_URL = logo;

export type CatalogImage = {
  id: string;
  title: string;
  image: string;
};



export const CATALOG_IMAGES: CatalogImage[] = [
  {
    id: "daftar-menu",
    title: "Daftar Menu Kepifish",
    image: "/katalog/katalog-daftar-menu.jpg",
  },
  {
    id: "kepiting",
    title: "Kepiting Kuah Santan",
    image: "/katalog/katalog-kepiting.png",
  },
  {
    id: "nasi-cokot",
    title: "Nasi Cokot",
    image: "/katalog/katalog-nasi-cokot.png",
  },
];
