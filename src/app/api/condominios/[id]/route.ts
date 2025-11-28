import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();

  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "ID inválido" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("condominio")
      .delete()
      .eq("id_condominio", id);

    if (error) {
      console.error("Erro no Supabase:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Condomínio excluído com sucesso!" },
      { status: 200 }
    );
  } catch (e: any) {
    console.error("Erro inesperado:", e);
    return NextResponse.json(
      { success: false, error: "Erro interno ao excluir." },
      { status: 500 }
    );
  }
}
