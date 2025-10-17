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
  }, [supabase, router]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setError("E-mail ou senha inválidos");
          return;
        }
        if (error.message.includes("Email not confirmed")) {
          setError("Confirme seu e-mail antes de entrar.");
          return;
        }

        setError("Erro ao entrar: " + error.message);
        return;
      }

      router.replace("/condominios");
    } catch (err) {
      setError("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">Verificando sessão...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="w-full flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Olá 👋</h2>
          <p className="text-gray-500 mb-6">
            Insira as informações que você usou ao se registrar.
          </p>
          <form onSubmit={login}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
            {error && (
              <p className="text-red-500 mb-4">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
