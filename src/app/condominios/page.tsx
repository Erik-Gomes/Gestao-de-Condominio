"use client";

import { useEffect, useState } from "react"; //useState é uma função do React que permite a um componente ter estado interno.
import { ICondominio } from "@/services/condominio.service";
import { DropdownActions } from "@/components/dropdown";
import EditCondominioModal from "@/components/editCondominioModal";
import { ConfirmDialog } from "@/components/confirmDialog";
import { showToast } from "@/components/toastNotification";
import { Toaster } from "sonner";
import { FaPlus, FaSearch } from "react-icons/fa";
import Link from "next/link";

export default function ListaCondominios() {
  const [condominios, setCondominios] = useState<ICondominio[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // Estado para capturar o termo digitado na busca
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // status para abrir dialog
  const [selectedId, setSelectedId] = useState<number | null>(null); // id do condominio
  const [selectedName, setSelectedName] = useState<string | null>(null); // select nome do condominio
  const [selectedCondominio, setSelectedCondominio] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function handleUpdate(condominio: any) {
    setSelectedCondominio(condominio);
    setModalOpen(true);
  }

  async function handleSave(updatedData: any) {
    console.log("Salvar alterações:", updatedData);

    try {
      const response = await fetch(
        `/api/condominios/${updatedData.id_condominio}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar condomínio");
      }

      const result = await response.json();

      fetchCondominios(); // Recarrega a lista após salvar
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao salvar condomínio:", error);
    }
  }

  async function fetchCondominios() {
    try {
      const response = await fetch("/api/condominios", { cache: "no-store" });
      const { data, success, error } = await response.json();

      if (!success) throw new Error(error ?? "Erro ao buscar condomínios");

      setCondominios(data);
    } catch (e: any) {
      setErro(e.message ?? "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCondominios();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!selectedId) return;

    try {
      const response = await fetch(`/api/condominios/${selectedId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        // Remove o item da lista visualmente sem precisar recarregar
        setCondominios((prev) =>
          prev.filter((c) => c.id_condominio !== selectedId)
        );

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

  const condominiosFiltrados = condominios.filter((condominio) => {
    const termoBusca = searchQuery.trim().toLowerCase();

    return (
      (condominio.nome_condominio || "'").toLowerCase().includes(termoBusca) ||
      (condominio.endereco_condominio || "")
        .toLowerCase()
        .includes(termoBusca) ||
      (condominio.cidade_condominio || "").toLowerCase().includes(termoBusca) ||
      (condominio.uf_condominio || "").toLowerCase().includes(termoBusca) ||
      (condominio.tipo_condominio || "").toLowerCase().includes(termoBusca)
    );
  });

  return (
    <div className="p-6 max-w-full bg-gradient-to-b from-stone-300 to-stone-400 min-h-screen">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-stone-700">Condomínios</h1>
      </div>

      {/* Barra de busca e Add condomínios*/}
      <div className="mb-4 flex justify-between gap-4 ">
        <div className="relative w-64 bg-stone-100 rounded-md">
          <span className="absolute inset-y-0 left-3 flex items-center">
            <FaSearch className="h-4 w-4 text-stone-400" />
          </span>
          <input
            type="text"
            placeholder="Pesquisar Condomínio"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-md font-medium text-stone-500 
            focus:outline-none focus:ring-1 focus:ring-primary text-sm"
          />
        </div>
        <div className="relative w-10">
          <Link href="/condominios/novo">
            <span className="absolute inset-y-0 left-3 flex items-center">
              <FaPlus className="h-5 w-5 text-stone-700" />
            </span>
          </Link>
        </div>
      </div>

      {/* Tabela de condomínios */}
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
                Endereço
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-stone-600 tracking-wider">
                Cidade
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-stone-600 tracking-wider">
                UF
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-stone-600 tracking-wider">
                Tipo
              </th>
              {/* tipo: Residencial e comercial*/}
              <th className="px-4 py-3 text-left text-xs font-medium text-stone-600 tracking-wider">
                Ação
              </th>
            </tr>
          </thead>
          <tbody className="divide-y bg-stone-100">
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-3 text-center text-stone-600"
                >
                  Carregando condomínios...
                </td>
              </tr>
            ) : erro ? (
              <tr>
                <td colSpan={7} className="px-4 py-3 text-center text-red-600">
                  {erro}
                </td>
              </tr>
            ) : condominiosFiltrados.length === 0 ? (
              <tr>
                <td className="px-4 py-3 text-sm text-stone-600" colSpan={7}>
                  Nenhum condomínio encontrado.
                </td>
              </tr>
            ) : (
              condominiosFiltrados.map((condominio, index) => (
                <tr
                  key={condominio.id_condominio}
                  className="hover:bg-stone-200 border-b border-stone-200"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-stone-600">
                    {String(index + 1)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-stone-600">
                    {condominio.nome_condominio}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-stone-600">
                    {condominio.endereco_condominio}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-stone-600">
                    {condominio.cidade_condominio}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-stone-600">
                    {condominio.uf_condominio}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-stone-600">
                    {condominio.tipo_condominio}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-stone-600 ">
                    <DropdownActions
                      onUpdate={() => handleUpdate(condominio)}
                      onDelete={() => {
                        setSelectedId(condominio.id_condominio);
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
      <EditCondominioModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        condominio={selectedCondominio}
        onSave={handleSave}
      />

      <Toaster richColors position="top-right" />
    </div>
  );
}
