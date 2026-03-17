// Run this script to ensure the public.users table has the latest columns
// Usage: DATABASE_URL="..." node scripts/migrate_users.js

const { Client } = require('pg');

(async () => {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  // Add dob, profile_image_url if they don't exist
  const checks = [
    { name: 'dob', definition: 'DATE' },
    { name: 'profile_image_url', definition: 'TEXT' },
  ];

  for (let chk of checks) {
    const res = await client.query(
      `SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='users' AND column_name=$1`,
      [chk.name]
    );
    if (res.rows.length === 0) {
      console.log(`adding column ${chk.name}`);
      await client.query(`ALTER TABLE public.users ADD COLUMN ${chk.name} ${chk.definition}`);
    } else {
      console.log(`column ${chk.name} already exists`);
    }
  }

  console.log('Done');
  await client.end();
})();
