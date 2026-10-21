import { MessageCircle } from "lucide-react";
import { MENU, TAGLINE, type MenuItem } from "@/lib/data";
import { waLink } from "@/lib/links";

function OrderButton({ product }: { product: MenuItem }) {
  const link = waLink(product.name);
  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-tangerine px-6 py-3 font-bold text-accent-foreground shadow-card transition-all hover:-translate-y-0.5 hover:bg-tangerine-deep"
      >
        <MessageCircle className="size-4" />
        Pesan Sekarang
      </a>
    );
  }
  return (
    <button
      type="button"
      title="Nomor WhatsApp belum dikonfigurasi — isi di src/lib/data.ts"
      onClick={() => {
        alert(
          "Nomor WhatsApp pemilik belum dikonfigurasi. Mohon maaf atas ketidaknyamanannya.",
        );
      }}
      className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-tangerine px-6 py-3 font-bold text-accent-foreground shadow-card"
    >
      <MessageCircle className="size-4" />
      Pesan Sekarang
    </button>
  );
}

function MenuCard({ product }: { product: MenuItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-card ring-1 ring-border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
        <h3 className="font-display text-2xl font-bold text-navy">
          {product.name}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {product.description}
        </p>
        <p className="font-display text-lg font-semibold text-tangerine-deep">
          {product.price}
        </p>
        <OrderButton product={product} />
      </div>
    </article>
  );
}

export function MenuCatalog() {
  return (
    <section id="menu" className="relative bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-display text-sm font-semibold italic tracking-wide text-tangerine-deep">
            {TAGLINE}
          </p>
          <h2 className="mt-2 font-display text-3xl font-black text-navy sm:text-4xl">
            Our Menu
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Two signature dishes, one memorable experience.
          </p>
        </div>

        {/* Tepat dua kartu produk */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {MENU.map((product) => (
            <MenuCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
