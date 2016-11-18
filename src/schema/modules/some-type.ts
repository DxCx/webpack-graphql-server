export const typeDef = `
type SomeType {
    testInt: Int
    testFloat: Float
    fixedString: String
}
`;

export const resolver = {
  SomeType: {
    fixedString() {
      return "fixed.";
    },
  },
};
