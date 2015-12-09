var http = require('superagent');

function send(message){
  http.post('/')
    .send(message)
    .end(function(err, data){
      if (err) console.log(err);
      if (data) console.log(data);
    });
}

window.fwd = function(time){
	send({command:"fwd", duration : time || 10000});
}

window.stop = function(){
	send({command:"stop"});
}