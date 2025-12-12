'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

interface CreateUsuarioResult {
  success: boolean;
  message?: string;
}

export async function createUsuario(
  formData: FormData
): Promise<CreateUsuarioResult> {
  const supabase = await createClient();

  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const contato = String(formData.get("contato") ?? "").trim();
  const status = String(formData.get("status") ?? "Ativo").trim();

  const { error } = await supabase.from("usuario").insert({
    nome,
    email,
    contato,
    status,
  });

  if (error) {
    console.error("[createUsuario] Erro Supabase:", error);

    return {
      success: false,
      message: "Erro ao criar usuário",
    };
  }

  // Atualiza a listagem sem quebrar o fluxo do client
  revalidatePath("/usuarios");

  return {
    success: true,
  };
}
