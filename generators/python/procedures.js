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

goog.provide('Blockly.Python.procedures');

goog.require('Blockly.Python');


Blockly.Python['procedures_definition'] = function(block) {
  var func = Blockly.Python.statementToCode(block, 'custom_block');

  // Delet first indent.
  func = func.slice(2);
  var code = func + ':\n';
  code = Blockly.Python.scrub_(block, code);
  if (code === "code") {
    code = "pass\n";
  }

  Blockly.Python.customFunctions_[func] = code;
  return null;
};

Blockly.Python['procedures_call'] = function(block) {
  // Generators can not automatic handle indefinite parameters. We should get
  // block.inputList and handle
  var funcName = block.getProcCode();
  funcName = funcName.replace(/ /g, '_');
  funcName = funcName.replace(/%n/g, 'N');
  funcName = funcName.replace(/%s/g, 'S');
  funcName = funcName.replace(/%b/g, 'B');
  funcName = Blockly.Python.variableDB_.getName(funcName, Blockly.Procedures.NAME_TYPE);

  var argCode = [];
  for (var x = 0; x < block.inputList.length; x++) {
    if (block.inputList[x].type == Blockly.INPUT_VALUE) {
      if (block.inputList[x].connection.targetBlock()) {
        var targetBlock = block.inputList[x].connection.targetBlock();
        var targetCode = Blockly.Python.blockToCode(targetBlock);
        argCode.push(targetCode[0]);
      }
      // If empty mean's it's a boolean
      else {
        argCode.push('false');
      }
    }
  }

  var code = funcName + '(' + argCode.join(', ') + ');\n';
  return code;
};

Blockly.Python['procedures_prototype'] = function(block) {
  var funcName = block.getProcCode();
  var argName = block.displayNames_;
  var argCode = [];

  funcName = funcName.replace(/ /g,'_');
  for (var i = 0; i < argName.length; i++) {
    var ch = funcName.charAt(funcName.indexOf('%') + 1);
    var safeArgName = Blockly.Python.variableDB_.getName(argName[i], Blockly.Procedures.NAME_TYPE);
    Blockly.Python.customFunctionsArgName_[argName[i]] = safeArgName;

    if (ch === 'n') {
      funcName = funcName.replace('%n', 'N');
      argCode.push(safeArgName);
    }
    else if (ch === 's') {
      funcName = funcName.replace('%s', 'S');
      argCode.push(safeArgName);
    }
    else {
      funcName = funcName.replace('%b', 'B');
      argCode.push(safeArgName);
    }
  }
  funcName = Blockly.Python.variableDB_.getName(funcName, Blockly.Procedures.NAME_TYPE);

  var code = 'def ' + funcName + '(' + argCode.join(', ') + ')';
  return code;
};

Blockly.Python['argument_reporter_boolean'] = function(block) {
  var argName = block.getFieldValue('VALUE');
  var safeArgName = Blockly.Python.customFunctionsArgName_[argName];
  return [safeArgName, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['argument_reporter_number'] = function(block) {
  var argName = block.getFieldValue('VALUE');
  var safeArgName = Blockly.Python.customFunctionsArgName_[argName];
  return [safeArgName, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['argument_reporter_string'] = function(block) {
  var argName = block.getFieldValue('VALUE');
  var safeArgName = Blockly.Python.customFunctionsArgName_[argName];
  return [safeArgName, Blockly.Python.ORDER_ATOMIC];
};
