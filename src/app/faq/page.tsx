"use client";

import { useState } from "react";

function FAQItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-stone-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-stone-50 hover:bg-stone-100 transition text-left"
      >
        <span className="font-semibold text-stone-800">{title}</span>
        <span className="text-xl text-stone-500">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="px-5 py-4 bg-white text-stone-600 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="flex flex-col gap-10 p-8 max-w-5xl">
      {/* Header com imagem */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-stone-800">
            Central de Ajuda — Viva Condo
          </h1>
          <p className="mt-3 text-stone-600">
            Aqui você encontra explicações claras sobre o funcionamento do
            sistema, suas funcionalidades e boas práticas para uso no dia a dia.
          </p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70"
          alt="Pessoa com dúvida"
          className="w-full md:w-72 rounded-xl shadow-md object-cover"
        />
      </div>

      {/* FAQ */}
      <div className="flex flex-col gap-4">
        <FAQItem title="O que é o Viva Condo?">
          <p>
            O <strong>Viva Condo</strong> é um sistema de gestão condominial
            desenvolvido para centralizar informações administrativas, organizar
            usuários e facilitar a rotina de administradores e síndicos.
          </p>
          <p className="mt-2">
            A proposta do sistema é reduzir controles manuais, planilhas
            dispersas e falhas de comunicação, oferecendo uma plataforma única,
            simples e segura.
          </p>
        </FAQItem>

        <FAQItem title="Quais funcionalidades o sistema oferece atualmente?">
          <ul className="list-disc list-inside space-y-2">
            <li>Cadastro e gerenciamento de condomínios</li>
            <li>Gestão completa de usuários</li>
            <li>Visualização de status (ativos/inativos)</li>
            <li>Pesquisa rápida de registros</li>
            <li>Interface moderna e intuitiva</li>
            <li>Controle de acesso via autenticação</li>
          </ul>
        </FAQItem>

        <FAQItem title="Como utilizar o sistema no dia a dia?">
          <ol className="list-decimal list-inside space-y-2">
            <li>Realize o login para acessar o painel principal</li>
            <li>Use o menu lateral para navegar entre as seções</li>
            <li>Gerencie usuários e condomínios conforme sua necessidade</li>
            <li>Utilize a busca para localizar informações rapidamente</li>
          </ol>
        </FAQItem>

        <FAQItem title="Quem pode acessar o Viva Condo?">
          <p>
            Apenas usuários previamente cadastrados e autenticados possuem
            acesso ao sistema. Isso garante segurança e controle sobre as
            informações do condomínio.
          </p>
        </FAQItem>


        <FAQItem title="O que fazer se eu tiver dúvidas ou problemas?">
          <p>
            Caso tenha qualquer dúvida ou dificuldade, você pode entrar em
            contato com nossa equipe de suporte. Futuramente, o sistema contará
            também com uma central de chamados integrada.
          </p>
        </FAQItem>
      </div>

      {/* Contato */}
      <div className="bg-stone-100 rounded-xl p-6 text-center">
        <h2 className="text-lg font-semibold text-stone-800">
          Ainda precisa de ajuda?
        </h2>
        <p className="mt-2 text-stone-600">
          Entre em contato com nossa equipe pelo e-mail:
        </p>
        <p className="mt-1 font-semibold text-stone-700">
          contato@vivacondo.com
        </p>
      </div>
    </div>
  );
}
