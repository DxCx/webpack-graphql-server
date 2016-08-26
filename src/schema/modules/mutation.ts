export const typeDef = `
# Mutations
type Mutation {
    addPerson(name: String!, sex: String!): PersonType
    login(username: String!, password: String!): String
    logout: String
}
`;

export const resolver = {
  Mutation: {
    addPerson(root, args, ctx) {
      return ctx.addPerson(ctx.persons, {id: Math.random().toString(16).substr(2), name: args.name, sex: args.sex});
    },
    login(root: undefined, args: any, ctx) {
      return ctx.login(args.username, args.password);
    },
    logout(root: undefined, args: any, ctx) {
      return ctx.logout();
    },
  },
};
