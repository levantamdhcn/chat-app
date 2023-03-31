import swaggerJsDocs from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { Express } from "express-serve-static-core";
import { Request, Response } from "express";
import swaggerDoc from "../../public/swagger.json";

const options: swaggerJsDocs.Options = {
  definition: {
    swagger: "2.0",
    info: {
      title: "CHAT-APP API Docs",
      version: "1.0.0"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    basePath: "/api",
    schemes: ["http", "https"],
  },
  apis: ['../routes/**/index.ts', '../src/interfaces/**.ts'],
  securityDefinitions: {
    auth: {
      type: 'apiKey',
      name: 'Authorization'
    }
  },
};

const swaggerSpec = swaggerJsDocs(options);

console.log("swaggerSpec", swaggerSpec);

export default function swaggerDocs(app: Express, port: string) {
  //Swagger page
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

    //Docs in JSON format
    app.get("/public/swagger.json", (req: Request, res: Response)=> {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    console.log(`Docs available at http://localhost:${port}/docs`);
};