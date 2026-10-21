import { CONTACT } from "@/lib/data";

/**
 * Membuat link wa.me dengan pesan awal (opsional menyertakan nama produk).
 * Nomor kosong = belum dikonfigurasi, link mengembalikan null.
 */
export function waLink(productName?: string): string | null {
  const number = CONTACT.whatsappNumber.trim();
  if (!number) return null;
  const text = productName
    ? `${CONTACT.whatsappMessage}: ${productName}`
    : CONTACT.whatsappMessage;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function instagramLink(): string | null {
  const username = CONTACT.instagramUsername.trim();
  if (!username) return null;
  return `https://instagram.com/${username}`;
}
