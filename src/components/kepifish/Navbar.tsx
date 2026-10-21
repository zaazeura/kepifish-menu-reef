import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/kepifish/Logo";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Our Menu", href: "#menu" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-cream/90 shadow-soft backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#home" aria-label="KEPIFISH — kembali ke atas">
          <Logo light={!scrolled} />
        </a>

        {/* Desktop: navigasi horizontal */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-tangerine",
                  scrolled ? "text-navy hover:text-tangerine-deep" : "text-cream/90",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="#menu"
            className="inline-flex items-center rounded-full bg-tangerine px-5 py-2.5 text-sm font-bold text-accent-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:bg-tangerine-deep"
          >
            Lihat Menu
          </a>
        </div>

        {/* Mobile: hamburger */}
        <button
          type="button"
          aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "grid size-11 place-items-center rounded-full transition-colors",
            scrolled || open ? "text-navy hover:bg-cream-deep" : "text-cream hover:bg-cream/10",
          )}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden bg-cream/95 backdrop-blur-md transition-[max-height] duration-300 md:hidden",
          open ? "max-h-96 border-b border-border shadow-soft" : "max-h-0",
        )}
      >
        <ul className="space-y-1 px-4 py-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 font-semibold text-navy transition-colors hover:bg-cream-deep"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#menu"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-tangerine px-4 py-3 text-center font-bold text-accent-foreground"
            >
              Lihat Menu
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
