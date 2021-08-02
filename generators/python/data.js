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

goog.provide('Blockly.Python.data');

goog.require('Blockly.Python');


Blockly.Python['data_variable'] = function(block) {
  var varName = Blockly.Python.variableDB_.getName(block.getFieldValue('VARIABLE'),
      Blockly.Variables.NAME_TYPE);
  return [varName, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['data_setvariableto'] = function(block) {
  var arg0 = Blockly.Python.valueToCode(block, 'VALUE',
      Blockly.Python.ORDER_ADDITIVE) || '0';
  var varName = Blockly.Python.variableDB_.getName(block.getFieldValue('VARIABLE'),
      Blockly.Variables.NAME_TYPE);

  // Arg is a number
  if (parseFloat(arg0.slice(1, -1)) == arg0.slice(1, -1)) {
    arg0 = parseFloat(arg0.slice(1, -1)).toString();
  }
  return varName + ' = ' + arg0 + '\n';
};

Blockly.Python['data_changevariableby'] = function(block) {
  var arg0 = Blockly.Python.valueToCode(block, 'VALUE',
      Blockly.Python.ORDER_ADDITIVE) || '0';
  var varName = Blockly.Python.variableDB_.getName(block.getFieldValue('VARIABLE'),
      Blockly.Variables.NAME_TYPE);

  // Arg is a number
  if (parseFloat(arg0.slice(1, -1)) == arg0.slice(1, -1)) {
    arg0 = parseFloat(arg0.slice(1, -1)).toString();
  }
  return varName + ' += ' + arg0 + '\n';
};

Blockly.Python['data_showvariable'] = function() {
  return '';
};

Blockly.Python['data_hidevariable'] = function() {
  return '';
};

Blockly.Python['data_listcontents'] = function() {
  return '';
};

Blockly.Python['data_listindexall'] = function() {
  return '';
};

Blockly.Python['data_listindexrandom'] = function() {
  return '';
};

Blockly.Python['data_addtolist'] = function() {
  return '';
};

Blockly.Python['data_deleteoflist'] = function() {
  return '';
};

Blockly.Python['data_deletealloflist'] = function() {
  return '';
};

Blockly.Python['data_insertatlist'] = function() {
  return '';
};

Blockly.Python['data_replaceitemoflist'] = function() {
  return '';
};

Blockly.Python['data_itemoflist'] = function() {
  return '';
};

Blockly.Python['data_itemnumoflist'] = function() {
  return '';
};

Blockly.Python['data_lengthoflist'] = function() {
  return '';
};

Blockly.Python['data_listcontainsitem'] = function() {
  return '';
};

Blockly.Python['data_showlist'] = function() {
  return '';
};

Blockly.Python['data_hidelist'] = function() {
  return '';
};

