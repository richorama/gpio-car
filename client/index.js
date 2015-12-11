var http = require('superagent');
var controls = require('./controls.jsx');
controls(function(command){
  send({command:command, duration: 10000});
});

function send(message){
  http.post('/command')
    .send(message)
    .end(function(err, data){
      if (err) console.log(err);
      if (data.text) console.log(data.text);
    });
}

window.fwd = function(time){
	send({command:"fwd", duration : time || 10000});
};

window.back = function(time){
  send({command:"back", duration : time || 10000})
};

window.stop = function(){
	send({command:"stop"});
};

window.spinl = function(time){
  send({command:"spinl", duration : time || 1000})
}

window.spinr = function(time){
  send({command:"spinr", duration : time || 1000})
}