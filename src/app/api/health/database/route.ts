import database from "@/infra/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const updateAt = new Date().toISOString();
    const totalDeClientesNoPool = database.getTotalCount();
    const postgresVersionRaw = await database.query('SELECT version();');
    const postgresVersionString = postgresVersionRaw.rows[0].version;
    await database.query('SELECT 1;');

    return NextResponse.json({
      status: 201,
      updated_at: updateAt,
      total_count: totalDeClientesNoPool,
      postgres_version: postgresVersionString,
    });
  } catch {
    return NextResponse.json({
      status: 503,
    }
  );
    
  }
}
