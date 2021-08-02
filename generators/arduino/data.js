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

goog.provide('Blockly.Arduino.data');

goog.require('Blockly.Arduino');


Blockly.Arduino['data_variable'] = function(block) {
  var varName = Blockly.Arduino.variableDB_.getName(block.getFieldValue('VARIABLE'),
      Blockly.Variables.NAME_TYPE);
  return [varName, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['data_setvariableto'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(block.getFieldValue('VARIABLE'),
      Blockly.Variables.NAME_TYPE);

  // Arg is a number
  if (parseFloat(arg0.slice(1, -1)) == arg0.slice(1, -1)) {
    arg0 = parseFloat(arg0.slice(1, -1)).toString();
  }
  return varName + ' = ' + arg0 + ';\n';
};

Blockly.Arduino['data_changevariableby'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(block.getFieldValue('VARIABLE'),
      Blockly.Variables.NAME_TYPE);

  return varName + ' += ' + arg0 + ';\n';
};

Blockly.Arduino['data_showvariable'] = function() {
  return '';
};

Blockly.Arduino['data_hidevariable'] = function() {
  return '';
};

Blockly.Arduino['data_listcontents'] = function() {
  return '';
};

Blockly.Arduino['data_listindexall'] = function() {
  return '';
};

Blockly.Arduino['data_listindexrandom'] = function() {
  return '';
};

Blockly.Arduino['data_addtolist'] = function() {
  return '';
};

Blockly.Arduino['data_deleteoflist'] = function() {
  return '';
};

Blockly.Arduino['data_deletealloflist'] = function() {
  return '';
};

Blockly.Arduino['data_insertatlist'] = function() {
  return '';
};

Blockly.Arduino['data_replaceitemoflist'] = function() {
  return '';
};

Blockly.Arduino['data_itemoflist'] = function() {
  return '';
};

Blockly.Arduino['data_itemnumoflist'] = function() {
  return '';
};

Blockly.Arduino['data_lengthoflist'] = function() {
  return '';
};

Blockly.Arduino['data_listcontainsitem'] = function() {
  return '';
};

Blockly.Arduino['data_showlist'] = function() {
  return '';
};

Blockly.Arduino['data_hidelist'] = function() {
  return '';
};
