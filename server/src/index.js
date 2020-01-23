const express = require('express')
import schema from './schema.js';
import graphqlHTTP from 'express-graphql';

const sqlite3 = require('sqlite3').verbose()
const port = 3005;
var path = require("path");
const app = express();

app.use('/graphql', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`\n\nExpress listen at http://localhost:${port} \n`);

    let db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
          console.error(err.message);
        }
        else
        console.log('Connected to the test database.');       
      });

});