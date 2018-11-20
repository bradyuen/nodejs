//request express framework
var http = require('http');
var express = require('express');
const app = express();

const server = http.createServer(app);
const io = require('socket.io')(server);
// set the view engine to ejs
app.set('view engine', 'ejs');


const port = 3000

//assign public folder
app.use(express.static(__dirname + '/public'));

// use res.render to load up an ejs view file

var request = require('request')
var username = 'test'
var password = 'test'

var session = require('express-session')({
  secret: "encode_12hsqKL20",
  resave: false,
  saveUninitialized: true,
  cookie: {
     secure: false,
     maxAge: 1000 * 60 * 60 * 24
  }
}),
sharedsession = require("express-socket.io-session");
app.use(session);

app.io = io;


// index page
app.get('/', function(req, res) {


  var data = {};
  data.title = "Home Page";
  data.layout = "home";
  data.js = "home";
  console.log(req.session.id);
  res.render('pages/index', data);
});

app.get('/api/holidayData', function(req, response) {
  req.session.user = 'testing';

  var options = {
    url: 'http://localhost/testApi/',
    auth: {
      user: username,
      password: password
    }
  }

  ///Create function to call API and save to body
  request(options, function (err, res, body) {
    if (err) {
      console.dir(err)
      return
    }
    //Log for debog
    console.dir('headers', res.headers)
    console.dir('status code', res.statusCode)
    console.dir(body);
    //Output
    response.send(body);
  });
});

app.get('/api/changeUserName', function(req, response) {
  //req.app.io.emit('change username', 'Brad Wong');

  req.app.io.emit('message', 'hi');
  response.send("Hi");

})

//All real time functions
io.use(sharedsession(session));

io.on('connection', function(socket){
    console.log('socket IO connected');
    socket.on('joined', function(data) {
      console.log(data);
        console.log(data);
        socket.emit('change username', 'guest');
        socket.emit('message', 'connected' + socket.handshake.session.id);
    });
});


//Server test code
server.listen(port, () => console.log(`Example app listening on port ${port}!`))
