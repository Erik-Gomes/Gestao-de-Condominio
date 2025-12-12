"use client";

import { useEffect, useState } from "react";
import CustomSelect from "./customSelect";

export default function EditCondominioModal({
  isOpen,
  onClose,
  condominio,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  condominio: any;
  onSave: (data: any) => void;
}) {
  const [form, setForm] = useState(condominio ?? {});

  useEffect(() => {
    if (condominio) {
      setForm(condominio);
    }
  }, [condominio]);

  if (!isOpen || !condominio) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    onSave(form);
    onClose();
  }

  // --- NOVA FUNÇÃO ---
  // Verifica se o clique foi exatamente no fundo escuro
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // 1. Adicionamos o onClick aqui no Overlay
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleOverlayClick} 
    >
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-xl">
        <h2 className="text-xl font-semibold text-stone-700 mb-4">
          Editar Condomínio
        </h2>

        {/* ... Restante do seu código (inputs, selects, etc) ... */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-stone-500 ">
              Nome do Condomínio
            </label>
            <input
              name="nome_condominio"
              value={form.nome_condominio ?? ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 "
              placeholder="Nome do condomínio"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-500">
              Endereço
            </label>
            <input
              name="endereco_condominio"
              value={form.endereco_condominio ?? ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Rua, Número, Bairro"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-stone-500">
                Cidade
              </label>
              <input
                name="cidade_condominio"
                value={form.cidade_condominio ?? ""}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="Ex: Campinas"
              />
            </div>

            <div>
              <CustomSelect
                label="UF"
                name="uf_condominio"
                options={["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]}
                value={form.uf_condominio ?? ""}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setForm({ ...form, [e.target.name]: e.target.value })
                }
              >
              </CustomSelect>
            </div>
          </div>

          <div>
            <CustomSelect
              label="Tipo"
              name="tipo_condominio"
              options={["Residencial", "Comercial", "Misto"]}
              value={form.tipo_condominio ?? ""}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
            >
            </CustomSelect>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 hover:cursor-pointer"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            className="px-4 py-2 text-white rounded-md bg-gradient-to-r from-stone-400 to-stone-600 hover:opacity-60 transition-all hover:cursor-pointer"
            onClick={handleSubmit}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}