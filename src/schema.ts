import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
} from "graphql";

const QueryType = new GraphQLObjectType({
    description: "Root Query",
    fields: {
        testString: {
            type: GraphQLString,
            resolve() {
                return "it works";
            },
        },
    },
    name: "QueryRoot",
});

export const Schema = new GraphQLSchema({
    query: QueryType,
});
