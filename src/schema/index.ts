import {
    GraphQLSchema,
} from "graphql";
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";

/* tslint:disable:no-var-requires */
const modules = [
    require("./modules/mocked-type"),
    require("./modules/query"),
    require("./modules/some-type"),
    require("./modules/person-type"),
];

const mainDefs = [`
    schema {
        query: Query,
    }
`,
];

class TestConnector {
    constructor (private ctx: any) {

    }

    public get testString() {
        return "it works from connector as well!";
    }
}

const resolvers = Object.assign({},
    ...(modules.map((m) => m.resolver).filter((res) => !!res)), {
});

const typeDefs = mainDefs.concat(modules.map((m) => m.typeDef).filter((res) => !!res));

const Schema: GraphQLSchema = makeExecutableSchema({
    connectors: {
        testConnector: TestConnector,
    },
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

export { Schema };
