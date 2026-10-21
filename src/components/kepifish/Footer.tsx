import { Fish, Instagram, MessageCircle } from "lucide-react";
import { TAGLINE } from "@/lib/data";
import { instagramLink, waLink } from "@/lib/links";
import { Logo } from "@/components/kepifish/Logo";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Our Menu", href: "#menu" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const wa = waLink();
  const ig = instagramLink();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep py-14 text-cream">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="text-center sm:text-left">
            <Logo light />
            <p className="mt-2 font-display text-sm font-semibold italic tracking-wide text-shell">
              {TAGLINE}
            </p>
          </div>

          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-tangerine">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Kepifish"
                className="grid size-11 place-items-center rounded-full bg-cream/10 transition-colors hover:bg-tangerine hover:text-accent-foreground"
              >
                <MessageCircle className="size-5" />
              </a>
            ) : (
              <span
                aria-hidden
                className="grid size-11 place-items-center rounded-full bg-cream/10 opacity-50"
              >
                <MessageCircle className="size-5" />
              </span>
            )}
            {ig ? (
              <a
                href={ig}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Kepifish"
                className="grid size-11 place-items-center rounded-full bg-cream/10 transition-colors hover:bg-tangerine hover:text-accent-foreground"
              >
                <Instagram className="size-5" />
              </a>
            ) : (
              <span
                aria-hidden
                className="grid size-11 place-items-center rounded-full bg-cream/10 opacity-50"
              >
                <Instagram className="size-5" />
              </span>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-cream/15 pt-6 text-center text-sm text-cream/60 sm:flex-row sm:justify-between">
          <p>© {year} KEPIFISH. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            <Fish className="size-3.5" />
            {TAGLINE}
          </p>
        </div>
      </div>
    </footer>
  );
}
