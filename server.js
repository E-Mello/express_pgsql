import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Swagger setup
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD API",
      version: "1.0.0",
      description: "Documentação interativa da API CRUD",
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 3000}/api`, description: "Dev server" }
    ],
  },
  apis: ["./routes/*.js"],
});
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas da API
app.use("/api", itemRoutes);

// Handler 404
app.use((_, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📖 Docs: http://localhost:${PORT}/api/docs`);
});
