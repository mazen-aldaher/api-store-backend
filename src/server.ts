import expres, { Application, Request, Response } from "express";
import config from "./config/config";
import db from "./database/index";

const app: Application = expres();
const PORT = config.port || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from primary mazen route");
});
//test.db
db.connect().then((client) => {
  return client
    .query("SELECT NOW()")
    .then((res) => {
      client.release();
      console.log(res.rows);
    })
    .catch((err) => {
      client.release();
      console.log(err.stack);
    });
});
app.listen(PORT, () => {
  console.log(`connected at port ${PORT}`);
});
