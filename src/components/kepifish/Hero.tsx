import heroImage from "@/assets/hero.jpg";
import { TAGLINE } from "@/lib/data";
import { Tagline } from "@/components/kepifish/Logo";

export function Hero() {
  return (
    <section id="home" className="relative min-h-svh overflow-hidden bg-navy">
      {/* Foto makanan sebagai fokus visual */}
      <img
        src={heroImage}
        alt="Sajian seafood Kepifish"
        className="absolute inset-0 size-full object-cover object-center opacity-90"
        width={1024}
        height={1024}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/70 to-navy-deep/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-navy-deep/40" />

      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-4 py-28 sm:px-6">
        <div className="max-w-xl animate-fade-up">
          <Tagline className="mb-3 text-base tracking-[0.2em] text-shell" />
          <h1 className="font-display text-4xl font-black leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
            Nikmati Kelezatan dalam Setiap Gigitan.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-cream/80 sm:text-lg">
            Temukan sajian khas Kepifish dengan cita rasa yang siap menemani
            momen kulinermu.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="inline-flex items-center rounded-full bg-tangerine px-7 py-3.5 text-base font-bold text-accent-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:bg-tangerine-deep"
            >
              Jelajahi Menu
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-cream/40 px-7 py-3.5 text-base font-bold text-cream transition-colors hover:border-cream hover:bg-cream/10"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>

      {/* Penanda scroll */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-float">
        <div className="h-10 w-6 rounded-full border-2 border-cream/50 p-1">
          <div className="size-2 rounded-full bg-cream/70" />
        </div>
      </div>
    </section>
  );
}
