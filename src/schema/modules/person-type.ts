export const typeDef = `
type PersonType {
    name: String
    id: Int
    sex: String
    matches: [PersonType]
}
`;

let persons = [
    {
        id: 1,
        sex: 'male',
        name: 'miro'
    },
    {
        id: 2,
        sex: 'female',
        name: 'lala'
    },
    {
        id: 3,
        sex: 'male',
        name: 'joe'
    }
];

export const resolver = {
    PersonType: {
        matches(root, args, context) {
            return persons.filter(person => person.sex !== root.sex);
        }
    },
};

export const findPerson = (id: number) => {
    return persons.filter(person => person.id === id)[0];
}