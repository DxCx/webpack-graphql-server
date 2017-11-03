export const typeDef = `
type SomeType {
    testInt: Int
    testFloat: Float
    fixedString: String
}

type Query {
    someType: SomeType
}
`;

export const resolver = {
  SomeType: {
    fixedString() {
      return "fixed.";
    },
  },
  Query: {
    someType(root, args, ctx) {
      return {testFloat: 303.0303, testInt: 666};
    },
  },
};
