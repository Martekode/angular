const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = 6969;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});


let allFriends = [{_firstName: 'Coach', _lastName: 'Tim', _email: 'tim.broos@becode.org', _phoneNumber: '0469420666', _favLang: 'Javascript'}];

// Below you can define how your API handles a get or a post request.
// Try sending a get request to the root, you should get a "Hello from server" back.

app.get('/', function (request, response) {
    response.send('Hello from server');
    console.log("started server");
});

app.post('/', function (request, response) {
    response.status(200).send({"message": "Data received"});
});
app.get('/allFriends', function (request, response) {
    response.send(allFriends);
})
app.post('/allFriends', function (request,response) {
    console.log(request.body);
    allFriends.push(request.body);
    response.status(200).send({"message": "Data received"});
});


app.listen(PORT, function () {});

