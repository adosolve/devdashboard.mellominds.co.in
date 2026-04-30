const { Pool } = require('pg');
require('dotenv').config();
const p = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});
p.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name='users'")
  .then(r => console.log(r.rows))
  .catch(console.error)
  .finally(() => p.end());
