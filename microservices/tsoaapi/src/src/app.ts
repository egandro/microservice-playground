import express, { Response as ExResponse, Request as ExRequest } from "express";
import swaggerUi, { SwaggerUiOptions } from "swagger-ui-express";

import bodyParser from "body-parser";
import { RegisterRoutes } from "../build/routes";

export const app = express();

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

RegisterRoutes(app);

// no idea how do this better...
app.use('/docs/swagger.json', express.static(__dirname + '/../swagger.json'));

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import("../build/swagger.json"))
  );
});
