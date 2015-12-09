var engine = require('engine.io');
var http = require('http').createServer(handler).listen(3000);
var fs = require('fs');
var path = require('path');
var controller = require('./car-controller');

var server = engine.attach(http);

server.on('connection', function (socket) {
  socket.on('message', function(data){
    var message = JSON.parse(data);
    if (!message) return;
    handleMessage(message);
   });
  socket.on('close', function(){ });
});

function handleMessage(message){
  controller[message.command](message.duration || 1000);
}

// serve static files it the public folder
function handler(req, res){
  var filename = req.url.replace('/', '');
  if (!filename) filename = "index.html";

  function returnError(err){
      res.statusCode = 404;
      res.write(err.toString());
      res.end();
  }

  try{
    var fileStream = fs.createReadStream(path.join('public', filename));
    fileStream.on('error', returnError);
    fileStream.pipe(res);
  } catch (e) {
    returnError(e);
  }
}

