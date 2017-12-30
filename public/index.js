

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
  // TODO: Assemble JavaScript into code variable.
  //console.log(statements_name);
  //var code = 'gpio_instructions;\n';
  //return code;
};

Blockly.Blocks['gpio_drive'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Drive")
			.appendField(new Blockly.FieldDropdown([["forward","fwd"], ["backward","back"], ["left","spinl"], ["right","spinr"]]), "MOVEMENT")
			.appendField(new Blockly.FieldNumber(0), "AMOUNT");
		this.setColour(105);
		this.setTooltip("");
		this.setPreviousStatement(true, null);
    	this.setNextStatement(true, null);
		this.setHelpUrl("");
	}
};

Blockly.JavaScript['gpio_drive'] = function(block) {
  var dropdown_movement = block.getFieldValue('MOVEMENT');
  var number_amount = block.getFieldValue('AMOUNT');
  // TODO: Assemble JavaScript into code variable.
  var code = 'actions.push({action:"drive", direction:"' + dropdown_movement + '", amount:' + number_amount + '});\n';
  return code;
};

Blockly.Blocks['gpio_light'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Light")
			.appendField(new Blockly.FieldDropdown([["on","1"], ["off","0"]]), "ONOFF")
		this.setColour(105);
		this.setTooltip("");
		this.setPreviousStatement(true, null);
    	this.setNextStatement(true, null);
		this.setHelpUrl("");
	}
};

Blockly.JavaScript['gpio_light'] = function(block) {
  var dropdown_movement = block.getFieldValue('ONOFF');
  // TODO: Assemble JavaScript into code variable.
  var code = 'actions.push({action:"drive", direction:"light", amount:' + dropdown_movement + '});\n';
  return code;
};

Blockly.Blocks['gpio_wait'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Wait")
        .appendField(new Blockly.FieldNumber(0), "NAME")
        .appendField("seconds");
    this.setColour(105);
	this.setTooltip("");
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
 	this.setHelpUrl("");
  }
};

Blockly.JavaScript['gpio_wait'] = function(block) {
  var number_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = 'actions.push({action:"wait", amount:' + number_name + '});\n';
  return code;
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

function xml(){
  var xml = Blockly.Xml.workspaceToDom(workspace);
  console.log(xml);
  var xml_text = Blockly.Xml.domToText(xml);
  console.log(xml_text);
}

var workspace = Blockly.inject('blocklyDiv', {
    media: 'media/',
    toolbox: "<xml></xml>"
});

  
workspace.registerButtonCallback("go", go);  
workspace.updateToolbox( document.getElementById('toolbox'));

function send(payload, cb){
  var req = new XMLHttpRequest();
  req.addEventListener("load", cb);
  req.open("POST", "");
  req.send(payload);
}