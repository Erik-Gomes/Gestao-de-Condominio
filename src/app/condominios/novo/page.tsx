import { createCondominio } from "../actions";

export default function NovoCondominio() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-stone-700">
        Novo Condomínio
      </h1>

      <form action={createCondominio} className="space-y-4">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-stone-500">
            Nome do Condomínio
          </label>
          <input
            name="nome_condominio"
            type="text"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
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
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Rua, Número, Bairro"
          />
        </div>

        {/* Grid para Cidade e UF */}
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
            <label className="block text-sm font-medium text-gray-700">
              UF
            </label>
            <select
              name="uf_condominio"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
              defaultValue=""
            >
              <option value="" disabled>
                Selecione
              </option>
              <option value="SP">SP</option>
              <option value="RJ">RJ</option>
              <option value="MG">MG</option>
              {/* Adicione outros estados conforme necessário */}
            </select>
          </div>
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo
          </label>
          <select
            name="tipo_condominio"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
            defaultValue="Residencial"
          >
            <option value="Residencial">Residencial</option>
            <option value="Comercial">Comercial</option>
            <option value="Misto">Misto</option>
          </select>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end space-x-3 pt-4">
          {/* O type="button" no Cancelar evita que ele envie o form */}
          <a
            href="/condominios"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-center"
          >
            Cancelar
          </a>

          <button
            type="submit"
            className="px-4 py-2 text-white rounded-md 
            bg-gradient-to-r from-stone-400 to-stone-600
            hover:opacity-60 transition-all hover:cursor-pointer"
          >
            Salvar Condomínio
          </button>
        </div>
      </form>
    </div>
  );
}
