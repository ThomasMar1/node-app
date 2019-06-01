//load app
const express = require('express');
const morgan = require('morgan')
const app = express();
const mysql = require('mysql');



app.use(morgan('tiny'))
app.get("/", (req, res) =>{
    console.log("Responsing to root route")
    res.send("Hello from the other side")
});

app.get("/users", (req, res) =>{
    var user1 = {firstName : "Thomas", lastName: "Mar"};
    var user2 = {firstName : "Sharon", lastName: "Mar"};
    var user3 = {firstName : "Michael", lastName: "Mar"};

    res.json([user1, user2, user3]);
});

app.get("/user/:id", (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'database01',
        database: 'thomas'

    });

    // connection.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
    //   });

    connection.query("SELECT * from thomas_users", (err, rows, fields) => {
        console.log("I think we fetched users")
        console.log(err);

        res.json(rows);
    })

});

app.listen(3003, () => {
    console.log("listening on 3003");
});


