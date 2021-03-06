

Blockly.Blocks['gpio_instructions'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Instructions");
		this.appendStatementInput("NAME")
			.setCheck(null);
		this.setColour(230);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

Blockly.JavaScript['gpio_instructions'] = function(block) {
  return Blockly.JavaScript.statementToCode(block, 'NAME');
};

Blockly.Blocks['gpio_drive'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Drive")
			.appendField(new Blockly.FieldDropdown([["forward","fwd"], ["backward","back"], ["left","spinl"], ["right","spinr"]]), "MOVEMENT")
			.appendField(new Blockly.FieldNumber(0), "AMOUNT");
		this.setColour(90);
		this.setTooltip("");
		this.setPreviousStatement(true, null);
    	this.setNextStatement(true, null);
		this.setHelpUrl("");
	}
};

Blockly.JavaScript['gpio_drive'] = function(block) {
  var dropdown_movement = block.getFieldValue('MOVEMENT');
  var number_amount = block.getFieldValue('AMOUNT');
  var code = 'actions.push({action:"drive", direction:"' + dropdown_movement + '", amount:' + number_amount + '});\n';
  return code;
};

Blockly.Blocks['gpio_light'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Light")
			.appendField(new Blockly.FieldDropdown([["on","1"], ["off","0"]]), "ONOFF")
		this.setColour(45);
		this.setTooltip("");
		this.setPreviousStatement(true, null);
    	this.setNextStatement(true, null);
		this.setHelpUrl("");
	}
};

Blockly.JavaScript['gpio_light'] = function(block) {
  var dropdown_movement = block.getFieldValue('ONOFF');
  var code = 'actions.push({action:"drive", direction:"light", amount:' + dropdown_movement + '});\n';
  return code;
};


Blockly.Blocks['gpio_photo'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Photo")
		this.setColour(0);
		this.setTooltip("");
		this.setPreviousStatement(true, null);
    	this.setNextStatement(true, null);
		this.setHelpUrl("");
	}
};

Blockly.JavaScript['gpio_photo'] = function(block) {
  return 'actions.push({action:"photo"});\n';
};

Blockly.Blocks['gpio_wait'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Wait")
        .appendField(new Blockly.FieldNumber(0), "NAME")
    this.setColour(270);
	this.setTooltip("");
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
 	this.setHelpUrl("");
  }
};

Blockly.JavaScript['gpio_wait'] = function(block) {
  var number_name = block.getFieldValue('NAME');
  var code = 'actions.push({action:"wait", amount:' + number_name + '});\n';
  return code;
};

Blockly.Blocks['gpio_say'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Say")
        .appendField(new Blockly.FieldTextInput("Hello"), "MESSAGE");
    this.setColour(180);
	this.setTooltip("");
	this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
 	this.setHelpUrl("");
  }
};

Blockly.JavaScript['gpio_say'] = function(block) {
	var message = block.getFieldValue('MESSAGE');
  return 'actions.push({action:"say", message:"' + (message || "").replace(/"/g,'""') + '"});\n';
};


function go(){
  Blockly.JavaScript.addReservedWords('code');
  var code = Blockly.JavaScript.workspaceToCode(workspace);

  var actions = [];
  try {
    eval(code);
  } catch (e) {
    alert(e);
  }

  if (actions.length > 0){
    send(JSON.stringify(actions), function(){});
  }
}

function showPhoto(){
  window.open("/cam.jpg", '_blank');
}

var workspace = Blockly.inject('blocklyDiv', {
    media: 'media/',
    toolbox: "<xml></xml>"
});

workspace.registerButtonCallback("go", go);  
workspace.registerButtonCallback("photo", showPhoto);  
workspace.updateToolbox( document.getElementById('toolbox'));

function send(payload, cb){
  var req = new XMLHttpRequest();
  req.addEventListener("load", cb);
  req.open("POST", "");
  req.send(payload);
}