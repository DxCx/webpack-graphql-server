import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {Schema} from './schema';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import {persons, findPerson, addPerson} from './data-base/person-database';

// Default port or given one.
export const GRAPHQL_ROUTE = "/graphql";

interface IMainOptions {
  enableCors: boolean;
  enableGraphiql: boolean;
  env: string;
  port: number;
  verbose?: boolean;
}

/* istanbul ignore next: no need to test verbose print */
function verbosePrint(port, enableGraphiql) {
  console.log(`GraphQL Server is now running on http://localhost:${port}${GRAPHQL_ROUTE}`);
}

export class TestConnector {
  public get testString() {
    return "it works from connector as well!";
  }
}

export function main(options: IMainOptions) {
  let app = express();
  app.use(helmet());

  app.use(morgan(options.env));

  if (true === options.enableCors) {
    app.use(GRAPHQL_ROUTE, cors());
  }

  let testConnector = new TestConnector();
  let playgroundConf = {};
  if (true === options.enableGraphiql) {
    playgroundConf = {
      playground: {
        endpoint: GRAPHQL_ROUTE,
      }
    };
  }

  const server = new ApolloServer({
    schema: Schema,
    context: {
      testConnector,
      persons,
      findPerson,
      addPerson
    },
    ...playgroundConf,
  });
  server.applyMiddleware({ app, path: GRAPHQL_ROUTE });

  return new Promise((resolve, reject) => {
    let server = app.listen(options.port, () => {
      /* istanbul ignore if: no need to test verbose print */
      if (options.verbose) {
        verbosePrint(options.port, options.enableGraphiql);
      }

      resolve(server);
    }).on("error", (err: Error) => {
      reject(err);
    });
  });
}

/* istanbul ignore if: main scope */
if (require.main === module) {
  const PORT = parseInt(process.env.PORT || '3000', 10);

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
  });
}
