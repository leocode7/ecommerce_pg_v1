import database from "@/infra/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const updateAt = new Date().toISOString();
    await database.query('SELECT 1;');

    return NextResponse.json({
      status: 201,
      updated_at: updateAt,
    });
  } catch {
    return NextResponse.json({
      status: 503,
    }
  );
    
  }
}
