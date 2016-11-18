export const persons = [
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

export const findPerson = (persons: Array<any>, id: number) => {
    return persons.filter(person => person.id === id)[0];
}