export const typeDef = `
type PersonType {
    name: String
    id: String
    sex: String
    matches: [PersonType]
}

type Query {
    getPerson(id: String!): PersonType
    persons: [PersonType]
}

# Mutations
type Mutation {
    addPerson(name: String!, sex: String!): PersonType
}
`;

export const resolver = {
  PersonType: {
    matches(root, args, ctx) {
      return ctx.persons.filter(person => person.sex !== root.sex);
    }
  },
  Query: {
    getPerson(root, args, ctx) {
      return ctx.findPerson(ctx.persons, args.id);
    },
    persons(root, args, ctx) {
      return ctx.persons;
    },
  },
  Mutation: {
    addPerson(root, args, ctx) {
      return ctx.addPerson(ctx.persons, {id: Math.random().toString(16).substr(2), name: args.name, sex: args.sex});
    },
  },
};
