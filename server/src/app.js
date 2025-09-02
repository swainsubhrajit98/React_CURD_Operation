import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error.middleware.js";
import { connectDB, sequelize } from "./config/db.js";
import itemRoutes from "./routes/item.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "API running" }));
app.use("/api/items", itemRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

(async () => {
  await connectDB();
  await sequelize.sync();
  app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
})();
