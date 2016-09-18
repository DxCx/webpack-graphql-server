import * as express from "express";
import * as bodyParser from "body-parser";
import { apolloExpress, graphiqlExpress } from "apollo-server";
import { Schema } from "./schema";
import * as cors from "cors";
import * as helmet from "helmet";
import * as morgan from "morgan";

import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { subscriptionManager } from "./subscriptions";

// Default port or given one.
export const GRAPHQL_ROUTE = "/graphql";
export const GRAPHIQL_ROUTE = "/graphiql";

interface IMainOptions {
    enableCors: boolean;
    enableGraphiql: boolean;
    env: string;
    port: number;
    wsPort?: number;
    verbose?: boolean;
};

/* istanbul ignore next: no need to test verbose print */
function verbosePrint(port, enableGraphiql) {
    console.log(`GraphQL Server is now running on http://localhost:${port}${GRAPHQL_ROUTE}`);
    if ( true === enableGraphiql  ) {
        console.log(`GraphiQL Server is now running on http://localhost:${port}${GRAPHIQL_ROUTE}`);
    }
}

export function main(options: IMainOptions) {
    let app = express();
    app.use(helmet());
    app.use(morgan(options.env));
    if ( true === options.enableCors ) {
        app.use(GRAPHQL_ROUTE, cors());
    }

    app.use(GRAPHQL_ROUTE, bodyParser.json(), apolloExpress({
        context: {},
        schema: Schema,
    }));
    if ( true === options.enableGraphiql ) {
        app.use(GRAPHIQL_ROUTE, graphiqlExpress({
            endpointURL: GRAPHQL_ROUTE,
        }));
    }

    return new Promise((resolve, reject) => {
        let server = app.listen(options.port, () => {
            /* istanbul ignore if: no need to test verbose print */
            if ( options.verbose ) {
                verbosePrint(options.port, options.enableGraphiql);
            }

            resolve(server);
        }).on("error", (err: Error) => {
            reject(err);
        });
    }).then((server) => {
        if ( undefined === options.wsPort ) {
            return [server];
        }

        const httpServer = createServer((request, response) => {
            response.writeHead(404);
            response.end();
        });

        httpServer.listen(options.wsPort, () => console.log( // eslint-disable-line no-console
            `Websocket Server is now running on http://localhost:${options.wsPort}`
        ));

        return [server, new SubscriptionServer({
                subscriptionManager,
                // TODO: Why not Same server? same context :( ?
                onSubscribe: (msg, params) => {
                    return Object.assign({}, params, {
                        context: {},
                    });
                },
            },
            httpServer
        )];
    });
}

/* istanbul ignore if: main scope */
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    const WS_PORT = process.env.WS_PORT || 8080;
    // Either to export GraphiQL (Debug Interface) or not.
    const NODE_ENV = process.env.NODE_ENV !== "production" ? "dev" : "production";
    const EXPORT_GRAPHIQL = NODE_ENV !== "production";
    // Enable cors (cross-origin HTTP request) or not.
    const ENABLE_CORS = NODE_ENV !== "production";

    main({
        enableCors: ENABLE_CORS,
        enableGraphiql: EXPORT_GRAPHIQL,
        env: NODE_ENV,
        port: PORT,
        verbose: true,
        wsPort: WS_PORT,
    });
}
