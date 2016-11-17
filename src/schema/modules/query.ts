export const typeDef = `
# Root Query
type Query {
    testString: String
    testStringConnector: String
    rootMockedString: String
    mockedObject: MockedType
    someType: SomeType
}
`;

export const resolver = {
    Query: {
        testString() {
            return "it Works!";
        },
        testStringConnector(root, args, ctx) {
          return ctx.testConnector.testString;
        },
        someType(root, args, ctx) {
            return { testFloat: 303.0303, testInt: 666 };
        },
    },
};
