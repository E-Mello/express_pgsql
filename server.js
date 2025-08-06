// server.js
import dotenv from "dotenv";
import express from "express";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", itemRoutes);

app.use((_, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
