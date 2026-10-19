import database from "@/infra/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const updateAt = Date.now();
    await database.query('SELECT 1;');

    return NextResponse.json({
      status: 200,
      update_at: updateAt,
    });
  } catch {
    return NextResponse.json({
      status: 503,
    }
  );
    
  }
}
