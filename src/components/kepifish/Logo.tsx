import { cn } from "@/lib/utils";
import { LOGO_URL } from "@/lib/data";

/** Logo asli KEPIFISH — ditampilkan apa adanya (tanpa diubah warna/bentuk). */
export function Logo({ className }: { className?: string; light?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex size-14 items-center justify-center overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-border",
        className,
      )}
    >
      <img src={LOGO_URL} alt="Logo Kepifish" className="size-full object-contain" />
    </span>
  );
}

export function Tagline({ className }: { className?: string }) {
  return (
    <p className={cn("font-display text-sm font-semibold italic tracking-wide text-tangerine-deep", className)}>
      Sea-riously Good.
    </p>
  );
}
