import aboutImage from "@/assets/about.jpg";
import { ABOUT_TEXT, TAGLINE } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="relative bg-cream-deep py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 lg:order-1">
          <img
            src={aboutImage}
            alt="Suasana dapur Kepifish"
            loading="lazy"
            width={1024}
            height={1024}
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-card ring-1 ring-border"
          />
          <div className="absolute -bottom-5 -right-3 rotate-[-4deg] rounded-2xl bg-navy px-6 py-4 shadow-soft sm:right-8">
            <p className="font-display text-xl font-bold italic text-cream">
              Sea-riously Good.
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="font-display text-sm font-semibold italic tracking-wide text-tangerine-deep">
            {TAGLINE}
          </p>
          <h2 className="mt-2 font-display text-3xl font-black text-navy sm:text-4xl">
            Cerita di Balik Kepifish
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {ABOUT_TEXT}
          </p>
          <p className="mt-4 text-sm text-muted-foreground/80">
            <em>Teks cerita ini sementara dan mudah diganti dengan cerita asli Kepifish.</em>
          </p>
        </div>
      </div>
    </section>
  );
}
