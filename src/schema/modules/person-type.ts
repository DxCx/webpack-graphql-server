export const typeDef = `
type PersonType {
    name: String
    id: String
    sex: String
    matches: [PersonType]
}
`;

export const resolver = {
    PersonType: {
        matches(root, args, ctx) {
            return ctx.persons.filter(person => person.sex !== root.sex);
        }
    },
};