/**
 * Visual Blocks Language
 *
 * Copyright 2021 Arthur Zheng.
 * https://github.com/openblockcc/openblock-blocks
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

goog.provide('Blockly.Python.control');

goog.require('Blockly.Python');


Blockly.Python['control_wait_ms'] = function(block) {
	Blockly.Python.imports_["control_wait_ms"] = "import time";
  var arg0 = Blockly.Python.valueToCode(block, 'DURATION',
      Blockly.Python.ORDER_FUNCTION_CALL);
  var arg1 = block.getFieldValue('WAIT_MENU');
  var code = "time." + arg1 + "(" + arg0 +")\n";
  return code;
};

Blockly.Python['control_repeat'] = function(block) {
  var repeats = Blockly.Python.valueToCode(block, 'TIMES',
      Blockly.Python.ORDER_FUNCTION_CALL);
  var branch = Blockly.Python.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Python.addLoopTrap(branch, block.id);

  var code = "for count in range(" + repeats + "):\n";
  if (branch) {
    code += branch;
  } else {
    code += Blockly.Python.INDENT + "pass\n";
  }
  return code;
};

Blockly.Python['control_forever'] = function(block) {
  var branch = Blockly.Python.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Python.addLoopTrap(branch, block.id);

  if (block.getRootBlock().type === 'microbit_Microbit__whenmicrobitbegin' || 
  block.getRootBlock().type === 'maixduino_Maixduino__whenmaixduinobegin' || 
  block.getRootBlock().type === 'raspberrypico_RaspberryPico__whenraspberrypicobegin' ) {
    Blockly.Python.firstLoop = false;
  }

  var code = "while True:\n";
  code += branch;
  code += Blockly.Python.INDENT + "repeat()\n";
  return code;
};

Blockly.Python['control_if'] = function(block) {
  var argument = Blockly.Python.valueToCode(block, 'CONDITION',
      Blockly.Python.ORDER_NONE) || 'False';
  var branch = Blockly.Python.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Python.addLoopTrap(branch, block.id);

  var code = "if " + argument + ":\n";
  if (branch) {
    code += branch;
  } else {
    code += Blockly.Python.INDENT + "pass\n";
  }
  return code;
};

Blockly.Python['control_if_else'] = function(block) {
  var argument = Blockly.Python.valueToCode(block, 'CONDITION',
      Blockly.Python.ORDER_NONE) || 'False';
  var branch = Blockly.Python.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Python.addLoopTrap(branch, block.id);
  var branch2 = Blockly.Python.statementToCode(block, 'SUBSTACK2');
  branch2 = Blockly.Python.addLoopTrap(branch2, block.id);

  var code = "if " + argument + ":\n";
  if (branch) {
    code += branch;
  } else {
    code += Blockly.Python.INDENT + "pass\n";
  }
  code += "else:\n";
  if (branch2) {
    code += branch2;
  } else {
    code += Blockly.Python.INDENT + "pass\n";
  }
  return code;
};

Blockly.Python['control_wait_until'] = function(block) {
  var argument = Blockly.Python.valueToCode(block, 'CONDITION',
      Blockly.Python.ORDER_UNARY_POSTFIX) || 'False';
  var code = "while not " + argument + ":\n";
  code += Blockly.Python.INDENT + "repeat()\n";
  return code;
};

Blockly.Python['control_repeat_until'] = function(block) {
  var argument = Blockly.Python.valueToCode(block, 'CONDITION',
      Blockly.Python.ORDER_UNARY_POSTFIX) || 'False';

  var branch = Blockly.Python.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Python.addLoopTrap(branch, block.id);

  var code = "while not " + argument + ":\n";
  code += branch;
  code += Blockly.Python.INDENT + "repeat()\n";
  return code;
};
