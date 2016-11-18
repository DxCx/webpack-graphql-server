import {GraphQLSchema} from 'graphql';
import {makeExecutableSchema, addMockFunctionsToSchema} from 'graphql-tools';

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

const resolvers = Object.assign({},
  ...(modules.map((m) => m.resolver).filter((res) => !!res)));

const typeDefs = mainDefs.concat(modules.map((m) => m.typeDef).filter((res) => !!res));

const Schema: GraphQLSchema = makeExecutableSchema({
  logger: console,
  resolverValidationOptions: {
    requireResolversForNonScalar: false,
  },
  resolvers: resolvers,
  typeDefs: typeDefs,
});
addMockFunctionsToSchema({
  mocks: {},
  preserveResolvers: true,
  schema: Schema,
});

export {Schema};
