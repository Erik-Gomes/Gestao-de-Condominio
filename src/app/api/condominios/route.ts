import { NextResponse } from "next/server";
import { getCondominios } from "@/services/condominio.service";

export async function GET() {
    try {
        const data = await getCondominios();

        return NextResponse.json({
            success: true,
            count: data.length,
            data,
        }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({
            success: false,
            error: e.message ?? "Erro inesperado",
        }, {status: 400});
    }
}
