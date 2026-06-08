"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={logout}
      className="flex items-center gap-1.5 text-ink/60 hover:text-brand-700"
    >
      <LogOut size={15} /> Logout
    </button>
  );
}
