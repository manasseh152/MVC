// Import all node modules
// import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import Express from "express";
import { engine } from "express-handlebars";
import session from "express-session";
import dotenv from "dotenv";

// Import all utils and middlewares from ./utils and ./middlewares
import Routes from "./util/Routes";

// Import all config files from ./config
import sessionOptions from "./config/sessionOptions";

// Set all environment variables
dotenv.config();
const PORT = process.env.PORT || 4000;
const SECRET = process.env.SECRET || "secret";
const PROD = process.env.NODE_ENV === "production";
const BASE_URL = process.env.DOMAIN || `http://localhost:${PORT}/`;

// Initialize nessesary variables
const app = Express();
export const prisma = new PrismaClient();

// Initialize all middlewares
app.engine("hbs", engine());
app.set("view engine", "hbs");
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(session(sessionOptions(SECRET, PROD)));

// Initialize all routes
Routes.setBaseUrl(BASE_URL);
Routes.getRoutesArry();
Routes.setRouters(app);

// Start the server
app.listen(PORT, () => {
	console.log(`[Server] Running on ${BASE_URL}`);
});
