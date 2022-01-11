import express from "express";
import config from "config";
import connect from "./utils/connect";
import log from "./utils/logger";
import routes from "./routes";
import { userDeserialization } from "./middleware/userDeserialization";

const port = config.get<number>("port")
const app = express();
app.use(express.json());

app.use(userDeserialization);



app.listen(port, async() => {
    log.info(`Server runs succefully at http://localhost:${port}`);
    await connect();
    routes(app);
   
});