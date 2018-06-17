const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000;
const router = express.Router();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const accountSid = 'AC094faa1b8edda9e300224ef60ae8e47a';
const authToken = '9266229c7ef57aee437643a5f7d0087b';
const client = require('twilio')(accountSid, authToken);



var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'windowwasher1',
    database: 'todo'
})

app.get('/msg', function(req, res, next) {
    client.messages
        .create({
            body: 'Check your to do list! http://nat.chrisaivey.com.',
            from: '+19012455785',
            to: '+19013833011'
        })
        .then(message => console.log(message.sid))

   res.send(JSON.stringify({  message : "success!", success:true}))

});
 
app.get('/load', function(req,res,next){
    connection.query('SELECT * FROM todo ', function(err, results) {
        if (err) throw err;
        res.send((results));
    })
});

app.post('/go', function(req,res,next){
    var post = req.body;
    connection.query("INSERT INTO mood SET ?",
        post, function(err, results, fields) {
            if (err) throw err;
            console.log(results.insertId);
            res.end(JSON.stringify(results));
        })
});

app.get('/mood', function(req,res,next){
    connection.query('SELECT * FROM mood ', function(err, results) {
        if (err) throw err;
        res.send((results));
    })
});


app.post('/send', function(req,res,next){
    var post = req.body;
    connection.query("INSERT INTO todo SET ?",
        post, function(err, results, fields) {
        if (err) throw err;
        console.log(results.insertId);
        res.end(JSON.stringify(results));
    })
});

app.delete('/delete/:id', function(req,res,next) {
    var post = req.params;
    connection.query('DELETE FROM `todo` WHERE `id`=?', [post.id],
    function (err, results, fields) {
        if (err) throw err;
        res.end('Record has been deleted!');
    })
})




app.use(router);
app.listen(port);