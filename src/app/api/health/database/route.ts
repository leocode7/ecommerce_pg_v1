import database from "@/infra/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await database.query({ text: "SELECT 1;" });

    const updateAt = new Date().toISOString();

    const databaseVersionResult = await database.query({ text: 'SHOW server_version;' });
    const databaseVersionValue = databaseVersionResult.rows[0].server_version;

    const databaseMaxConnectionsResult = await database.query({ text: 'SHOW max_connections;' });
    const databaseMaxConnectionsValue = databaseMaxConnectionsResult.rows[0].max_connections;

    const databaseName = process.env.POSTGRES_DB;
    const text = "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;";
    const values = [databaseName];
    const databaseOpenedConnectionsResult = await database.query({ text, values, });
    const databaseOpenedConnectionsValue = databaseOpenedConnectionsResult.rows[0].count;

    return NextResponse.json({
      status: "ok",
      updated_at: updateAt,
      dependencies: {
        database: {
          version: databaseVersionValue,
          max_connections: Number(databaseMaxConnectionsValue),
          opened_connections: databaseOpenedConnectionsValue,
        }
      },
    }, {
      status: 200,
    });
  } catch {
    return NextResponse.json({
      status: 503,
    });

  }
}
