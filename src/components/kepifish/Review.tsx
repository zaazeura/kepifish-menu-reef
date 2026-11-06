
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Nadia",
    rating: 5,
    comment:
      "Makanannya enak banget! Rasanya unik dan bikin ingin pesan lagi.",
  },
  {
    name: "Alya",
    rating: 5,
    comment:
      "Packaging-nya rapi dan menarik. Pengalaman pesan yang menyenangkan!",
  },
  {
    name: "Raisa",
    rating: 5,
    comment:
      "Suka banget sama menu Kepifish. Rasanya cocok dan porsinya memuaskan.",
  },
  {
    name: "Dinda",
    rating: 5,
    comment:
      "Pelayanannya ramah dan makanannya lezat. Definitely worth trying!",
  },
];

export function Reviews() {
  return (
    <section className="bg-cream-deep py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        <div className="mb-12 text-center">
          <p className="font-display text-sm font-semibold italic tracking-wide text-tangerine-deep">
            Customer Stories
          </p>

          <h2 className="mt-2 font-display text-3xl font-black text-navy sm:text-4xl">
            What They Say About Us
          </h2>

          <p className="mt-4 text-muted-foreground">
            Cerita dan pengalaman pelanggan Kepifish.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, index) => (
            <article
              key={index}
              className="rounded-2xl border border-border bg-cream p-6 shadow-card transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={17}
                    fill="currentColor"
                    className="text-tangerine-deep"
                  />
                ))}
              </div>

              <p className="min-h-24 text-sm leading-relaxed text-muted-foreground">
                "{review.comment}"
              </p>

              <div className="mt-6 border-t border-border pt-4">
                <p className="font-display font-bold text-navy">
                  {review.name}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Contoh ulasan pelanggan
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
