"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomSelect from "@/components/customSelect";
import { createCondominio } from "../actions";

function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed top-6 right-6 z-50 rounded-lg px-5 py-4 shadow-lg text-white
        ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
    >
      <div className="flex items-center gap-4">
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="font-bold hover:opacity-70"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function NovoCondominio() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const result = await createCondominio(formData);

    setLoading(false);

    setToast({
      message: result.message,
      type: result.success ? "success" : "error",
    });

    // fecha automaticamente
    setTimeout(() => setToast(null), 3000);

    if (result.success) {
      setTimeout(() => {
        router.push("/condominios");
      }, 800);
    }
  }

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h1 className="text-2xl font-bold mb-6 text-stone-700">
          Novo Condomínio
        </h1>

        <form action={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-stone-500">
              Nome do Condomínio
            </label>
            <input
              name="nome_condominio"
              type="text"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Ex: Condomínio Vista Alegre"
            />
          </div>

          {/* Endereço */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Endereço
            </label>
            <input
              name="endereco_condominio"
              type="text"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Rua, Número, Bairro"
            />
          </div>

          {/* Cidade + UF */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Cidade
              </label>
              <input
                name="cidade_condominio"
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="Ex: Campinas"
              />
            </div>

            <div>
              <CustomSelect
                label="UF"
                name="uf_condominio"
                options={[
                  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
                  "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"
                ]}
                defaultValue="SP"
              />
            </div>
          </div>

          {/* Tipo */}
          <div>
            <CustomSelect
              label="Tipo de Condomínio"
              name="tipo_condominio"
              options={["Residencial", "Comercial", "Misto"]}
            />
          </div>

          {/* Ações */}
          <div className="flex justify-end space-x-3 pt-4">
            <a
              href="/condominios"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-center"
            >
              Cancelar
            </a>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-white rounded-md 
                bg-gradient-to-r from-stone-400 to-stone-600
                hover:opacity-60 transition-all disabled:opacity-40"
            >
              {loading ? "Salvando..." : "Salvar Condomínio"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
