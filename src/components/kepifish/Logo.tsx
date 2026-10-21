import { Fish } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Logo KEPIFISH.
 * Aset logo asli belum tersedia — ini placeholder wordmark sementara.
 * Ganti dengan <img src={logoAsset.url} /> dari pointer .asset.json
 * begitu logo asli diunggah. Jangan menggambar ulang logo asli.
 */
export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display font-black tracking-tight",
        light ? "text-cream" : "text-navy",
        className,
      )}
    >
      <span className="grid size-9 place-items-center rounded-full bg-tangerine text-accent-foreground shadow-soft">
        <Fish className="size-5" strokeWidth={2.2} />
      </span>
      <span className="text-xl leading-none">
        KEPI<span className="text-tangerine">FISH</span>
      </span>
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
