var http = require('superagent');

function send(message){
  http.post('/')
    .send(message)
    .end(function(err, data){
      if (err) console.log(err);
      if (data.text) console.log(data);
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