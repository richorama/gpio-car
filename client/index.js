var socket = require('engine.io-client')('ws://localhost:3000');
socket.on('open', function(){
  console.log("socket is open");
  socket.on('message', function(data){
	  console.log(JSON.parse(data));
  });
  socket.on('close', function(){});
});

function send(message){
	socket.send(JSON.stringify(message));
}

window.fwd = function(time){
	send({command:"fwd", duration : time || 10000});
}

window.stop = function(){
	send({command:"stop"});
}