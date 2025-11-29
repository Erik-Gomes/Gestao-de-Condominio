import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const supabase = await createClient();

  const { error } = await supabase
    .from("usuario") // Tabela no singular
    .delete()
    .eq("id", params.id); // Sua coluna de ID chama "id" na tabela de usuários

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, message: "Usuário excluído com sucesso!" },
    { status: 200 }
  );
}