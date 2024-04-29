import { config } from "dotenv";

config();

// export let port = "mongodb://0.0.0.0:27017/dw12";

export let port = process.env.port;
export let db_url = process.env.DB_URL;
export const secretKey = process.env.SECRET_KEY;
