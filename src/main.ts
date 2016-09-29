import * as express from "express";
import { wsApollo, graphiqlExpress } from "apollo-server-rxjs";
import { Schema } from "./schema";
import * as helmet from "helmet";
import * as morgan from "morgan";

import * as url from "url";
import { Server as WsServer } from "ws";
import { Observable } from "rxjs";

// Default port or given one.
export const GRAPHQL_ROUTE = "/graphql";
export const GRAPHIQL_ROUTE = "/graphiql";

const clockSource = Observable.interval(1000).map(() => new Date()).publishReplay(1).refCount();

interface IMainOptions {
    enableGraphiql: boolean;
    env: string;
    port: number;
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

    app.use(GRAPHQL_ROUTE, (req, res) => {
        res.writeHead(400);
        res.write("this is websocket endpoint");
        res.end();
    });

    if ( true === options.enableGraphiql ) {
        app.use(GRAPHIQL_ROUTE, graphiqlExpress({
            endpointURL: `ws://localhost:${options.port}${GRAPHQL_ROUTE}`,
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
        let wss = new WsServer({ server: <any> server });

        wss.on("connection", wsApollo((ws) => {
            const location = url.parse(ws.upgradeReq.url, true);

            // Multiplex ws connections by path.
            switch ( location.pathname ) {
               case GRAPHQL_ROUTE:
                   return {
                       context: {
                           clockSource,
                       },
                       schema: Schema,
                   };
               default:
                   ws.terminate();
                   return undefined;
            }
        }));
        return server;
    });
}

/* istanbul ignore if: main scope */
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    // Either to export GraphiQL (Debug Interface) or not.
    const NODE_ENV = process.env.NODE_ENV !== "production" ? "dev" : "production";
    const EXPORT_GRAPHIQL = NODE_ENV !== "production";

    main({
        enableGraphiql: EXPORT_GRAPHIQL,
        env: NODE_ENV,
        port: PORT,
        verbose: true,
    });
}
