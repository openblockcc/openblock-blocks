/**
 * Visual Blocks Language
 *
 * Copyright 2020 Arthur Zheng.
 * https://github.com/zhengyangliu/scratch-blocks
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

goog.provide('Blockly.Arduino.operator');

goog.require('Blockly.Arduino');


Blockly.Arduino['operator_arithmetic'] = function(block) {
  var oplist = {
    operator_add: [' + ', Blockly.Arduino.ORDER_ADDITIVE],
    operator_subtract: [' - ', Blockly.Arduino.ORDER_ADDITIVE],
    operator_multiply: [' * ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
    operator_divide: [' / ', Blockly.Arduino.ORDER_MULTIPLICATIVE]
  };
  var tuple = oplist[block.type];
  var op = tuple[0];
  var order = tuple[1];
  // Numeric value.
  var argument0 = Blockly.Arduino.valueToCode(block, 'NUM1', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'NUM2', order) || '0';
  var code = argument0 + op + argument1;
  return [code, order];
};

Blockly.Arduino['operator_add'] = Blockly.Arduino['operator_arithmetic'];
Blockly.Arduino['operator_subtract'] = Blockly.Arduino['operator_arithmetic'];
Blockly.Arduino['operator_multiply'] = Blockly.Arduino['operator_arithmetic'];
Blockly.Arduino['operator_divide'] = Blockly.Arduino['operator_arithmetic'];

Blockly.Arduino['operator_random'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'FROM', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'TO', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '0';
  var code = "random(" + arg0 + ", " + arg1 + ")";
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino['operator_compare'] = function(block) {
  var oplist = {
    "operator_gt": " > ",
    "operator_equals": " == ",
    "operator_lt": " < "
  };
  var order = (block.type == "operator_equals") ?
    Blockly.Arduino.ORDER_EQUALITY : Blockly.Arduino.ORDER_RELATIONAL;
  var arg0 = Blockly.Arduino.valueToCode(block, 'OPERAND1', order);
  var arg1 = Blockly.Arduino.valueToCode(block, 'OPERAND2', order);

 if (parseFloat(arg0.slice(1, -1)) == arg0.slice(1, -1)) { // Arg is a number
    arg0 = parseFloat(arg0.slice(1, -1)).toString();
  } else if (arg0 === "\"\"") { // Arg is a empty string
    arg0 = '0';
  } else if (arg0.charAt(0) === '"' && arg0.charAt(arg0.length - 1) === '"') {
    if (arg0.length === 3) { // Arg is a single character
      arg0 = arg0.replace(/"/g, '\'');
    }else if(arg0.length === 7 && arg0.charAt(1) === '\\' && arg0.charAt(arg0.length - 2) === '\''){
	  arg0 = arg0.replace(/'/g, '');
	  arg0 = arg0.replace(/\\/g, '');
	  arg0 = arg0.replace(/"/g, '\'');
	}else if(arg0.charAt(1) === '"' && arg0.charAt(arg0.length - 2) === '"'){
	  arg0 = arg0.replace(/"/g, '');
	  arg0 = 'String("' + arg0 + '")';
	} 
	else { // Arg is a string
      arg0 = 'String(' + arg0 + ')'; 
    }
  }
  if (parseFloat(arg1.slice(1, -1)) == arg1.slice(1, -1)) {
    arg1 = parseFloat(arg1.slice(1, -1)).toString();
  } else if (arg1 === "\"\"") {
    arg1 = '0';
  } else if (arg1.charAt(0) === '"' && arg1.charAt(arg1.length - 1) === '"') {
    if (arg1.length === 3) {
      arg1 = arg1.replace(/"/g, '\'');
    }else if(arg1.length === 7 && arg1.charAt(1) === '\\' && arg1.charAt(arg1.length - 2) === '\''){
	  arg1 = arg1.replace(/'/g, '');//arg is a number in single quotes
	  arg1 = arg1.replace(/\\/g, '');
	  arg1 = arg1.replace(/"/g, '\'');
	}else if(arg1.charAt(1) === '"' && arg1.charAt(arg1.length - 2) === '"'){
	  arg1 = arg1.replace(/"/g, '');//arg is a number in double quotes
	  arg1 = 'String("' + arg1 + '")';
	}
	else {
      arg1 = 'String(' + arg1 + ')';
    }
  } 

  var op = oplist[block.type];
  var code = arg0 + op + arg1; 
  return [code, order];
};

Blockly.Arduino['operator_gt'] = Blockly.Arduino['operator_compare'];
Blockly.Arduino['operator_equals'] = Blockly.Arduino['operator_compare'];
Blockly.Arduino['operator_lt'] = Blockly.Arduino['operator_compare'];

Blockly.Arduino['operator_operation'] = function(block) {
  var oplist = {
    "operator_and": " && ",
    "operator_or": " || "
  };
  var order = (block.type == "operator_and") ? Blockly.Arduino.ORDER_LOGICAL_AND :
      Blockly.Arduino.ORDER_LOGICAL_OR;
  var arg0 = Blockly.Arduino.valueToCode(block, 'OPERAND1', order) || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'OPERAND2', order) || '0';
  var op = oplist[block.type];
  var code = arg0 + op + arg1;
  return [code, order];
};

Blockly.Arduino['operator_and'] = Blockly.Arduino['operator_operation'];
Blockly.Arduino['operator_or'] = Blockly.Arduino['operator_operation'];

Blockly.Arduino['operator_not'] = function(block) {
  // Negation.
  var order = Blockly.Arduino.ORDER_UNARY_PREFIX;
  var arg0 = Blockly.Arduino.valueToCode(block, 'OPERAND', order) || 'false';
  var code = '!' + arg0;
  return [code, order];
};

Blockly.Arduino['operator_join'] = function(block) {
  var order = Blockly.Arduino.ORDER_UNARY_PREFIX;
  var arg0 = Blockly.Arduino.valueToCode(block, 'STRING1', order) || '\'\'';
  var arg1 = Blockly.Arduino.valueToCode(block, 'STRING2', order) || '\'\'';
  var code = 'String(' + arg0 + ') + String(' + arg1 + ')';
  return [code, Blockly.Arduino.ORDER_ADDITIVE];
};

Blockly.Arduino['operator_letter_of'] = function(block) {
  var order = Blockly.Arduino.ORDER_UNARY_PREFIX;
  var arg0 = Blockly.Arduino.valueToCode(block, 'STRING', order) || '\'\'';
  var arg1 = Blockly.Arduino.valueToCode(block, 'LETTER', order) || '0';

  // Arg is a number
  if (parseFloat(arg1) == arg1) {
    arg1 = arg1 - 1;
  } else {
    arg1 = arg1 + ' - 1';
  }

  var code = 'String(' + arg0 + ').charAt(' + arg1 + ')';
  return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['operator_length'] = function(block) {
  var order = Blockly.Arduino.ORDER_UNARY_PREFIX;
  var arg0 = Blockly.Arduino.valueToCode(block, 'STRING', order) || '\'\'';
  var code = 'String(' + arg0 + ').length()';
  return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['operator_contains'] = function(block) {
  var order = Blockly.Arduino.ORDER_UNARY_PREFIX;
  var arg0 = Blockly.Arduino.valueToCode(block, 'STRING1', order) || '\'\'';
  var arg1 = Blockly.Arduino.valueToCode(block, 'STRING2', order) || '0';
  var code = 'String(' + arg0 + ').indexOf(String(' + arg1 + '))';
  return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['operator_mod'] = function(block) {
  var order = Blockly.Arduino.ORDER_MULTIPLICATIVE;
  var arg0 = Blockly.Arduino.valueToCode(block, 'NUM1', order) || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'NUM2', order) || '0';
  var code = arg0 + ' % ' + arg1;
  return [code, order];
};

Blockly.Arduino['operator_round'] = function(block) {
  var order = Blockly.Arduino.ORDER_UNARY_POSTFIX;
  var arg0 = Blockly.Arduino.valueToCode(block, 'NUM', order) || '0';
  var code = 'round(' + arg0 + ')';
  return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['operator_mathop'] = function(block) {
  var order = Blockly.Arduino.ORDER_UNARY_POSTFIX;
  var mode = block.getFieldValue('OPERATOR');
  var arg0 = Blockly.Arduino.valueToCode(block, 'NUM', order) || '0';
  var code = '';
  order = Blockly.Arduino.ORDER_NONE;
  switch (mode) {
    case 'abs':
      code = 'abs(' + arg0 + ')';
      break;
    case 'floor':
      code = 'floor(' + arg0 + ')';
      break;
    case 'ceiling':
      code = 'ceil(' + arg0 + ')';
      break;
    case 'sqrt':
      code = 'sqrt(' + arg0 + ')';
      break;
    case 'sin':
      code = 'sin(' + arg0 + ' / 180.0 * PI)';
      break;
    case 'cos':
      code = 'cos(' + arg0 + ' / 180.0 * PI)';
      break;
    case 'tan':
      code = 'tan(' + arg0 + ' / 180.0 * PI)';
      break;
    case 'asin':
      code = 'asin(' + arg0 + ') / PI * 180';
      order = Blockly.Arduino.ORDER_MULTIPLICATIVE;
      break;
    case 'acos':
      code = 'acos(' + arg0 + ') / PI * 180';
      order = Blockly.Arduino.ORDER_MULTIPLICATIVE;
      break;
    case 'atan':
      code = 'atan(' + arg0 + ') / PI * 180';
      order = Blockly.Arduino.ORDER_MULTIPLICATIVE;
      break;
    case 'ln':
      code = 'log(' + arg0 + ')';
      break;
    case 'log':
      code = 'log10(' + arg0 + ')';
      break;
    case 'e ^':
      code = 'exp(' + arg0 + ')';
      break;
    case '10 ^':
      code = 'pow(10, ' + arg0 + ')';
      break;
  }
  return [code, order];
};
