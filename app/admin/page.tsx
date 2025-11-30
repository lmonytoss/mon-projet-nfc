"use client";
import { useState } from "react";
import { supabase } from "../utils/supabase";

export default function AdminPage() {
  const [slug, setSlug] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  async function createCard() {
    setMessage("Création en cours...");

    // 1. On envoie les infos à Supabase
    const { error } = await supabase
      .from("nfc_cards")
      .insert([{ slug: slug, target_url: url }]);

    // 2. On gère le résultat
    if (error) {
      setMessage("Erreur : " + error.message);
    } else {
      setMessage("✅ Carte créée avec succès !");
      setSlug(""); // On vide le champ
      setUrl("");  // On vide le champ
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-blue-400">Créer une nouvelle carte</h1>

        {/* Champ 1 : Le code unique */}
        <div className="mb-4">
          <label className="block text-sm mb-2">Code de la carte (Slug)</label>
          <input
            type="text"
            placeholder="ex: pizzeria-mario"
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 outline-none"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        {/* Champ 2 : Le lien de destination */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Lien de destination</label>
          <input
            type="text"
            placeholder="https://instagram.com/..."
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 outline-none"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        {/* Bouton Créer */}
        <button
          onClick={createCard}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition"
        >
          Générer la carte
        </button>

        {/* Message de confirmation */}
        {message && <p className="mt-4 text-center text-yellow-400 font-bold">{message}</p>}
      </div>
    </div>
  );
}