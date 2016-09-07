import {
    GraphQLSchema,
} from "graphql";
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";

const moduleFiles = (<any> require).context("./modules/", true, /\.ts/);
const modules = moduleFiles.keys().map((moduleName) => {
    return moduleFiles(moduleName);
});

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
