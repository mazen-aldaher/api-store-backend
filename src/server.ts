import express, { Application, Request, Response } from "express";
import config from "./config/config";
import db from "./database/index";
import routes from "./routes";
import morgan from "morgan";
import helmet from "helmet";

const app: Application = express();
const PORT = config.port || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from primary mazen route");
});
//test.db
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api", routes);
app.listen(PORT, () => {
  console.log(`connected at port ${PORT}`);
});

export default app;
