import {GraphQLSchema} from 'graphql';
import {makeExecutableSchema} from 'graphql-schema-tools';

/* tslint:disable:no-var-requires */
const modules = [
  require("./modules/mocked-type"),
  require("./modules/some-type"),
  require("./modules/person-type"),
  require("./modules/query"),
  require("./modules/mutation"),
];

const mainDefs = [`
    schema {
        query: Query,
        mutation: Mutation
    }
`,
];

const resolvers = modules.map((m) => m.resolver).filter((res) => !!res);
const typeDefs = mainDefs.concat(modules.map((m) => m.typeDef).filter((res) => !!res));

const Schema: GraphQLSchema = makeExecutableSchema({
  resolvers: resolvers,
  typeDefs: typeDefs,
});

export {Schema};
