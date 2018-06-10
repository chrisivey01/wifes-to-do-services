const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000;
const router = express.Router();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const accountSid = 'AC094faa1b8edda9e300224ef60ae8e47a';
const authToken = '9266229c7ef57aee437643a5f7d0087b';
const client = require('twilio')(accountSid, authToken);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Content-Type', 'application/json');

    next();
});

router.get('/', function(req, res) {

    client.messages
        .create({
            body: 'Check your to do list and send chris boobs.',
            from: '+19012455785',
            to: '+19013833011'
        })
        .then(message => console.log(message.sid))

   res.send(JSON.stringify({  message : "success!", success:true}))
});


app.use(router);
app.listen(port);