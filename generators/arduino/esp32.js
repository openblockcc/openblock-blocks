/**
 * Visual Blocks Language
 *
 * Copyright 2020 openblock.cc.
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

goog.provide('Blockly.Arduino.esp32');

goog.require('Blockly.Arduino');


Blockly.Arduino['arduino_pin_esp32SetPwmOutput'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;

  Blockly.Arduino.includes_['esp32SetPwmOutput'] = '#include <ESP32PWM.h>';
  Blockly.Arduino.definitions_['esp32SetPwmOutput' + arg0] = 'ESP32PWM pwm_' + arg0 + ';';
  Blockly.Arduino.setups_['esp32SetPwmOutput' + arg0] = 'pwm_' + arg0 + '.attachPin(' + arg0 + ', 490, 8);';

  // https://github.com/espressif/arduino-esp32/issues/11455
  // Due to this bug in esp32-arduino 3.x, we need to add a delay after attach before writing the duty.
  // Only one delay is needed, so delete and re-add it to ensure it is generated last.
  delete Blockly.Arduino.setups_['esp32LedcFix'];
  Blockly.Arduino.setups_['esp32LedcFix'] = 'delay(40);';

  var code = 'pwm_' + arg0 + '.write(' + arg1 + ');\n';
  return code;
};

Blockly.Arduino['arduino_pin_esp32SetDACOutput'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var code = 'dacWrite(' + arg0 + ', ' + arg1 + ');\n';
  return code;
};

Blockly.Arduino['arduino_pin_esp32ReadTouchPin'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var code = 'touchRead(' + arg0 + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_pin_esp32SetServoOutput'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;

  Blockly.Arduino.includes_['esp32SetServoOutput'] = '#include <ESP32Servo.h>';
  Blockly.Arduino.definitions_['esp32SetServoOutput' + arg0] = 'Servo servo_' + arg0 + ';';
  Blockly.Arduino.setups_['esp32SetServoOutput' + arg0] = 'servo_' + arg0 + '.attach' + '(' + arg0 + ');';

  delete Blockly.Arduino.setups_['esp32LedcFix'];
  Blockly.Arduino.setups_['esp32LedcFix'] = 'delay(40);';

  var code = 'servo_' + arg0 + '.write(' + arg1 + ');\n';
  return code;
};

Blockly.Arduino['arduino_pin_esp32AttachInterrupt'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = block.getFieldValue('MODE') || 'RISING';

  var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);

  Blockly.Arduino.definitions_['definitions_ISR_' + arg1 + arg0] =
    'void IRAM_ATTR ISR_' + arg1 + '_' + arg0 + '() {\n' + branch + '}';

  var code = 'attachInterrupt(' + arg0 + ', ISR_' + arg1 + '_' + arg0 + ', ' + arg1 + ');\n';
  return code;
};

Blockly.Arduino['arduino_pin_esp32DetachInterrupt'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';

  var code = 'detachInterrupt(' + arg0 + ');\n';
  return code;
};
