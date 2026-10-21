import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/kepifish/Navbar";
import { Hero } from "@/components/kepifish/Hero";
import { MenuCatalog } from "@/components/kepifish/MenuCatalog";
import { About } from "@/components/kepifish/About";
import { Contact } from "@/components/kepifish/Contact";
import { QrSection } from "@/components/kepifish/QrSection";
import { Footer } from "@/components/kepifish/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KEPIFISH — Sea-riously Good. | Katalog Digital" },
      {
        name: "description",
        content:
          "Katalog digital KEPIFISH: Kepiting Kuah Santan dan Nasi Cokot. Sea-riously Good. Pesan mudah lewat WhatsApp.",
      },
      { property: "og:title", content: "KEPIFISH — Sea-riously Good." },
      {
        property: "og:description",
        content:
          "Katalog digital KEPIFISH: Kepiting Kuah Santan dan Nasi Cokot. Pesan mudah lewat WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <MenuCatalog />
        <About />
        <Contact />
        <QrSection />
      </main>
      <Footer />
    </div>
  );
}
