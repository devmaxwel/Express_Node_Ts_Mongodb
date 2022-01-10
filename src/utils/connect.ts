import mongoose from "mongoose";
import config from 'config'
import log from "./logger";

const connect = async()=>{
    const dbUri = config.get<string>("dbUri");

    return  await mongoose.connect(dbUri)
    .then(() => {
       log.info("connected to database");
    })
    .catch((err) => {
        log.info(err.message);
        process.exit(1);
    });


}

export default connect;