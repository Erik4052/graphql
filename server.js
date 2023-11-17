const express = require('express');
const {graphqlHTTP} =  require('express-graphql');
const schema =  require('./graphql/schema');
const {connectDB} = require('./db/index');
const app = express();
connectDB();
app.get('/', (req, res) => {
    res.send('Welcome to my api')
});

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(3000);
console.log('server running on port 3000');
