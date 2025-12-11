"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditarCondominioPage({ params }: any) {
  const router = useRouter();
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nome: "",
    endereco: "",
    numero: "",
  });

  // Busca os dados do condomínio
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/condominios/${id}`);
      const json = await res.json();

      if (json.success) {
        setForm(json.data);
      }

      setLoading(false);
    }

    fetchData();
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    await fetch(`/api/condominios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/condominios"); // Redireciona para a lista
  }

  if (loading) {
    return <p className="p-6 text-gray-600">Carregando...</p>;
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Editar Condomínio</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome"
          className="w-full border px-3 py-2 rounded"
        />

        <input
          required
          name="endereco"
          value={form.endereco}
          onChange={handleChange}
          placeholder="Endereço"
          className="w-full border px-3 py-2 rounded"
        />

        <input
          required
          name="numero"
          value={form.numero}
          onChange={handleChange}
          placeholder="Número"
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="w-full py-2 bg-red text-white rounded hover:bg-blue-700"
        >
          Salvar alterações
        </button>
      </form>
    </div>
  );
}
