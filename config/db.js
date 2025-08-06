// config/db.js
import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();
console.log("password teste", process.env.PGPASSWORD);

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: Number(process.env.PGPORT),
});

pool.on("error", (err) => {
  console.error("Erro inesperado no client ocioso", err);
  process.exit(-1);
});

export default pool;
