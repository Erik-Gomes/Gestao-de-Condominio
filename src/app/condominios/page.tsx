"use client";

import { useEffect, useState } from 'react'  //useState é uma função do React que permite a um componente ter estado interno. 
import { ICondominio } from '@/services/condominio.service';
import { DropdownActions } from "@/components/dropdown";
import { ConfirmDialog } from "@/components/confirmDialog";
import { showToast } from '@/components/toastNotification';

export default function ListaCondominios() {
  const [condominios, setCondominios]= useState<ICondominio[]>([])
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null); 
  const [selectedName, setSelectedName] = useState("");

  useEffect(() => {
    const buscarCondominios = async () => {
      try {
        const response = await fetch("/api/condominios", { cache: "no-store" });
        const {data, success, count, error} = await response.json();

        if (!success) throw new Error(error ?? "Erro ao buscar condomínios"); 
        setCondominios(data);

      } catch (e: any) {
        setErro(e.message ?? "Erro inesperado");
      } finally {
        setLoading(false);
      }      
    };
    buscarCondominios()
  }, [])

  const handleDeleteConfirm = async () => {
    if (!selectedId) return;

    try {
      
        const response = await fetch(`/api/condominios/${selectedId}`, {
            method: 'DELETE',
        });
        
        const result = await response.json();

        if (result.success) {
            // Remove o item da lista visualmente sem precisar recarregar
            setCondominios((prev) => prev.filter((c) => c.id_condominio !== selectedId));
            showToast("success", "Condomínio excluído com sucesso!");
        } else {
            showToast("error", result.error || "Erro ao excluir condomínio.");
        }
    } catch (error) {
        showToast("error", "Erro de conexão ao tentar excluir.");
    } finally {
        setDeleteDialogOpen(false); // Fecha o modal
    }
  };

  const condominiosFiltrados = condominios.filter((condominio) =>{
    const termoBusca = query.trim().toLowerCase();

    return (
      condominio.nome_condominio.toLowerCase().includes(termoBusca) ||
      condominio.endereco_condominio.toLowerCase().includes(termoBusca) ||
      condominio.cidade_condominio.toLowerCase().includes(termoBusca) ||
      condominio.uf_condominio.toLowerCase().includes(termoBusca)||
      condominio.tipo_condominio.toLowerCase().includes(termoBusca)
    );
  });

  return (
    <div className="p-6 max-w-full">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">Condomínios</h1>
      </div>

      <input type="text" placeholder='Pesquisar' value={query} onChange={(e) => setQuery(e.target.value)} className="border border-gray-300 rounded-lg bg-zinc-200 mb-5 p-2 text-gray-900 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

      <div className=" rounded-md border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-zinc-300">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-12">#</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Nome</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Endereço</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Cidade</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">UF</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Tipo</th>       
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-zinc-200">
             {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-3 text-center text-gray-500">
                  Carregando condomínios...
                </td>
              </tr>
            ) : erro ? (
              <tr>
                <td colSpan={7} className="px-4 py-3 text-center text-red-600">
                  {erro}
                </td>
              </tr>
            ) :condominios.length === 0 ? (
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700" colSpan={7}>
                  Nenhum condomínio encontrado.
                </td>
              </tr>
            ) : (
              condominiosFiltrados.map((condominio, index) => (
                <tr key={condominio.id_condominio} className="hover:bg-gray-100">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{String(index + 1)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{condominio.nome_condominio}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{condominio.endereco_condominio}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{condominio.cidade_condominio}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{condominio.uf_condominio}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{condominio.tipo_condominio}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <DropdownActions
                      onDelete={() => {
                        setSelectedId(condominio.id_condominio);
                        console.log("ID que estou enviando para excluir:", condominio.id_condominio);
                        setSelectedName(condominio.nome_condominio);
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
        description="Tem certeza que deseja excluir este condomínio? Esta ação não pode ser desfeita."
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}