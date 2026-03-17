const { Client } = require('pg');
(async () => {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  // include schema so we can see duplicates between public and auth
  const res = await client.query(
    "SELECT table_schema, column_name, data_type FROM information_schema.columns WHERE table_name='users' ORDER BY table_schema, ordinal_position"
  );
  console.table(res.rows);
  await client.end();
})();
