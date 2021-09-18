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

goog.provide('Blockly.Arduino.control');

goog.require('Blockly.Arduino');


Blockly.Arduino['control_wait'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'DURATION',
      Blockly.Arduino.ORDER_UNARY_POSTFIX);
  var code = "delay(" + arg0 + " * 1000" + ");\n";
  return code;
};

Blockly.Arduino['control_repeat'] = function(block) {
  var repeats = Blockly.Arduino.valueToCode(block, 'TIMES',
      Blockly.Arduino.ORDER_UNARY_POSTFIX);
  var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);

  var code = "for (int i = 0; i < " + repeats + "; i++) {\n";
  code += branch;
  code += "}\n";
  return code;
};

Blockly.Arduino['control_forever'] = function(block) {
  if (Blockly.Arduino.firstLoop && !block.getSurroundParent()) {
    Blockly.Arduino.firstLoop = false;

    var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
    branch = Blockly.Arduino.addLoopTrap(branch, block.id);
    var code = "}\n\n";
    code += "void loop() {\n";
    code += branch;
    code += Blockly.Arduino.INDENT + "repeat();\n";
    return code;
  } else {
    var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
    branch = Blockly.Arduino.addLoopTrap(branch, block.id);
    var code = "while (1) {\n";
    code += branch;
    code += Blockly.Arduino.INDENT + "repeat();\n}\n";
    return code;
  }
};

Blockly.Arduino['control_if'] = function(block) {
  var argument = Blockly.Arduino.valueToCode(block, 'CONDITION',
      Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);

  var code = "if (" + argument + ") {\n";
  code += branch;
  code += "}\n";
  return code;
};

Blockly.Arduino['control_if_else'] = function(block) {
  var argument = Blockly.Arduino.valueToCode(block, 'CONDITION',
      Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);
  var branch2 = Blockly.Arduino.statementToCode(block, 'SUBSTACK2');
  branch2 = Blockly.Arduino.addLoopTrap(branch2, block.id);

  var code = "if (" + argument + ") {\n";
  code += branch;
  code += "}\nelse{\n";
  code += branch2;
  code += "}\n";
  return code;
};

Blockly.Arduino['control_wait_until'] = function(block) {
  var argument = Blockly.Arduino.valueToCode(block, 'CONDITION',
      Blockly.Arduino.ORDER_UNARY_POSTFIX) || 'false';
  var code = "while (!" + argument + ") {\n";
  code += Blockly.Arduino.INDENT + "repeat();\n}\n";
  return code;
};

Blockly.Arduino['control_repeat_until'] = function(block) {
  var argument = Blockly.Arduino.valueToCode(block, 'CONDITION',
      Blockly.Arduino.ORDER_UNARY_POSTFIX) || 'false';

  var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);

  var code = "while (!" + argument + ") {\n";
  code += branch;
  code += Blockly.Arduino.INDENT + "repeat();\n}\n";
  return code;
};
