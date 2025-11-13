const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Car Marketplace API",
      version: "1.0.0",
      description: "API Documentation for Car Marketplace App"
    },
    servers: [
      {
        url: "http://localhost:8000"
      }
    ]
  },
  apis: ["./routes/*.js"], // SCAN ROUTES AUTOMATICALLY
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };
