"use client";

import { useEffect, useState } from "react";
import CustomSelect from "./customSelect";

type AnyObj = Record<string, any>;

export default function EditCondominioModal({
  isOpen,
  onClose,
  condominio,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  condominio: AnyObj | null;
  onSave: (data: AnyObj) => Promise<boolean>; // 🔑 contrato claro
}) {
  const [form, setForm] = useState<AnyObj>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (condominio) setForm(condominio);
  }, [condominio]);

  if (!isOpen || !condominio) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSelectChange(e: any) {
    // compatível com CustomSelect que retorna event
    if (e?.target?.name) {
      setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  }

  async function handleSubmit() {
    try {
      setSaving(true);

      const success = await onSave(form);

      if (success) {
        // 🔒 só fecha se salvar com sucesso
        onClose();
      }
      // ❗ toast NÃO fica aqui
    } catch (error) {
      console.error("[EditCondominioModal] Erro:", error);
    } finally {
      setSaving(false);
    }
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-xl">
        <h2 className="text-xl font-semibold text-stone-700 mb-4">
          Editar Condomínio
        </h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-stone-500">
              Nome do Condomínio
            </label>
            <input
              name="nome_condominio"
              value={form.nome_condominio ?? ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
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
              className="mt-1 block w-full border rounded-md p-2"
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
                className="mt-1 block w-full border rounded-md p-2"
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
                value={form.uf_condominio ?? ""}
                onChange={handleSelectChange}
              />
            </div>
          </div>

          <CustomSelect
            label="Tipo"
            name="tipo_condominio"
            options={["Residencial", "Comercial", "Misto"]}
            value={form.tipo_condominio ?? ""}
            onChange={handleSelectChange}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={handleSubmit}
            className="px-4 py-2 text-white rounded-md 
              bg-gradient-to-r from-stone-400 to-stone-600
              hover:opacity-60 disabled:opacity-40"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
