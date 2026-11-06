import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Panel Admin — KEPIFISH" },
      { name: "description", content: "Panel admin KEPIFISH." },
      { property: "og:title", content: "Panel Admin — KEPIFISH" },
      { property: "og:description", content: "Panel admin KEPIFISH." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }
  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="font-display text-3xl text-primary">Panel Admin</h1>
        <p className="text-muted-foreground">Sea-riously Good.</p>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link to="/">Kembali ke situs</Link>
          </Button>
          <Button onClick={signOut}>Keluar</Button>
        </div>
      </div>
    </main>
  );
}
