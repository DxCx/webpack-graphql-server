import * as express from 'express';
import * as bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'graphql-server-express';
import {Schema} from './schema';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import {persons, findPerson, addPerson} from './data-base/person-database';
import * as session from 'express-session';

// Default port or given one.
export const GRAPHQL_ROUTE = "/graphql";
export const GRAPHIQL_ROUTE = "/graphiql";

// This is just for the demo, use a decent store please :)
const USER_STORE = {
    password: "1234",
    username: "auth-demo",
};

// TODO: Find a decent users/accounts library, and replace it with it.
// passport doesn't support authenticating without being a middlewere.
const loginMethod = (username, password) => {
    if ( (username !== USER_STORE.username) ||
         (password !== USER_STORE.password ) ) {
        throw new Error("Incorrect Credentials");
    }
    return { username: username };
};

interface IMainOptions {
  enableCors: boolean;
  enableGraphiql: boolean;
  env: string;
  port: number;
  verbose?: boolean;
  sessionOpts?: any;
}

interface ReqWithSession extends express.Request {
  session: any;
}

/* istanbul ignore next: no need to test verbose print */
function verbosePrint(port, enableGraphiql) {
  console.log(`GraphQL Server is now running on http://localhost:${port}${GRAPHQL_ROUTE}`);
  if (true === enableGraphiql) {
    console.log(`GraphiQL Server is now running on http://localhost:${port}${GRAPHIQL_ROUTE}`);
  }
}

class TestConnector {
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
  if ( options.sessionOpts ) {
    app.use(session(options.sessionOpts));
  }

  let testConnector = new TestConnector();
  app.use(GRAPHQL_ROUTE, bodyParser.json(), graphqlExpress((req: ReqWithSession, res) => ({
    context: {
      testConnector,
      persons,
      findPerson,
      addPerson,
      isAuthenticated: () => {
        return req.session.hasOwnProperty("userInfo");
      },
      login: (username, password) => {
        /* tslint:disable:no-string-literal */
        req.session["userInfo"] = loginMethod(username, password);
        return "success";
      },
      logout: () => {
        if ( undefined === req.session ) {
          return Promise.resolve("success");
        }

        return new Promise((resolve, reject) => {
          req.session.destroy((err) => {
            if ( err ) {
              reject(err);
              return;
            }
            resolve("success");
          });
        });
      },
      session: req.session,
    },
    schema: Schema,
    })));

  if (true === options.enableGraphiql) {
    app.use(GRAPHIQL_ROUTE, graphiqlExpress({endpointURL: GRAPHQL_ROUTE}));
  }

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
  const PORT = process.env.PORT || 3000;

  // Either to export GraphiQL (Debug Interface) or not.
  const NODE_ENV = process.env.NODE_ENV !== "production" ? "dev" : "production";

  const EXPORT_GRAPHIQL = NODE_ENV !== "production";

  // Enable cors (cross-origin HTTP request) or not.
  const ENABLE_CORS = NODE_ENV !== "production";

  const SESSION_OPTS = {
    // Age = 1 Hour.
    cookie: { maxAge: 60 * 60 * 1000, secure: false },
    resave: false,
    saveUninitialized: false,
    secret: "Sup3rH4rdP4$$w0rd",
    rolling: true,
  };
  if ( "production" === NODE_ENV ) {
    SESSION_OPTS.cookie.secure = true;
  };

  main({
    enableCors: ENABLE_CORS,
    enableGraphiql: EXPORT_GRAPHIQL,
    env: NODE_ENV,
    port: PORT,
    // Please, don't store your secrets in the code.
    // use environment variables or configuration file which is not in git. ;)
    sessionOpts: SESSION_OPTS,
    verbose: true,
  });
}
