import { Pool } from "pg";
import config from "../config/config";

const pool = new Pool({
  user: config.user,
  password: config.password,
  host: config.host,
  database: config.database,
  port: parseInt(config.dbPort as string, 10),
  max: 100,
});

pool.on("error", (error: Error) => {
  console.error(error.message);
});

export default pool;
