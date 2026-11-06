
import { MessageCircle } from "lucide-react";
import { MENU, TAGLINE, type MenuItem } from "@/lib/data";
import { waLink } from "@/lib/links";


function OrderButton({ product }: { product: MenuItem }) {
  const whatsappUrl = waLink(product.name) ?? "#";
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2"
    >
      <MessageCircle size={18} />
      Pesan Sekarang
    </a>
  );
}

function MenuCard({ product }: { product: MenuItem }) {
  return (
    <article className="overflow-hidden rounded-xl">
      <img
        src={product.image}
        alt={product.name}
        className="w-full object-cover"
      />
      <div className="p-4">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <OrderButton product={product} />
      </div>
    </article>
  );
}

export function MenuCatalog() {
  return (
    <section id="menu" className="py-16">
      <div className="container mx-auto px-4">
        <p>{TAGLINE}</p>
        <h2>Menu Kepifish</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {MENU.map((product) => (
            <MenuCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
