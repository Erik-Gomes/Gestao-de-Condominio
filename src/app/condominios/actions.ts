'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCondominio(formData: FormData) {
  const supabase = await createClient();

  const data = {
    nome_condominio: formData.get("nome_condominio") as string,
    endereco_condominio: formData.get("endereco_condominio") as string,
    cidade_condominio: formData.get("cidade_condominio") as string,
    uf_condominio: formData.get("uf_condominio") as string,
    tipo_condominio: formData.get("tipo_condominio") as string,
  };

  const { error } = await supabase.from("condominio").insert(data);

  if (error) {
    console.error("Erro ao criar:", error);
    // Em um cenário real, você retornaria o erro para exibir na tela
    throw new Error("Falha ao criar condomínio");
  }

  // Atualiza a lista de condomínios e redireciona
  revalidatePath("/condominios");
  redirect("/condominios");
}