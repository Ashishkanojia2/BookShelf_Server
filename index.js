import { config } from "dotenv";
import { app } from "./app.js";
import { databaseConnection } from "./DatabaseCollection/Database.js";
const PORT = "4000";

config({ path: "./config.env" });
// YA PR DATABASR CONNNECTION VALI FILE KO CALL KRNA HAI
databaseConnection();
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
