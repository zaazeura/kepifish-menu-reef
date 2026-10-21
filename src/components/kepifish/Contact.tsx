import { Clock, Instagram, MapPin, MessageCircle } from "lucide-react";
import { CONTACT, TAGLINE } from "@/lib/data";
import { instagramLink, waLink } from "@/lib/links";
import { Logo } from "@/components/kepifish/Logo";

function ContactButton() {
  const link = waLink();
  const className =
    "inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 font-bold text-whatsapp-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:brightness-95";
  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={className}>
        <MessageCircle className="size-5" />
        Pesan via WhatsApp
      </a>
    );
  }
  return (
    <button
      type="button"
      title="Nomor WhatsApp belum dikonfigurasi — isi di src/lib/data.ts"
      onClick={() => {
        alert("Nomor WhatsApp pemilik belum dikonfigurasi. Mohon maaf atas ketidaknyamanannya.");
      }}
      className={`${className} cursor-not-allowed`}
    >
      <MessageCircle className="size-5" />
      Pesan via WhatsApp
    </button>
  );
}

export function Contact() {
  const ig = instagramLink();

  return (
    <section id="contact" className="relative bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rounded-3xl bg-card p-8 text-center shadow-card ring-1 ring-border sm:p-12">
          <h2 className="font-display text-3xl font-black text-navy sm:text-4xl">
            Contact
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Pesan langsung, atau kunjungi kami. Kami siap menyambut datangmu.
          </p>

          <div className="mt-8">
            <ContactButton />
          </div>

          <div className="mt-6">
            {ig ? (
              <a
                href={ig}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-navy transition-colors hover:text-tangerine-deep"
              >
                <Instagram className="size-5 text-tangerine" />
                @{CONTACT.instagramUsername}
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 text-muted-foreground/80">
                <Instagram className="size-5" />
                Instagram: <em>belum dikonfigurasi</em>
              </span>
            )}
          </div>

          <div className="mt-8 grid gap-4 border-t border-border pt-8 text-left sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-tangerine" />
              <div>
                <p className="font-bold text-navy">Alamat</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {CONTACT.address || <em>Placeholder — alamat usaha belum ditentukan.</em>}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-tangerine" />
              <div>
                <p className="font-bold text-navy">Jam Operasional</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {CONTACT.hours || <em>Placeholder — jam operasional belum ditentukan.</em>}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Logo />
          </div>
        </div>
      </div>
    </section>
  );
}
