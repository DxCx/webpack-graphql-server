import {
    GraphQLSchema,
} from "graphql";
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";

const typeDefs: Array<string> = [`
type MockedType {
    mockedString: String
    mockedInt: Int
}
`, `
type Query {
    testString: String
    testStringConnector: String
    rootMockedString: String
    mockedObject: MockedType
}
`, `
schema {
    query: Query
}
`];

const resolvers = {
    Query: {
        testString() {
            return "it Works!";
        },
        testStringConnector(root, args, ctx) {
            return ctx.connectors.testConnector.testString;
        },
    },
};

class TestConnector {
    constructor (private ctx: any) {

    }

    public get testString() {
        return "it works from connector as well!";
    }
}

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
