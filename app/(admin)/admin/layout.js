import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import LogoutButton from "@/components/editor/LogoutButton";

export const metadata = { title: "Dashboard", robots: { index: false } };

export default async function AdminLayout({ children }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const supabase = createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const name = profile?.full_name || user.email;

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-brand-100 bg-white">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/admin" className="font-serif text-lg font-semibold text-ink">
            Nourish<span className="text-brand-600">Desk</span>{" "}
            <span className="text-ink/40">Studio</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/blog" className="text-ink/60 hover:text-brand-700">
              View blog
            </Link>
            <span className="hidden text-ink/50 sm:inline">{name}</span>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="container-page py-10">{children}</main>
    </div>
  );
}
