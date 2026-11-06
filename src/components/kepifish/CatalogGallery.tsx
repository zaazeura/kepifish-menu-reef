
import { CATALOG_IMAGES } from "@/lib/data";

export function CatalogGallery() {
  if (CATALOG_IMAGES.length === 0) return null;

  return (
    <section id="katalog" className="py-16">
      <div className="container mx-auto px-4">
        <h2>Katalog Kepifish</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {CATALOG_IMAGES.map((item) => (
            <a
              key={item.id}
              href={item.image}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full rounded-xl object-cover"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
