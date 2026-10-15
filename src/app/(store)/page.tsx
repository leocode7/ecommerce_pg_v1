import database from "@/infra/database";

export default async function Home() {
  const result = await database.query("SELECT 1 + 1 as sum");
  console.log(result?.rows);
  return (
    <div>
      <main>
        <h1>Página inicial do Ecommerce</h1>
        <h2>Bem-vindo</h2>
      </main>
    </div>
  );
}
