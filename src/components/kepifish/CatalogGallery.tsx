import { CATALOG_IMAGES } from "@/lib/data";

/** Galeri poster katalog — isi diatur dari CATALOG_IMAGES di src/lib/data.ts. */
export function CatalogGallery() {
  if (CATALOG_IMAGES.length === 0) return null;
  return (
    <section id="katalog" className="bg-cream-deep py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-black text-navy sm:text-4xl">Katalog</h2>
          <p className="mt-3 text-base text-muted-foreground">
            Poster menu terbaru Kepifish.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CATALOG_IMAGES.map((item) => (
            <a
              key={item.id}
              href={item.image}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-3xl bg-card shadow-card ring-1 ring-border transition-all hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full object-contain"
              />
              <p className="p-4 text-center font-display font-bold text-navy">{item.title}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
