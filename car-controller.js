var gpio = require('rpi-gpio');

var LEFT_FORWARD = 21;
var LEFT_BACK = 22;
var RIGHT_FORWARD = 23;
var RIGHT_BACK = 24;
var LIGHT = 26;

var pins = [LEFT_FORWARD,LEFT_BACK,RIGHT_FORWARD,RIGHT_BACK];


pins.forEach(function(pin){
	gpio.setup(pin, gpio.DIR_OUT, function(err){
		if (err) return console.log(err);
		console.log(pin.toString() + " ready");
	});
	gpio.setup(LIGHT, gpio.DIR_OUT, function(err){
		if (err) return console.log(err);
		console.log(LIGHT + " ready");
	});
});

function write(high, low){
	var cb = function(err){
		if (err) console.log(err.toString());
	};
	var writeValue = function(pin, value){
		console.log("writing", pin, value);
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

module.exports.fwd = function(time, cb){
	clear();
	write([LEFT_FORWARD, RIGHT_FORWARD], [LEFT_BACK, RIGHT_BACK]);
	currentAction = setTimeout(function(){
		write([], [LEFT_FORWARD, RIGHT_FORWARD]);
		cb();
	},time);
};

module.exports.back = function(time, cb){
	clear();
	write([LEFT_BACK, RIGHT_BACK], [LEFT_FORWARD, RIGHT_FORWARD]);
	currentAction = setTimeout(function(){
		write([], [LEFT_BACK, RIGHT_BACK]);
		cb();
	},time);
};

module.exports.spinl = function(time, cb){
	clear();
	write([LEFT_BACK, RIGHT_FORWARD], [LEFT_FORWARD, RIGHT_BACK]);
	currentAction = setTimeout(function(){
		write([], [LEFT_BACK, RIGHT_FORWARD]);
		cb();
	},time);
}

module.exports.spinr = function(time, cb){
	clear();
	write([LEFT_FORWARD, RIGHT_BACK], [LEFT_BACK, RIGHT_FORWARD]);
	currentAction = setTimeout(function(){
		write([], [LEFT_FORWARD, RIGHT_BACK]);
		cb();
	},time);
}

module.exports.light = function(on, cb){
	if (on)	{
		write([LIGHT], []);
		return cb();
	}
	write([], [LIGHT]);
	cb();
}
