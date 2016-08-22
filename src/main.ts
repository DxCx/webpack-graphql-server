import * as express from "express";
// import { apolloExpress } from "apollo-server";

// TODO: Envioroment?
const PORT = process.env.PORT || 3000;

let app = express();

// app.use("/graphql", bodyParser.json(), apolloExpress({ schema: myGraphQLSchema }));
app.listen(PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${PORT}/graphql`
));
