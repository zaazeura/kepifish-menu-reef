import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download, QrCode as QrCodeIcon, TriangleAlert } from "lucide-react";
import { CATALOG_URL_PLACEHOLDER } from "@/lib/data";

/**
 * QR Code katalog digital.
 * URL default dari src/lib/data.ts; pemilik bisa menimpanya langsung di
 * halaman ini setelah website dipublikasikan, lalu mengunduh PNG.
 */
export function QrSection() {
  const [url, setUrl] = useState(CATALOG_URL_PLACEHOLDER);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isPlaceholder = useMemo(
    () => /ganti-dengan-url|localhost|127\.0\.0\.1/i.test(url.trim()),
    [url],
  );

  useEffect(() => {
    let cancelled = false;
    const value = url.trim();
    if (!value) {
      setDataUrl(null);
      setError("Masukkan URL katalog terlebih dahulu.");
      return;
    }
    QRCode.toDataURL(value, {
      width: 1024,
      margin: 4, // ruang kosong memadai agar mudah dipindai
      errorCorrectionLevel: "H", // kontras & ketahanan tinggi untuk cetak
      color: { dark: "#0d1b33", light: "#ffffff" },
    })
      .then((qr) => {
        if (!cancelled) {
          setDataUrl(qr);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) setError("URL tidak valid untuk dibuat QR Code.");
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  const downloadPng = useCallback(() => {
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "kepifish-katalog-qr.png";
    link.click();
  }, [dataUrl]);

  return (
    <section id="qr" className="relative bg-navy py-20 text-cream sm:py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="inline-flex items-center gap-2 font-display text-sm font-semibold italic tracking-wide text-shell">
            <QrCodeIcon className="size-4" /> Katalog Digital
          </p>
          <h2 className="mt-2 font-display text-3xl font-black sm:text-4xl">
            Pindai, Buka, Pesan.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-cream/80">
            Satu QR Code mengarah langsung ke katalog online Kepifish — tanpa
            aplikasi, tanpa akun. Cetak untuk poster, meja, stiker, dan kemasan.
          </p>

          <label className="mt-8 block">
            <span className="text-sm font-semibold text-cream/80">
              URL katalog publik website
            </span>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://kepifish.example.com"
              className="mt-2 w-full rounded-xl border border-cream/25 bg-navy-deep/60 px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-tangerine focus:outline-none focus:ring-2 focus:ring-tangerine/50"
            />
          </label>

          {isPlaceholder && (
            <p className="mt-3 flex items-start gap-2 rounded-xl bg-tangerine/15 px-4 py-3 text-sm text-shell">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              Website belum dipublikasikan. Setelah URL produksi tersedia,
              masukkan URL asli di kolom atas, lalu unduh QR Code final. QR ini
              belum mengarah ke katalog publik.
            </p>
          )}
          {error && (
            <p className="mt-3 flex items-start gap-2 rounded-xl bg-destructive/15 px-4 py-3 text-sm text-cream">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={downloadPng}
            disabled={!dataUrl}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-tangerine px-7 py-3.5 font-bold text-accent-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:bg-tangerine-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download className="size-5" />
            Unduh QR Code (PNG)
          </button>
        </div>

        <div className="flex justify-center">
          <div className="rounded-3xl bg-card p-5 shadow-soft sm:p-7">
            {dataUrl ? (
              <img
                src={dataUrl}
                alt="QR Code katalog digital Kepifish"
                className="size-56 rounded-xl sm:size-72"
              />
            ) : (
              <div className="grid size-56 place-items-center rounded-xl bg-cream-deep text-muted-foreground sm:size-72">
                <QrCodeIcon className="size-12" />
              </div>
            )}
            <p className="mt-4 text-center font-display text-lg font-bold text-navy">
              KEPIFISH
            </p>
            <p className="text-center text-xs font-semibold italic tracking-wide text-tangerine-deep">
              Sea-riously Good.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
