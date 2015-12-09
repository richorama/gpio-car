var gpio = require('rpi-gpio');

var LEFT_FORWARD = 17;
var LEFT_BACK = 18;
var RIGHT_FORWARD = 22;
var RIGHT_BACK = 23;

var pins = [LEFT_FORWARD,LEFT_BACK,RIGHT_FORWARD,RIGHT_BACK];

module.exports = function(cb){
	var counter = 0;
	pins.forEach(function(pin){
		gpio.setup(pin, gpio.DIR_OUT, function(err){
			console.log(arguments);
			if (err) return console.log(err);
			console.log(pin.toString() + " ready");
			counter++;
			if (pins.length === counter) {
				gpio.write(LEFT_FORWARD, true, function(){
					console.log(arguments);
				})
				cb()
			}
		});
	});

}

function write(high, low){
	var cb = function(err){
		if (err) console.log(err.toString());
	};
	var writeValue = function(pin, value){
		gpio.write(pin, value, cb);
	};
	high.forEach(function(pin){
		writeValue(pin, true);
	});
	low.forEach(function(pin){
		writeValue(pin, false);
	});
}

var currentAction;

function clear(){
	if (currentAction) clearTimeout(currentAction);
}

module.exports.stop = function(){
	write([], pins);
	currentAction = undefined;
};

module.exports.fwd = function(time){
	clear();
	write([LEFT_FORWARD, RIGHT_FORWARD], [LEFT_BACK, RIGHT_BACK]);
	currentAction = setTimeout(function(){
		write([], [LEFT_FORWARD, RIGHT_FORWARD]);
	},time);
};


