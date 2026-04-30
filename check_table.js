const { Pool } = require('pg');
require('dotenv').config();
const p = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});
p.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'")
  .then(r => console.log(r.rows.map(ro => ro.table_name)))
  .catch(console.error)
  .finally(() => p.end());
