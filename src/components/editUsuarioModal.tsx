"use client";

import { useEffect, useState } from "react";
import CustomSelect from "./customSelect"; // Certifique-se que o caminho está correto

export default function EditUsuarioModal({
  isOpen,
  onClose,
  usuario,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  usuario: any;
  onSave: (data: any) => void;
}) {
  const [form, setForm] = useState(usuario ?? {});

  useEffect(() => {
    if (usuario) {
      setForm(usuario);
    }
  }, [usuario]);

  if (!isOpen || !usuario) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    onSave(form);
    onClose();
  }

  // Fecha o modal se clicar no fundo escuro
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-xl">
        <h2 className="text-xl font-semibold text-stone-700 mb-4">
          Editar Usuário
        </h2>

        <div className="space-y-3">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-stone-500">
              Nome
            </label>
            <input
              name="nome"
              value={form.nome ?? ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Nome do usuário"
            />
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-sm font-medium text-stone-500">
              E-mail
            </label>
            <input
              name="email"
              type="email"
              value={form.email ?? ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="email@exemplo.com"
            />
          </div>

          {/* Contato */}
          <div>
            <label className="block text-sm font-medium text-stone-500">
              Contato
            </label>
            <input
              name="contato"
              value={form.contato ?? ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="(11) 99999-9999"
            />
          </div>

          {/* Status com CustomSelect */}
          <div>
            <CustomSelect
              label="Status"
              name="status"
              options={["Ativo", "Inativo"]}
              value={form.status ?? ""}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
            />
          </div>
        </div>

        {/* Botões */}
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