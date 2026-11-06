
import aboutImage from "@/assets/about.jpg";
import { ABOUT_TEXT, TAGLINE } from "@/lib/data";
import { Reviews } from "./Review";

const galleryPhotos = [
  "/gallery/images/foto-1.jpg",
  "/gallery/images/foto-2.jpg",
  "/gallery/images/foto-3.jpg",
  "/gallery/images/foto-4.jpg",
];

const galleryVideos = [
  "/gallery/videos/video-1.mp4",
  "/gallery/videos/video-2.mp4",
];

export function About() {
  return (
    <section id="about" className="bg-cream-deep">

      {/* About Kepifish */}
      <div className="relative py-20 sm:py-24">
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
                {TAGLINE}
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
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <p className="font-display text-sm font-semibold italic tracking-wide text-tangerine-deep">
            Our Moments
          </p>

          <h2 className="mt-2 font-display text-3xl font-black text-navy sm:text-4xl">
            Gallery Kepifish
          </h2>

          <p className="mt-4 text-muted-foreground">
            Momen dan sajian spesial dari Kepifish.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {galleryPhotos.map((photo, index) => (
            <a
              key={photo}
              href={photo}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-2xl shadow-card"
            >
              <img
                src={photo}
                alt={`Gallery Kepifish ${index + 1}`}
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Video Gallery */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-10 text-center">
          <p className="font-display text-sm font-semibold italic tracking-wide text-tangerine-deep">
            Behind the Scenes
          </p>

          <h2 className="mt-2 font-display text-3xl font-black text-navy sm:text-4xl">
            Kepifish in Motion
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {galleryVideos.map((video) => (
            <video
              key={video}
              src={video}
              controls
              preload="metadata"
              className="w-full rounded-2xl shadow-card"
            />
          ))}
        </div>
      </div>

      {/* Customer Reviews */}
      <Reviews />

    </section>
  );
}
