"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Login() {
  const supabase = createClient();
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        router.replace("/condominios");
      } else {
        setCheckingSession(false);
      }
    };
    checkSession();
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede o reload da página
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setLoading(false);
        if (error.code === "invalid_credentials") {
          setError("E-mail ou senha inválidos");
          return;
        }
        throw new Error(error.message);
      }
      router.replace("/condominios");
      router.refresh();
    } catch (err: any) {
      setError(err.message ?? "Erro inesperado");
      setLoading(false);
    }
  };

  //  Sem essa verificação, ao acessar a raiz LOGADO, ele por um segundo ainda aparece a tela de login antes de redirecionar para dashboard.
  if (checkingSession) {
    return null;
  }

  return (
    <div
      className="flex h-screen flex-col md:flex-row"
      style={{
        backgroundImage: "url('/backgroundCondo2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full flex items-center justify-center p-6 ">
        <div className="w-full max-w-md p-8 border-1 border-stone-400 shadow-lg rounded-lg bg-stone-300/50 backdrop-blur-md ">
          <h2 className="text-2xl font-bold mb-4 text-stone-900">Bem-vindo!</h2>
          <p className="text-stone-900 mb-6 font-bold ">
            Por favor, insira suas credenciais de acesso.
          </p>
          <form onSubmit={login}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-stone-900 w-full p-3 mb-4 shadow-lg border rounded-md focus:ring-2 focus:ring-gray-500"
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" shadow-lg text-stone-900 w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-gray-500"
              required
            />
            {!loading && error && (
              <p className="text-red-500 text-sm mb-2">{error}</p>
            )}
            <button
              type="submit"
              className=" w-full flex justify-center shadow-lg bg-gradient-to-r  from-stone-400 to-stone-700 text-white p-3 rounded-md hover:opacity-60 transition-all disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <div
                  className="w-5 h-5 rounded-full animate-spin bg-gradient-to-r from-stone-400  to-stone-800 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <div className="w-3 h-3 bg-stone-500 rounded-full" />
                </div>
              ) : (
                "Entrar"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
