/**
 * Visual Blocks Language
 *
 * Copyright 2021 Arthur Zheng.
 * https://github.com/ottawastem/scratch-arduino-blocks
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

goog.provide('Blockly.Python.operator');

goog.require('Blockly.Python');


Blockly.Python['operator_arithmetic'] = function(block) {
  var oplist = {
    operator_add: [' + ', Blockly.Python.ORDER_ADDITIVE],
    operator_subtract: [' - ', Blockly.Python.ORDER_ADDITIVE],
    operator_multiply: [' * ', Blockly.Python.ORDER_MULTIPLICATIVE],
    operator_divide: [' / ', Blockly.Python.ORDER_MULTIPLICATIVE]
  };
  var tuple = oplist[block.type];
  var op = tuple[0];
  var order = tuple[1];
  // Numeric value.
  var argument0 = Blockly.Python.valueToCode(block, 'NUM1', order) || '0';
  var argument1 = Blockly.Python.valueToCode(block, 'NUM2', order) || '0';
  var code = argument0 + op + argument1;
  return [code, order];
};

Blockly.Python['operator_add'] = Blockly.Python['operator_arithmetic'];
Blockly.Python['operator_subtract'] = Blockly.Python['operator_arithmetic'];
Blockly.Python['operator_multiply'] = Blockly.Python['operator_arithmetic'];
Blockly.Python['operator_divide'] = Blockly.Python['operator_arithmetic'];

Blockly.Python['operator_random'] = function(block) {
  var arg0 = Blockly.Python.valueToCode(block, 'FROM', Blockly.Python.ORDER_FUNCTION_CALL) || '0';
  var arg1 = Blockly.Python.valueToCode(block, 'TO', Blockly.Python.ORDER_FUNCTION_CALL) || '0';
  var code = "random.randint(" + arg0 + ", " + arg1 + ")";
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['operator_compare'] = function(block) {
  var oplist = {
    "operator_gt": " > ",
    "operator_equals": " == ",
    "operator_lt": " < "
  };
  var order = Blockly.Python.ORDER_RELATIONAL;
  var arg0 = Blockly.Python.valueToCode(block, 'OPERAND1', order);
  var arg1 = Blockly.Python.valueToCode(block, 'OPERAND2', order);

  // Arg is a empty string
  if (arg0 === "''") {
    arg0 = '0';
  }
  if (arg1 === "''") {
    arg1 = '0';
  }
  // Arg is a number
  if (parseFloat(arg0.slice(1, -1)) == arg0.slice(1, -1)) {
    arg0 = parseFloat(arg0.slice(1, -1)).toString();
  }
  if (parseFloat(arg1.slice(1, -1)) == arg1.slice(1, -1)) {
    arg1 = parseFloat(arg1.slice(1, -1)).toString();
  }

  var op = oplist[block.type];
  var code = arg0 + op + arg1;
  return [code, order];
};

Blockly.Python['operator_gt'] = Blockly.Python['operator_compare'];
Blockly.Python['operator_equals'] = Blockly.Python['operator_compare'];
Blockly.Python['operator_lt'] = Blockly.Python['operator_compare'];

Blockly.Python['operator_operation'] = function(block) {
  var oplist = {
    "operator_and": " and ",
    "operator_or": " or "
  };
  var order = (block.type == "operator_and") ? Blockly.Python.ORDER_LOGICAL_AND :
      Blockly.Python.ORDER_LOGICAL_OR;
  var arg0 = Blockly.Python.valueToCode(block, 'OPERAND1', order) || '0';
  var arg1 = Blockly.Python.valueToCode(block, 'OPERAND2', order) || '0';
  var op = oplist[block.type];
  var code = arg0 + op + arg1;
  return [code, order];
};

Blockly.Python['operator_and'] = Blockly.Python['operator_operation'];
Blockly.Python['operator_or'] = Blockly.Python['operator_operation'];

Blockly.Python['operator_not'] = function(block) {
  // Negation.
  var order = Blockly.Python.ORDER_LOGICAL_NOT;
  var arg0 = Blockly.Python.valueToCode(block, 'OPERAND', order) || 'false';
  var code = 'not ' + arg0;
  return [code, order];
};

Blockly.Python['operator_join'] = function(block) {
  var order = Blockly.Python.ORDER_UNARY_PREFIX;
  var arg0 = Blockly.Python.valueToCode(block, 'STRING1', order) || '\'\'';
  var arg1 = Blockly.Python.valueToCode(block, 'STRING2', order) || '\'\'';
  var code = 'str(' + arg0 + ') + str(' + arg1 + ')';
  return [code, Blockly.Python.ORDER_ADDITIVE];
};

Blockly.Python['operator_letter_of'] = function(block) {
  var arg0 = Blockly.Python.valueToCode(block, 'STRING', Blockly.Python.ORDER_UNARY_SIGN) || '\'\'';
  var arg1 = Blockly.Python.valueToCode(block, 'LETTER', Blockly.Python.ORDER_MEMBER) || '0';

  // Arg is a number
  if (parseFloat(arg1) == arg1) {
    arg1 = arg1 - 1;
  } else {
    arg1 = arg1 + ' - 1';
  }

  var code = arg0 + '[' + arg1 + ']';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['operator_length'] = function(block) {
  var arg0 = Blockly.Python.valueToCode(block, 'STRING', Blockly.Python.ORDER_FUNCTION_CALL) || '\'\'';
  var code = 'len(' + arg0 + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['operator_contains'] = function(block) {
  var order = Blockly.Python.ORDER_FUNCTION_CALL;
  var arg0 = Blockly.Python.valueToCode(block, 'STRING1', order) || '\'\'';
  var arg1 = Blockly.Python.valueToCode(block, 'STRING2', order) || '0';
  var code = 'str(' + arg0 + ').find(str(' + arg1 + ')) > -1';
  return [code, Blockly.Python.ORDER_RELATIONAL];
};

Blockly.Python['operator_mod'] = function(block) {
  var order = Blockly.Python.ORDER_MULTIPLICATIVE;
  var arg0 = Blockly.Python.valueToCode(block, 'NUM1', order) || '0';
  var arg1 = Blockly.Python.valueToCode(block, 'NUM2', order) || '0';
  var code = arg0 + ' % ' + arg1;
  return [code, order];
};

Blockly.Python['operator_round'] = function(block) {
  var order = Blockly.Python.ORDER_UNARY_POSTFIX;
  var arg0 = Blockly.Python.valueToCode(block, 'NUM', order) || '0';
  var code = 'round(' + arg0 + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['operator_mathop'] = function(block) {
  var mode = block.getFieldValue('OPERATOR');
  var arg0 = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_FUNCTION_CALL) || '0';

  Blockly.Python.imports_["math"] = "import math";

  var code = '';
  var order = Blockly.Python.ORDER_FUNCTION_CALL;

  switch (mode) {
    case 'abs':
      code = 'math.fabs(' + arg0 + ')';
      break;
    case 'floor':
      code = 'math.floor(' + arg0 + ')';
      break;
    case 'ceiling':
      code = 'math.ceil(' + arg0 + ')';
      break;
    case 'sqrt':
      code = 'math.sqrt(' + arg0 + ')';
      break;
    case 'sin':
      code = 'math.sin(' + arg0 + ' / 180.0 * math.pi)';
      break;
    case 'cos':
      code = 'math.cos(' + arg0 + ' / 180.0 * math.pi)';
      break;
    case 'tan':
      code = 'math.tan(' + arg0 + ' / 180.0 * math.pi)';
      break;
    case 'asin':
      code = 'math.asin(' + arg0 + ') / math.pi * 180';
      order = Blockly.Python.ORDER_MULTIPLICATIVE;
      break;
    case 'acos':
      code = 'math.acosh(' + arg0 + ') / math.pi * 180';
      order = Blockly.Python.ORDER_MULTIPLICATIVE;
      break;
    case 'atan':
      code = 'math.atan(' + arg0 + ') / math.pi * 180';
      order = Blockly.Python.ORDER_MULTIPLICATIVE;
      break;
    case 'ln':
      code = 'math.log(' + arg0 + ')';
      break;
    case 'log':
      code = 'math.log(' + arg0 + ', 10)';
      break;
    case 'e ^':
      code = 'math.exp(' + arg0 + ')';
      break;
    case '10 ^':
      code = 'math.pow(10, ' + arg0 + ')';
      break;
  }
  return [code, order];
};
