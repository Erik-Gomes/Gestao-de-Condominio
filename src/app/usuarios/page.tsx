"use client";

import { useEffect, useState } from "react";
// Certifique-se de que sua interface IUsuario no service tenha os campos: id, nome, email, contato, status
import { IUsuario } from "@/services/usuario.service";
import { DropdownActions } from "@/components/dropdown";
import { ConfirmDialog } from "@/components/confirmDialog";
import { showToast } from "@/components/toastNotification";
import { Toaster } from "sonner";
import { FaSearch } from "react-icons/fa";

export default function ListaUsuario() {
  // Ajuste do estado para Usuarios
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedName, setSelectedName] = useState("");

  useEffect(() => {
    const buscarUsuarios = async () => {
      try {
        // --- ATENÇÃO: Certifique-se de criar esta rota em src/app/api/usuarios/route.ts ---
        const response = await fetch("/api/usuarios", { cache: "no-store" });
        const { data, success, error } = await response.json();

        if (!success) throw new Error(error ?? "Erro ao buscar usuários");

        setUsuarios(data);
      } catch (e: any) {
        setErro(e.message ?? "Erro inesperado");
      } finally {
        setLoading(false);
      }
    };
    buscarUsuarios();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!selectedId) return;

    try {
      // Rota de delete ajustada para usuários
      const response = await fetch(`/api/usuarios/${selectedId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        setUsuarios((prev) => prev.filter((u) => u.id !== selectedId));
        showToast("success", "Usuário excluído com sucesso!");
      } else {
        showToast("error", result.error || "Erro ao excluir usuário.");
      }
    } catch (error) {
      showToast("error", "Erro de conexão ao tentar excluir.");
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const termoBusca = query.trim().toLowerCase();

    // Filtra pelo que você vê na tabela
    return (
      usuario.nome.toLowerCase().includes(termoBusca) ||
      usuario.email.toLowerCase().includes(termoBusca)
    );
  });

  return (
    <div className="p-6 max-w-full bg-gradient-to-b from-stone-300 to-stone-400 min-h-screen">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-stone-700">Usuários</h1>
      </div>

      {/* Barra de busca e Add condomínios*/}
      <div className="mb-4 flex justify-between gap-4 ">
        <div className="relative w-64 bg-stone-100 rounded-md">
          <span className="absolute inset-y-0 left-3 flex items-center">
            <FaSearch className="h-4 w-4 text-stone-400" />
          </span>
          <input
            type="text"
            placeholder="Pesquisar Usuário"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-md font-medium text-stone-500 
            focus:outline-none focus:ring-1 focus:ring-primary text-sm"
          />
        </div>
      </div>

      {/* Tabela de Usuários */}
      <div className="rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-stone-100">
          <thead className="bg-stone-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-stone-600 tracking-wider w-12">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-stone-600 tracking-wider">
                Nome
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-stone-600 tracking-wider">
                E-mail
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-stone-600 tracking-wider">
                Contato
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-stone-600 tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-stone-600 tracking-wider">
                Ação
              </th>
            </tr>
          </thead>
          <tbody className="divide-y bg-stone-100">
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-3 text-center text-stone-600"
                >
                  Carregando usuários...
                </td>
              </tr>
            ) : erro ? (
              <tr>
                <td colSpan={6} className="px-4 py-3 text-center text-red-600">
                  {erro}
                </td>
              </tr>
            ) : usuarios.length === 0 ? (
              <tr>
                <td className="px-4 py-3 text-sm text-stone-600" colSpan={6}>
                  Nenhum usuário encontrado.
                </td>
              </tr>
            ) : (
              usuariosFiltrados.map((usuario, index) => (
                // Usei usuario.id conforme sua imagem do banco de dados
                <tr
                  key={usuario.id}
                  className="hover:bg-stone-200 border-b border-stone-200"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-stone-600">
                    {String(index + 1)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-stone-600">
                    {usuario.nome}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-stone-600">
                    {usuario.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-stone-600">
                    {usuario.contato}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-stone-600">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        usuario.status === "Ativo"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {usuario.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-stone-600">
                    <DropdownActions
                      onDelete={() => {
                        setSelectedId(usuario.id);
                        setSelectedName(usuario.nome);
                        setDeleteDialogOpen(true);
                      }}
                      onUpdate={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={deleteDialogOpen}
        setIsOpen={setDeleteDialogOpen}
        title={`Excluir ${selectedName}?`}
        description="Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita."
        onConfirm={handleDeleteConfirm}
      />
      <Toaster richColors position="top-right" />
    </div>
  );
}
