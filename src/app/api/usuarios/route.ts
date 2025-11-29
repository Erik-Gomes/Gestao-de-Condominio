import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  // Busca todos os usuários ordenados por nome
  // ATENÇÃO: O nome da tabela deve ser "usuario" (singular), igual à sua imagem
  const { data, error } = await supabase
    .from("usuario") 
    .select("*")
    .order("nome", { ascending: true });

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, data },
    { status: 200 }
  );
}