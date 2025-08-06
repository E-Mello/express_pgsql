import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD API",
      version: "1.0.0",
      description: "Documentação interativa da API CRUD",
    },
    servers: [
      { url: "http://localhost:3000/api", description: "Servidor local (dev)" },
    ],
  },
  // aponte para comentários JSDoc nas rotas
  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
