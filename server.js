import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import route from "./routes/routes.js";

// ==========
// App initialization
// ==========
const app = express();

dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV, MONGO } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Connexion à la base de données
mongoose
  .connect(MONGO)
  .then(() => console.log("Connexion à MongoDB réussi !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.set("view engine", "pug");
app.locals.pretty = NODE_ENV !== "production"; // Indente correctement le HTML envoyé au client (utile en dev, mais inutile en production)

// ==========
// App middlewares
// ==========

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// ==========
// App routers
// ==========

app.use("/", route);

// ==========
// App start
// ==========

app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});
