import { useState } from "react";
import { motion } from "framer-motion";

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
    } catch {
      setResult("Errore di rete, riprova più tardi.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 0px 8px rgb(99 102 241)" },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
        body, #__next {
          margin: 0; padding: 0; height: 100%;
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6b8dd6 100%);
          animation: bgMove 15s ease infinite;
        }
        @keyframes bgMove {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }
      `}</style>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen flex items-center justify-center p-8"
      >
        <section className="bg-white/90 max-w-3xl w-full rounded-3xl shadow-xl p-12 space-y-8 backdrop-blur-md">
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center space-x-5"
          >
            <div className="p-4 rounded-full bg-indigo-600 text-white">
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
          </motion.header>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center max-w-xl mx-auto text-gray-800 text-lg leading-relaxed"
          >
            Inserisci una descrizione del tuo post, scegli la piattaforma e il tono.<br />
            Genera <span className="font-semibold text-indigo-600">3 caption pronte all’uso</span> in un click!
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="space-y-8"
          >
            <label className="block">
              <span className="text-gray-900 font-semibold mb-3 block text-lg">
                Descrizione del contenuto
              </span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="5"
                placeholder="Es. Una giornata perfetta al mare con amici..."
                className="w-full rounded-xl border border-indigo-400 px-5 py-4 text-gray-900 placeholder-indigo-400 shadow-md transition focus:ring-4 focus:ring-indigo-400 focus:outline-none resize-none hover:border-indigo-600"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <label className="block">
                <span className="text-gray-900 font-semibold mb-3 block text-lg">Piattaforma</span>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full rounded-xl border border-indigo-400 px-4 py-3 shadow-md text-gray-900 transition focus:ring-4 focus:ring-indigo-400 focus:outline-none hover:border-indigo-600"
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
                  className="w-full rounded-xl border border-indigo-400 px-4 py-3 shadow-md text-gray-900 transition focus:ring-4 focus:ring-indigo-400 focus:outline-none hover:border-indigo-600"
                >
                  <option>Amichevole</option>
                  <option>Professionale</option>
                  <option>Ironico</option>
                  <option>Motivazionale</option>
                </select>
              </label>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`w-full flex justify-center items-center gap-3 py-4 rounded-xl bg-indigo-700 text-white font-semibold text-lg shadow-lg transition 
                hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed`}
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
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-10 min-h-[6rem] rounded-lg p-6 bg-indigo-100 text-indigo-900 text-center whitespace-pre-wrap text-lg font-medium shadow-inner transition-opacity duration-300"
            aria-live="polite"
          >
            {result || "Qui appariranno le tue caption generate."}
          </motion.div>
        </section>
      </motion.div>
    </>
  );
}
