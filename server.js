var http = require('http').createServer(handler).listen(3000);
var fs = require('fs');
var path = require('path');
try{
  var controller = require('./car-controller');
} catch(e){
  console.log(e);
}

function handleMessage(actions){
  var action = actions.pop();
  if (null == action) return;
  if (action.action === "drive"){
    controller[action.direction](action.amount, () => {
      handleMessage(actions);
    });
  }
  //controller[message.command](message.duration || 1000);
}

// serve static files it the public folder
function handler(req, res){
  if (req.method === "POST"){
    var data = "";
    req.on("data", function(chunk){
      data += chunk.toString();
    });
    req.on("end", function(){
      handleMessage(JSON.parse(data));
      res.end();
    });
    return;
  }

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

