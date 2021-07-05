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

goog.provide('Blockly.Python.math');

goog.require('Blockly.Python');


Blockly.Python['math_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  if (isNaN(code)) {
    code = 0;
  }
  // -4.abs() returns -4 in Dart due to strange order of operation choices.
  // -4 is actually an operator and a number.  Reflect this in the order.
  var order = code < 0 ?
    Blockly.Python.ORDER_UNARY_SIGN : Blockly.Python.ORDER_ATOMIC;
  return [code, order];
};

Blockly.Python['math_integer'] = Blockly.Python['math_number'];
Blockly.Python['math_whole_number'] = Blockly.Python['math_number'];
Blockly.Python['math_positive_number'] = Blockly.Python['math_number'];
Blockly.Python['math_angle'] = Blockly.Python['math_number'];

Blockly.Python['math_int8_number'] = Blockly.Python['math_number'];
Blockly.Python['math_uint8_number'] = Blockly.Python['math_number'];
Blockly.Python['math_int9_number'] = Blockly.Python['math_number'];
Blockly.Python['math_uint10_number'] = Blockly.Python['math_number'];
Blockly.Python['math_int11_number'] = Blockly.Python['math_number'];
