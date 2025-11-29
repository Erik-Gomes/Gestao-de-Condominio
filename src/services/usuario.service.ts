import { createClient } from "@/utils/supabase/server";

export interface IUsuario {
    id: number;
    id_condominio: string;
    nome: string;
    email: string;
    contato: string;
    status: string;
}

export async function getUsuarios() {

    const supabase = await createClient();
    const { data, error } = await supabase.from("usuario").select("*").order("id");

    if (error) throw new Error(error.message);
    return data ?? {};
}