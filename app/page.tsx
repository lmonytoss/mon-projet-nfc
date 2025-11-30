import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      
      {/* 1. LA BARRE DE NAVIGATION */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <div className="text-2xl font-bold text-blue-500">NFC PRO</div>
        <div className="space-x-4">
          <Link href="#pricing" className="hover:text-blue-400 transition">Tarifs</Link>
          <Link href="/admin" className="text-gray-500 text-sm hover:text-white">Admin</Link>
        </div>
      </nav>

      {/* 2. LA SECTION HERO (L'accroche) */}
      <header className="text-center py-20 px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Boostez vos avis Google
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          La carte connectée qui transforme vos clients en ambassadeurs. 
          Approchez, scannez, c'est noté. Sans application.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg transition shadow-lg shadow-blue-900/50">
            Commander ma carte
          </button>
        </div>
      </header>

      {/* 3. LES AVANTAGES (Pourquoi acheter ?) */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          
          {/* Avantage 1 */}
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-2">Instantané</h3>
            <p className="text-gray-400">Plus besoin de chercher votre page. Le client scanne et tombe direct sur le formulaire d'avis.</p>
          </div>

          {/* Avantage 2 */}
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-2">Sans Contact</h3>
            <p className="text-gray-400">Technologie NFC sécurisée. Fonctionne avec tous les iPhone et Android récents.</p>
          </div>

          {/* Avantage 3 */}
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-bold mb-2">+300% d'Avis</h3>
            <p className="text-gray-400">En simplifiant le processus, vous multipliez par 3 le nombre d'avis laissés par vos clients.</p>
          </div>

        </div>
      </section>

      {/* 4. LE PRIX (L'offre) */}
      <section id="pricing" className="py-20 px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Une offre simple.</h2>
        
        <div className="bg-gradient-to-b from-gray-800 to-black p-10 rounded-3xl border border-gray-700 max-w-md mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAIRE</div>
          
          <h3 className="text-2xl font-bold text-gray-300 mb-2">Carte Avis Google</h3>
          <div className="text-5xl font-bold text-white mb-6">49.90€ <span className="text-lg text-gray-500 font-normal">/vie</span></div>
          
          <ul className="text-left space-y-4 mb-8 text-gray-400">
            <li className="flex items-center">✅ Carte PVC Premium</li>
            <li className="flex items-center">✅ Impression personnalisée</li>
            <li className="flex items-center">✅ Programmation incluse</li>
            <li className="flex items-center">✅ Livraison offerte</li>
          </ul>

          <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition">
            Acheter maintenant
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-600 text-sm">
        <p>© 2025 NFC PRO. Tous droits réservés.</p>
      </footer>
    </div>
  );
}