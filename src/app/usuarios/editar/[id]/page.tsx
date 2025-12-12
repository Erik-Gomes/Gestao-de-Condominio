"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function EditarUsuarioPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const supabase = createClient();
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    contato: "",
    status: "Ativo",
  });

  // Buscar usuário
  useEffect(() => {
    async function fetchUsuario() {
      const { data, error } = await supabase
        .from("usuario")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error("Usuário não encontrado:", error);
        router.push("/usuarios");
        return;
      }

      setForm({
        nome: data.nome,
        email: data.email,
        contato: data.contato ?? "",
        status: data.status,
      });

      setLoading(false);
    }

    fetchUsuario();
  }, [id, router, supabase]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from("usuario")
      .update(form)
      .eq("id", id);

    if (error) {
      console.error("Erro ao atualizar:", error);
      setSaving(false);
      return;
    }

    router.push("/usuarios");
    router.refresh();
  }

  if (loading) {
    return <p className="p-6 text-stone-600">Carregando usuário...</p>;
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-stone-700">
        Editar Usuário
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="contato"
          value={form.contato}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded bg-white"
        >
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>

        <button
          disabled={saving}
          className="w-full py-2 bg-stone-700 text-white rounded"
        >
          {saving ? "Salvando..." : "Salvar alterações"}
        </button>
      </form>
    </div>
  );
}
