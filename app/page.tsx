import { supabase } from "./utils/supabase";

export default async function Home() {
  // On récupère tout, y compris la colonne "views"
  const { data: cards, error } = await supabase.from("nfc_cards").select("*").order('created_at', { ascending: false });

  if (error) console.log("Erreur:", error);

  return (
    <div className="flex min-h-screen flex-col items-center p-10 bg-black text-white">
      <h1 className="text-4xl font-bold text-blue-500 mb-10">NFC PRO - Dashboard</h1>

      <div className="w-full max-w-md">
        <h2 className="text-xl mb-4 border-b pb-2">Mes cartes actives :</h2>

        {cards && cards.length > 0 ? (
          cards.map((card) => (
            <div key={card.id} className="bg-gray-800 p-4 rounded mb-4 border border-gray-700 relative">
              
              {/* Le compteur de vues en haut à droite */}
              <div className="absolute top-4 right-4 bg-gray-900 px-3 py-1 rounded border border-gray-600">
                <span className="text-2xl">👀</span>
                <span className="ml-2 font-bold text-white">{card.views}</span>
              </div>

              <span className="text-green-400 font-bold text-xl">{card.slug}</span>
              
              <p className="text-gray-400 text-sm mt-2">Cible :</p>
              <a href={card.target_url} className="text-blue-300 underline text-sm truncate block w-2/3">
                {card.target_url}
              </a>

              <div className="mt-3 pt-3 border-t border-gray-700">
                 <code className="text-yellow-500 text-sm">http://localhost:3000/c/{card.slug}</code>
              </div>
            </div>
          ))
        ) : (
          <p className="text-red-500">Aucune carte.</p>
        )}
      </div>
    </div>
  );
}