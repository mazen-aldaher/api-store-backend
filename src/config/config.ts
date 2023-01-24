import dotenv from "dotenv";
dotenv.config();

console.log(process.env);
const {
  PORT,
  NODE_ENV,
  PG_HOST,
  PG_USER,
  PG_DATABASE,
  PG_DATABASE_TEST,
  PG_PASSWORD,
  PG_PORT,
} = process.env;

export default {
  port: PORT,
  host: PG_HOST,
  dbPort: PG_PORT,
  user: PG_USER,
  password: PG_PASSWORD,
  database: NODE_ENV === "dev" ? PG_DATABASE : PG_DATABASE_TEST,
};