"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

interface CreateCondominioResult {
  success: boolean;
  message: string;
}

export async function createCondominio(
  formData: FormData
): Promise<CreateCondominioResult> {
  const supabase = await createClient();

  const nome_condominio = String(formData.get("nome_condominio") ?? "").trim();
  const endereco_condominio = String(formData.get("endereco_condominio") ?? "").trim();
  const cidade_condominio = String(formData.get("cidade_condominio") ?? "").trim();
  const uf_condominio = String(formData.get("uf_condominio") ?? "").trim();
  const tipo_condominio = String(formData.get("tipo_condominio") ?? "").trim();

  if (
    !nome_condominio ||
    !endereco_condominio ||
    !cidade_condominio ||
    !uf_condominio ||
    !tipo_condominio
  ) {
    return {
      success: false,
      message: "Preencha todos os campos obrigatórios",
    };
  }

  const { error } = await supabase.from("condominio").insert({
    nome_condominio,
    endereco_condominio,
    cidade_condominio,
    uf_condominio,
    tipo_condominio,
  });

  if (error) {
    console.error("[createCondominio]", error);
    return {
      success: false,
      message: "Erro ao criar condomínio",
    };
  }

  revalidatePath("/condominios");

  return {
    success: true,
    message: "Condomínio criado com sucesso",
  };
}
