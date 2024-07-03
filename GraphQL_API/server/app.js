const express = require('express');
const schema = require('./schema/schema')
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose')

const app = express();

const mongoURI = 'mongodb+srv://allisonabinger:root@cluster01.oqci0pb.mongodb.net/'

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongoDB')
});

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000,() => {
  console.log('now listening for request on port 4000');
});
