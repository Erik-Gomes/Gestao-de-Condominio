"use client";

import { useEffect, useState } from "react";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  contato: string;
  status: string;
}

interface EditUsuarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  usuario: Usuario | null;
  onSave: (data: Usuario) => void;
}

export default function EditUsuarioModal({
  isOpen,
  onClose,
  usuario,
  onSave,
}: EditUsuarioModalProps) {
  const [form, setForm] = useState<Usuario | null>(usuario);

  useEffect(() => {
    if (usuario) {
      setForm(usuario);
    }
  }, [usuario]);

  if (!isOpen || !form) return null;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => (prev ? { ...prev, [name]: value } : prev));
  }

  function handleSubmit() {
    if (!form) return;
    onSave(form);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[420px] shadow-xl">
        <h2 className="text-xl font-semibold text-stone-700 mb-4">
          Editar Usuário
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-500">
              Nome
            </label>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Nome do usuário"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-500">
              E-mail
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="email@exemplo.com"
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-stone-500">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            className="px-4 py-2 text-white rounded-md
              bg-gradient-to-r from-stone-400 to-stone-600
              hover:opacity-70 transition"
            onClick={handleSubmit}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
