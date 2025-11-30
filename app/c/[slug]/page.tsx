import { supabase } from "@/app/utils/supabase";
import { redirect } from "next/navigation";

export default async function CardRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. On cherche la carte (on récupère aussi l'ID et le nombre de vues actuel)
  const { data: card } = await supabase
    .from("nfc_cards")
    .select("id, target_url, views")
    .eq("slug", slug)
    .single();

  // 2. Si la carte existe...
  if (card && card.target_url) {
    
    // ... On ajoute +1 au compteur (sans attendre la réponse pour aller vite)
    await supabase
      .from("nfc_cards")
      .update({ views: card.views + 1 })
      .eq("id", card.id);

    // ... Et on redirige
    redirect(card.target_url);
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl">Carte introuvable.</p>
    </div>
  );
}