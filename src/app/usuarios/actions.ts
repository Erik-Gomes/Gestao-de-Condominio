'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUsuario(formData: FormData) {
  const supabase = await createClient();

  const data = {
    nome: formData.get("nome") as string,
    email: formData.get("email") as string,
    contato: formData.get("contato") as string,
    status: formData.get("status") as string,
  };

  const { error } = await supabase.from("usuario").insert(data);

  if (error) {
    console.error("Erro ao criar:", error);
    // Em um cenário real, você retornaria o erro para exibir na tela
    throw new Error("Falha ao criar usuário");
  }

  // Atualiza a lista de usuários e redireciona
  revalidatePath("/usuarios");
  redirect("/usuarios");
}