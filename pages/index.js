import { useState } from "react";

export default function Home() {
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Amichevole");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sto generando le didascalie... ⏳");

    try {
      const res = await fetch("/api/generate-caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `${description}, piattaforma: ${platform}, tono: ${tone}`,
        }),
      });
      const data = await res.json();
      if (data.caption) {
        setResult(data.caption);
      } else {
        setResult(data.error || "Errore sconosciuto.");
      }
    } catch (err) {
      setResult("Errore di rete, riprova più tardi.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white min-h-screen flex items-center justify-center p-6">
      <section className="bg-white max-w-3xl w-full rounded-2xl shadow-xl p-10">
        <header className="flex items-center space-x-3 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01-8 0" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8" />
          </svg>
          <h1 className="text-4xl font-extrabold text-gray-900">Caption Genius</h1>
        </header>

        <p className="mb-10 text-gray-700 text-lg max-w-xl mx-auto text-center">
          Inserisci una descrizione del tuo post, scegli la piattaforma e il tono.<br />
          Genera 3 caption pronte all’uso in un click!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="text-gray-800 font-semibold mb-1 block">Descrizione del contenuto</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Es. Una giornata perfetta al mare con amici..."
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label className="block">
              <span className="text-gray-800 font-semibold mb-1 block">Piattaforma</span>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                <option>Instagram</option>
                <option>TikTok</option>
                <option>LinkedIn</option>
                <option>Facebook</option>
                <option>Twitter</option>
              </select>
            </label>

            <label className="block">
              <span className="text-gray-800 font-semibold mb-1 block">Tono</span>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                <option>Amichevole</option>
                <option>Professionale</option>
                <option>Ironico</option>
                <option>Motivazionale</option>
              </select>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition flex items-center justify-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Genera Caption</span>
          </button>
        </form>

        <div className="mt-8 text-center text-gray-800 whitespace-pre-line text-lg min-h-[5rem]">
          {result}
        </div>
      </section>
    </div>
  );
}
