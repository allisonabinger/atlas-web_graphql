// Task 0: creates an object which contains the schema property

const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql

const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString },
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        task: {
            type: TaskType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parent, args) {
                // mock object
                return { id: args.id, title: 'sample title', weight: 5, description: 'mock object'}
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery
});
