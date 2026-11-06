
import { cn } from "@/lib/utils";
import logo from "@/assets/kepifish-logo-transparent.png";

export function Logo({
  className,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex size-14 items-center justify-center overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-border",
        className,
      )}
    >
      <img
        src={logo}
        alt="Kepifish Logo"
        className="size-full object-contain"
      />
    </span>
  );
}

export function Tagline({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "font-display text-sm font-semibold italic tracking-wide text-tangerine-deep",
        className,
      )}
    >
      Sea-riously Good.
    </p>
  );
}
