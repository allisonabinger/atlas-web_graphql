// Task 0: creates an object which contains the schema property
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList, GraphQLScalarType, GraphQLNonNull } = require('graphql');
const { resolveFieldValueOrError } = require('graphql/execution/execute');
const Project = require('../models/project');
const Task = require('../models/task');


const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString },
        // resolves to a ProjectType to find project associated with projectId in parent task object
        project: {
            type: ProjectType,
            resolve(parent, args) {
                return Project.findById(args.id)
            }
        }
    })
});

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString },
        // resolves to list of TaskType, filters with projectId matched parent project's id
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                return Task.find({ projectId: parent.id })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        task: {
            type: TaskType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                // mock object
                return Task.findById(args.id);
            }
        },
       project: {
            type: ProjectType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Project.findById(args.id);
            }
       },
       tasks: {
        type: new GraphQLList(TaskType),
        resolve(parent, args) {
            return Task.find({})
        }
        },
       projects: {
        type: new GraphQLList(ProjectType),
        resolve(parent, args) {
            return Project.find({})
        }
       }
    }
});

// mutation: operation to modify data on server (post, put, delete)
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProject: {
            type: ProjectType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                weight: { type: new GraphQLNonNull(GraphQLInt) },
                description: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const { title, weight, description } = args;
                const newProject = new Project({
                    title,
                    weight,
                    description
                });
                return newProject.save();
            }
        },
        addTask: {
            type: TaskType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                weight: { type: new GraphQLNonNull(GraphQLInt) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                projectId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const { title, weight, description, projectId } = args;
                const newTask = new Task({
                    title,
                    weight,
                    description
                });
                return newTask.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
