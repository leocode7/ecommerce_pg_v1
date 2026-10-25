import database from "@/infra/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await database.query("SELECt;");

    const updateAt = new Date().toISOString();

    const totalDeClientesNoPool = database.getTotalCount();

    const databaseVersionResult = await database.query('SHOW server_version;');
    const databaseVersionValue = databaseVersionResult.rows[0].server_version;

    const databaseMaxConnectionsResult = await database.query('SHOW max_connections;');
    const databaseMaxConnectionsValue = databaseMaxConnectionsResult.rows[0].max_connections;

    const databaseOpenedConnectionsResult = await database.query("SELECT count(*)::int FROM pg_stat_activity WHERE datname = 'local_db';");
    const databaseOpenedConnectionsValue = databaseOpenedConnectionsResult.rows[0].count;

    return NextResponse.json({
      status: 200,
      updated_at: updateAt,
      dependencies: {
        database: {
          version: databaseVersionValue,
          max_connections: Number(databaseMaxConnectionsValue),
          opened_connections: databaseOpenedConnectionsValue,
        }
      },
      total_count: totalDeClientesNoPool,
    });
  } catch {
    return NextResponse.json({
      status: 503,
    }
  );
    
  }
}
