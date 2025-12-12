'use client'

import { createUsuario } from "../actions";
import {IMaskInput} from 'react-imask';

export default function NovoUsuario() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-stone-700">
        Novo Usuário
      </h1>

      <form action={createUsuario} className="space-y-4">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-stone-500">
            Nome
          </label>
          <input
            name="nome"
            type="text"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nome completo"
          />
        </div>

        {/* E-mail */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            E-mail
          </label>
          <input
            name="email"
            type="text"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="insira o e-mail"
          />
        </div>

        {/* Senha */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <input
            name="senha"
            type="password"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="insira a senha"
          />
        </div>

        {/* Contato */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contato
          </label>
          <IMaskInput
            name="contato"
            type="tel"
            mask="(00) 00000-0000"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="(99) 99999-9999"
          />
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo
          </label>
          <select
            name="status"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
            defaultValue="Ativo"
          >
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
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
            Salvar usuário
          </button>
        </div>
      </form>
    </div>
  );
}
