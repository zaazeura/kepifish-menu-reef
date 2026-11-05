import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Fish, KeyRound, UserPlus, UtensilsCrossed } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/kepifish/Logo";
import { TAGLINE } from "@/lib/data";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Masuk Panel Admin — KEPIFISH" },
      {
        name: "description",
        content: "Masuk atau daftar akun panel admin Kepifish dengan username dan password.",
      },
    ],
  }),
  component: AuthPage,
});

/** Login memakai username; dikonversi ke alamat internal akun. */
function toAccountEmail(username: string): string {
  const norm = normalizeUsername(username);
  return `${norm}@app.local`;
}

function normalizeUsername(raw: string): string {
  return raw.trim().toLowerCase();
}

const USERNAME_PATTERN = /^[a-z0-9._-]{3,30}$/;

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Sudah masuk? langsung ke panel admin.
  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (active && session) navigate({ to: "/admin", replace: true });
    });
    return () => {
      active = false;
    };
  }, [navigate]);

  function friendlyError(message: string): string {
    if (message.includes("Invalid login credentials")) {
      return "Username atau password salah.";
    }
    if (message.includes("23505") || message.includes("duplicate key")) {
      return "Username sudah dipakai — pilih username lain.";
    }
    if (message.toLowerCase().includes("password")) {
      return "Password terlalu lemah (minimal 6 karakter).";
    }
    return message;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    const norm = normalizeUsername(username);
    if (!USERNAME_PATTERN.test(norm)) {
      setError(
        "Username 3–30 karakter, hanya huruf kecil, angka, titik, garis bawah, atau minus.",
      );
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    setBusy(true);
    try {
      if (mode === "login") {
        const { error: err } = await supabase.auth.signInWithPassword({
          email: toAccountEmail(norm),
          password,
        });
        if (err) {
          setError(friendlyError(err.message));
          return;
        }
        navigate({ to: "/admin", replace: true });
      } else {
        const { data, error: err } = await supabase.auth.signUp({
          email: toAccountEmail(norm),
          password,
          options: { data: { username: norm, display_name: displayName.trim() } },
        });
        if (err) {
          setError(friendlyError(err.message));
          return;
        }
        if (data.session) {
          navigate({ to: "/admin", replace: true });
        } else {
          setNotice("Akun dibuat. Silakan masuk dengan username dan password Anda.");
          setMode("login");
        }
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-deep px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="inline-flex items-center justify-center rounded-3xl bg-cream px-6 py-4 shadow-card">
            <Logo />
          </div>
          <p className="mt-3 font-display text-sm font-semibold italic tracking-wide text-shell">
            {TAGLINE}
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-cream p-6 shadow-card sm:p-8">
          <div className="grid grid-cols-2 gap-2 rounded-full bg-cream-deep p-1">
            {(
              [
                { key: "login", label: "Masuk" },
                { key: "register", label: "Daftar" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setMode(tab.key);
                  setError(null);
                  setNotice(null);
                }}
                className={
                  mode === tab.key
                    ? "rounded-full bg-navy px-4 py-2 text-sm font-bold text-cream shadow-card"
                    : "rounded-full px-4 py-2 text-sm font-bold text-navy transition-colors hover:text-tangerine-deep"
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === "register" ? (
              <div>
                <label htmlFor="display-name" className="mb-1 block text-sm font-semibold text-navy">
                  Nama tampil
                </label>
                <input
                  id="display-name"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="cth. Zalny / Bu Dosen"
                  className="w-full rounded-full border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            ) : null}

            <div>
              <label htmlFor="username" className="mb-1 block text-sm font-semibold text-navy">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="cth. zalny"
                className="w-full rounded-full border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-semibold text-navy">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="minimal 6 karakter"
                className="w-full rounded-full border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {error ? (
              <p role="alert" className="rounded-2xl bg-destructive/10 px-4 py-2.5 text-sm font-semibold text-destructive">
                {error}
              </p>
            ) : null}
            {notice ? (
              <p className="rounded-2xl bg-secondary px-4 py-2.5 text-sm font-semibold text-navy">
                {notice}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-tangerine px-6 py-3 font-bold text-accent-foreground shadow-card transition-all hover:-translate-y-0.5 hover:bg-tangerine-deep disabled:cursor-not-allowed disabled:opacity-60"
            >
              {mode === "login" ? (
                <>
                  <KeyRound className="size-4" />
                  {busy ? "Memproses…" : "Masuk"}
                </>
              ) : (
                <>
                  <UserPlus className="size-4" />
                  {busy ? "Memproses…" : "Daftar Akun"}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 space-y-2 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
            <p className="inline-flex items-start gap-1.5">
              <UtensilsCrossed className="mt-0.5 size-3.5 shrink-0 text-tangerine-deep" />
              Akun <strong className="text-navy">pertama</strong> yang mendaftar menjadi admin
              (pemilik) dan bisa mengelola semua data.
            </p>
            <p className="inline-flex items-start gap-1.5">
              <Fish className="mt-0.5 size-3.5 shrink-0 text-tangerine-deep" />
              Akun berikutnya (mis. dosen) otomatis menjadi <strong className="text-navy">dosen</strong>
              {" "}— bisa melihat semua laporan, tanpa mengubah data.
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-sm font-semibold text-cream/70">
          <a href="/" className="transition-colors hover:text-tangerine">
            ← Kembali ke website Kepifish
          </a>
        </p>
      </div>
    </div>
  );
}
