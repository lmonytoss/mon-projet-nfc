"use client";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [cards, setCards] = useState<any[]>([]);
  
  // Pour la modification du lien
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  // 1. VÉRIFIER SI LE CLIENT EST CONNECTÉ
  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      // Pas connecté ? On dégage vers le login
      router.push("/login");
    } else {
      setUser(user);
      fetchMyCards(user.id);
    }
  }

  // 2. RÉCUPÉRER MES CARTES (ET PAS THOSE DES AUTRES)
  async function fetchMyCards(userId: string) {
    const { data, error } = await supabase
      .from("nfc_cards")
      .select("*")
      .eq("user_id", userId); // LE FILTRE IMPORTANT

    if (data) setCards(data);
    setLoading(false);
  }

  // 3. METTRE À JOUR LE LIEN
  async function updateCard(cardId: string) {
    const { error } = await supabase
      .from("nfc_cards")
      .update({ target_url: newUrl })
      .eq("id", cardId);

    if (!error) {
      alert("✅ Lien mis à jour !");
      setEditingId(null); // On ferme l'éditeur
      if (user) fetchMyCards(user.id); // On rafraîchit la liste
    } else {
      alert("Erreur : " + error.message);
    }
  }

  if (loading) return <div className="p-10 text-white">Chargement...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* En-tête */}
        <div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-bold text-blue-500">Mon Espace</h1>
          <div className="text-right">
            <p className="text-sm text-gray-400">{user?.email}</p>
            <button 
              onClick={async () => { await supabase.auth.signOut(); router.push("/login"); }}
              className="text-xs text-red-400 hover:underline mt-1"
            >
              Se déconnecter
            </button>
          </div>
        </div>

        {/* Liste des cartes */}
        <h2 className="text-xl font-bold mb-4">Mes Cartes Actives</h2>
        
        {cards.length === 0 ? (
          <div className="bg-gray-900 p-8 rounded-xl text-center border border-gray-800">
            <p className="text-gray-400">Vous n'avez aucune carte associée pour le moment.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {cards.map((card) => (
              <div key={card.id} className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-blue-900 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{card.slug}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <span>👀 {card.views} vues</span>
                      <span>•</span>
                      <a href={`https://mon-projet-nfc.vercel.app/c/${card.slug}`} target="_blank" className="hover:text-blue-400">
                        Tester ma carte ↗
                      </a>
                    </div>
                  </div>
                  
                  {/* Bouton Modifier */}
                  {editingId !== card.id && (
                    <button 
                      onClick={() => { setEditingId(card.id); setNewUrl(card.target_url); }}
                      className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm"
                    >
                      Modifier le lien
                    </button>
                  )}
                </div>

                {/* Zone de modification */}
                {editingId === card.id ? (
                  <div className="mt-4 bg-black p-4 rounded border border-blue-900">
                    <label className="text-xs text-blue-400 mb-1 block">Nouveau lien de destination :</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        className="flex-1 bg-gray-900 border border-gray-700 rounded p-2 text-white outline-none focus:border-blue-500"
                      />
                      <button onClick={() => updateCard(card.id)} className="bg-blue-600 px-4 rounded font-bold hover:bg-blue-500">
                        Sauvegarder
                      </button>
                      <button onClick={() => setEditingId(null)} className="text-gray-500 px-2 hover:text-white">
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm truncate bg-black/30 p-2 rounded">
                    Redirige vers : <span className="text-blue-300">{card.target_url}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}