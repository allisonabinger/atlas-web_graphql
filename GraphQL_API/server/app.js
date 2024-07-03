const express = require('express');
const schema = require('./schema/schema')
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose')

const app = express();

// connects to the GraphQLAPI database in cluster01
// project and task models will send to 'Grading' collection
const mongoURI = 'mongodb+srv://allisonabinger:root@cluster01.oqci0pb.mongodb.net/GraphQLAPI'

async function connectMongo() {
    console.log('Connecting to MongoDB database...')
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB!')
    } catch(error) {
        console.error('Error occured during connection to mongoDB database:', error.message)
    }
}
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));

connectMongo().then(() => {
    console.log('Connecting to server...');
    try {
        app.listen(4000, () => {
            console.log('Server is now listening for request on port 4000');
          });
    } catch(error) {
        console.log('Error occured when trying to connect to server:', error.message)
    }
});
