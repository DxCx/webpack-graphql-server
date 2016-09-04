import {
    GraphQLSchema,
} from "graphql";
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";

const typeDefs: Array<string> = [`
# Type which should have values mocked
type MockedType {
    mockedFirstName: String
    mockedInt: Int
}
`, `
type SomeType {
    testInt: Int
    testFloat: Float
}
`, `
# Root Query
type Query {
    testString: String
    testStringConnector: String
    rootMockedString: String
    mockedObject: MockedType
    someType: SomeType
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
        someType(root, args, ctx) {
            return { testFloat: 303.0303, testInt: 666 };
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
