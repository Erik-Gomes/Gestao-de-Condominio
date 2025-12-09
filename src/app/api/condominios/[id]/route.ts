import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return NextResponse.json(
      { success: false, error: "ID inválido" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("condominio")
    .select("*")
    .eq("id_condominio", numericId)
    .single();

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data }, { status: 200 });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();

  try {
    const body = await request.json();
    const { id } = await params;
    const numericId = Number(id);

    if (isNaN(numericId)) {
      return NextResponse.json(
        { success: false, error: "ID inválido" },
        { status: 400 }
      );
    }

    // Atualiza os dados
    const { data, error } = await supabase
      .from("condominio")
      .update(body)
      .eq("id_condominio", numericId)
      .select()
      .single();

    if (error) {
      console.error("Erro ao atualizar:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Condomínio atualizado!", data },
      { status: 200 }
    );
  } catch (e: any) {
    console.error("Erro inesperado:", e);
    return NextResponse.json(
      { success: false, error: "Erro interno ao atualizar." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();

  try {
    const {id} = await params;
    const numericId = Number(id);

    if (isNaN(numericId)) {
      return NextResponse.json(
        { success: false, error: "ID inválido" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("condominio")
      .delete()
      .eq("id_condominio", numericId);

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
