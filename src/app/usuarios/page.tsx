"use client";

import { useEffect, useState } from 'react';
// Certifique-se de que sua interface IUsuario no service tenha os campos: id, nome, email, contato, status
import { IUsuario } from '@/services/usuario.service'; 
import { DropdownActions } from "@/components/dropdown";
import { ConfirmDialog } from "@/components/confirmDialog";
import { showToast } from '@/components/toastNotification';
import { Toaster } from 'sonner';

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
            method: 'DELETE',
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
    <div className="p-6 max-w-full">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">Usuários</h1>
      </div>

      <input 
        type="text" 
        placeholder='Pesquisar usuário...' 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        className="border border-gray-300 rounded-lg bg-zinc-200 mb-5 p-2 text-gray-900 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="rounded-md border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-zinc-300">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-12">#</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Nome</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">E-mail</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Contato</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Status</th>       
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-zinc-200">
             {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-3 text-center text-gray-500">
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
                <td className="px-4 py-3 text-sm text-gray-700" colSpan={6}>
                  Nenhum usuário encontrado.
                </td>
              </tr>
            ) : (
              usuariosFiltrados.map((usuario, index) => (
                // Usei usuario.id conforme sua imagem do banco de dados
                <tr key={usuario.id} className="hover:bg-gray-100">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{String(index + 1)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{usuario.nome}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{usuario.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{usuario.contato}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      usuario.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {usuario.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <DropdownActions
                      onDelete={() => {
                        setSelectedId(usuario.id);
                        setSelectedName(usuario.nome);
                        setDeleteDialogOpen(true);
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