import { NextResponse } from "next/server";
import { runner } from "node-pg-migrate";
import { join } from "node:path";


export async function GET() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return NextResponse.json(
      { error: 'DATABASE_URL não configurada.' },
      { status: 500 }
    );
  }

  const migrations = await runner({
    databaseUrl,
    dir: join("src", "infra", "migrations"),
    migrationsTable: 'pgmigrations',
    dryRun: true,
    direction: 'up',
    verbose: true,
  });

  return NextResponse.json(migrations, {status: 200});
};

export async function POST() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return NextResponse.json(
      { error: 'DATABASE_URL não configurada.' },
      { status: 500 }
    );
  }

  const migrations = await runner({
    databaseUrl,
    dir: join("src", "infra", "migrations"),
    migrationsTable: 'pgmigrations',
    dryRun: false,
    direction: 'up',
    verbose: true,
  });

  return NextResponse.json(migrations);
};
