import { useState } from "react";

export default function Home() {
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Amichevole");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-50 to-pink-50 flex items-center justify-center p-8">
      <section className="bg-white max-w-3xl w-full rounded-3xl shadow-2xl p-12 space-y-8">
        <header className="flex items-center space-x-4">
          <div className="p-3 rounded-full bg-indigo-100 text-indigo-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01-8 0" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8" />
            </svg>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 select-none">
            Caption Genius
          </h1>
        </header>

        <p className="text-center max-w-xl mx-auto text-gray-700 text-lg leading-relaxed">
          Inserisci una descrizione del tuo post, scegli la piattaforma e il tono.<br />
          Genera <span className="font-semibold text-indigo-600">3 caption pronte all’uso</span> in un click!
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <label className="block">
            <span className="text-gray-900 font-semibold mb-3 block text-lg">Descrizione del contenuto</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="5"
              placeholder="Es. Una giornata perfetta al mare con amici..."
              className="w-full rounded-xl border border-gray-300 px-5 py-4 text-gray-900 placeholder-gray-400 shadow-sm transition focus:ring-4 focus:ring-indigo-400 focus:outline-none resize-none hover:border-indigo-400"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <label className="block">
              <span className="text-gray-900 font-semibold mb-3 block text-lg">Piattaforma</span>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm text-gray-900 transition focus:ring-4 focus:ring-indigo-400 focus:outline-none hover:border-indigo-400"
              >
                <option>Instagram</option>
                <option>TikTok</option>
                <option>LinkedIn</option>
                <option>Facebook</option>
                <option>Twitter</option>
              </select>
            </label>

            <label className="block">
              <span className="text-gray-900 font-semibold mb-3 block text-lg">Tono</span>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm text-gray-900 transition focus:ring-4 focus:ring-indigo-400 focus:outline-none hover:border-indigo-400"
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
            disabled={loading}
            className={`w-full flex justify-center items-center gap-3 py-4 rounded-xl bg-indigo-600 text-white font-semibold text-lg shadow-lg transition 
              hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {loading ? (
              <svg
                className="h-6 w-6 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            )}
            <span>{loading ? "Generando..." : "Genera Caption"}</span>
          </button>
        </form>

        <div
          className="mt-10 min-h-[6rem] rounded-lg p-6 bg-indigo-50 text-indigo-900 text-center whitespace-pre-wrap text-lg font-medium shadow-inner transition-opacity duration-300"
          aria-live="polite"
        >
          {result || "Qui appariranno le tue caption generate."}
        </div>
      </section>
    </div>
  );
}
