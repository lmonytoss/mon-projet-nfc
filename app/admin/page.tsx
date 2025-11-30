"use client";
import { useState } from "react";
import { supabase } from "../utils/supabase";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  
  // LE MOT DE PASSE
  const SECRET_PASSWORD = "admin-nfc-pro"; 

  // --- Partie Formulaire ---
  const [slug, setSlug] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  async function createCard() {
    setMessage("Création en cours...");
    const { error } = await supabase
      .from("nfc_cards")
      .insert([{ slug: slug, target_url: url }]);

    if (error) {
      setMessage("Erreur : " + error.message);
    } else {
      setMessage("✅ Carte créée avec succès !");
      setSlug("");
      setUrl("");
    }
  }

  // --- Fonction vérification ---
  function checkPassword() {
    if (passwordInput === SECRET_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Mauvais mot de passe !");
    }
  }

  // ECRAN DE VERROUILLAGE
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
        <h1 className="text-3xl font-bold mb-6 text-red-500">Zone Sécurisée 🔒</h1>
        <div className="bg-gray-800 p-8 rounded-lg flex flex-col gap-4">
          <input
            type="password"
            placeholder="Mot de passe Admin"
            className="p-3 rounded bg-gray-700 border border-gray-600 text-white outline-none"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <button 
            onClick={checkPassword}
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded"
          >
            Déverrouiller
          </button>
        </div>
      </div>
    );
  }

  // ECRAN ADMIN (Une fois connecté)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg border border-blue-900">
        <h1 className="text-2xl font-bold mb-6 text-blue-400">Admin Panel</h1>
        
        <div className="mb-4">
          <label className="block text-sm mb-2">Code (Slug)</label>
          <input
            type="text"
            placeholder="ex: garage-durand"
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 outline-none"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">Lien cible</label>
          <input
            type="text"
            placeholder="https://..."
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 outline-none"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <button onClick={createCard} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded">
          Générer la carte
        </button>

        {message && <p className="mt-4 text-center text-yellow-400">{message}</p>}
      </div>
    </div>
  );
}