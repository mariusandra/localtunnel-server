var app = require('express')(); // work with express

// on remote server, init NLT first
var NLTunnel = require('node-local-tunnel');
NLTunnel.init({ port: 4567 });  // init the tunnel server

// then hannel all logic requests by app.use
app.use( NLTunnel.server({ port: 4567 }) );

// You can also apply routers to relay specific requests, e.g.
// app.get('/foo', NLTunnel.server() ); // only relay /foo with 'GET' request

// better use NLT before other middleware
var	bodyParser = require('body-parser'),
  compression = require('compression');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(compression());
// app.use(express.static('assets/')); // if you don't want relay static files, put this line before NLT

// app.use('/someurl', function(req, res, next){
//   // Your codes ...
// });
// .......
app.listen(4567);
