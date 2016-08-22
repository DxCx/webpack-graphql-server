import * as express from "express";
import * as bodyParser from "body-parser";
import { apolloExpress, graphiqlExpress } from "apollo-server";
import { Schema } from "./schema";

const EXPORT_GRAPHIQL = process.env.NODE_ENV !== "production" || true;
const PORT = process.env.PORT || 3000;

const GRAPHQL_ROUTE = "/graphql";
const GRAPHIQL_ROUTE = "/graphiql";

let app = express();
app.use(GRAPHQL_ROUTE, bodyParser.json(), apolloExpress({
    schema: Schema,
}));
if ( true === EXPORT_GRAPHIQL ) {
    app.use(GRAPHIQL_ROUTE, graphiqlExpress({
        endpointURL: GRAPHQL_ROUTE,
    }));
}
app.listen(PORT, () => {
    console.log(`GraphQL Server is now running on http://localhost:${PORT}${GRAPHQL_ROUTE}`);
    if ( true === EXPORT_GRAPHIQL ) {
        console.log(`GraphiQL Server is now running on http://localhost:${PORT}${GRAPHIQL_ROUTE}`);
    }
});
