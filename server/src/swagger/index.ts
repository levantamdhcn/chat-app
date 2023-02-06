import swaggerJsDocs from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { Express } from "express-serve-static-core";
import { Request, Response } from "express";

const options: swaggerJsDocs.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CHAT APP API Docs",
      version: "1.0.0"
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],

      }
    ]
  },
  apis: ['./src/routes/*.ts', './src/interfaces/*.ts']
};

const swaggerSpec = swaggerJsDocs(options);

export default function swaggerDocs(app: Express, port: string) {
    //Swagger page
    app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

    //Docs in JSON format
    app.get("docs.json", (req: Request, res: Response)=> {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    console.log(`Docs available at http://localhost:${port}/docs`);
};