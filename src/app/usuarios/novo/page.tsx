"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUsuario } from "@/app/usuarios/novo/actions";
import Link from "next/link";
import { FaArrowLeft, FaSave, FaCheckCircle } from "react-icons/fa";
import CustomSelect from "@/components/customSelect";

export default function NovoUsuarioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [telefone, setTelefone] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 11) value = value.slice(0, 11);

    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");

    setTelefone(value);
  };

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);

    const result = await createUsuario(formData);

    if (!result.success) {
      setLoading(false);
      alert(result.message ?? "Erro inesperado");
      return;
    }

    setSuccess(true);

    setTimeout(() => {
      router.push("/usuarios");
      router.refresh();
    }, 1500);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-stone-300 to-stone-400 relative">
      {success && (
        <div className="fixed top-5 right-5 z-50 animate-bounce bg-green-600 text-white px-6 py-4 rounded-md shadow-lg flex items-center gap-3">
          <FaCheckCircle className="text-xl" />
          <div>
            <h4 className="font-bold">Sucesso!</h4>
            <p className="text-sm">Usuário salvo corretamente.</p>
          </div>
        </div>
      )}

      <div className="max-w-xl mx-auto mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-stone-700">Novo Usuário</h1>

        <Link
          href="/usuarios"
          className="flex items-center gap-2 text-stone-700 bg-stone-200 px-3 py-2 rounded-md hover:bg-stone-300 transition-all shadow-sm"
        >
          <FaArrowLeft className="text-sm" />
          <span className="text-sm">Voltar</span>
        </Link>
      </div>

      <div className="max-w-xl mx-auto bg-white shadow-md rounded-md p-6">
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-stone-700 text-sm font-medium">
              Nome
            </label>
            <input
              type="text"
              name="nome"
              required
              disabled={loading || success}
              className="w-full border border-stone-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-stone-700 text-sm font-medium">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              required
              disabled={loading || success}
              className="w-full border border-stone-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-stone-700 text-sm font-medium">
              Contato
            </label>
            <input
              type="text"
              name="contato"
              value={telefone}
              onChange={handlePhoneChange}
              disabled={loading || success}
              placeholder="(11) 99999-9999"
              maxLength={15}
              className="w-full border border-stone-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <CustomSelect
              label="Status"
              name="status"
              disabled={loading || success}
              className="w-full border border-stone-300 rounded-md px-3 py-2"
              options={["Ativo", "Inativo"]}
            >
            </CustomSelect>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <Link
              href="/usuarios"
              className={`px-4 py-2 rounded-md bg-stone-200 text-stone-700 ${
                loading || success
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-stone-300"
              }`}
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={loading || success}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${
                success
                  ? "bg-green-600"
                  : "bg-stone-800 hover:bg-stone-900"
              }`}
            >
              {success ? (
                <>
                  <FaCheckCircle />
                  <span>Salvo!</span>
                </>
              ) : loading ? (
                "Salvando..."
              ) : (
                <>
                  <FaSave />
                  <span>Salvar Usuário</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
