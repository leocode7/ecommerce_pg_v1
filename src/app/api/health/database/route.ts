import database from "@/infra/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const updateAt = new Date().toISOString();

    const totalDeClientesNoPool = database.getTotalCount();

    const databaseVersionResult = await database.query('SHOW server_version;');
    const databaseVersionValue = databaseVersionResult.rows[0].server_version;

    const databaseMaxConnectionsResult = database.query('SHOW max_connections;');
    const databaseMaxConnectionsValue = (await databaseMaxConnectionsResult).rows[0].max_connections;

    return NextResponse.json({
      status: 200,
      updated_at: updateAt,
      dependencies: {
        database: {
          version: databaseVersionValue,
          max_connections: Number(databaseMaxConnectionsValue),
        }
      },
      total_count: totalDeClientesNoPool,
      postgres_version: databaseVersionValue,
    });
  } catch {
    return NextResponse.json({
      status: 503,
    }
  );
    
  }
}
