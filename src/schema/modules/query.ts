export const typeDef = `
# Root Query
type Query {
    testString: String
    testStringConnector: String
    rootMockedString: String
    mockedObject: MockedType
    someType: SomeType
    getPerson(id: String!): PersonType
    persons: [PersonType]
}
`;

export const resolver = {
    Query: {
        getPerson(root, args, ctx) {
            return ctx.findPerson(ctx.persons, args.id);
        },
        persons(root, args, ctx) {
            return ctx.persons;
        },
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
