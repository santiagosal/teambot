import * as Express from "express";
import * as http from "http";
import * as path from "path";
import * as morgan from "morgan";
import { MsTeamsApiRouter, MsTeamsPageRouter } from "express-msteams-host";
import * as debug from "debug";
import * as compression from "compression";

// Initialize debug logging module
const log = debug("msteams");
log("Initializing Microsoft Teams Express hosted App...");

require("dotenv").config();
// The import of components has to be done AFTER the dotenv config
// eslint-disable-next-line import/first
import * as allComponents from "./TeamsAppsComponents";

const express = Express();
const port = process.env.port || process.env.PORT || 3007;

// Inject the raw request body onto the request object
express.use(Express.json({
    verify: (req, res, buf: Buffer, encoding: string): void => {
        (req as any).rawBody = buf.toString();
    }
}));
express.use(Express.urlencoded({ extended: true }));
express.use(morgan("tiny"));
express.use(compression());

// routing for bots, connectors and incoming web hooks - based on the decorators
express.use(MsTeamsApiRouter(allComponents));

// routing for pages for tabs and connector configuration
express.use(MsTeamsPageRouter({
    root: path.join(__dirname, "web/"),
    components: allComponents
}));

express.set("port", port);
http.createServer(express).listen(port, () => {
    log(`Server running on ${port}`);
});
