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

goog.provide('Blockly.Python.microbit');

goog.require('Blockly.Python');


Blockly.Python['python_pin_microbitSetDigitalOutput'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var level = Blockly.Python.valueToCode(block, 'LEVEL', Blockly.Python.ORDER_UNARY_POSTFIX) || 'LOW';

  var code = "pin" + pin + ".write_digital(" + level + ")\n";
  return code;
};

Blockly.Python['python_pin_menu_level'] = function(block) {
  var code = block.getFieldValue('level') || '0';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['python_pin_microbitSetPwmOutput'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var out = Blockly.Python.valueToCode(block, 'OUT', Blockly.Python.ORDER_UNARY_POSTFIX) || '0';

  var code = "pin" + pin + ".write_analog(" + out + ")\n";
  return code;
};

Blockly.Python['python_pin_microbitReadDigitalPin'] = function(block) {
  var pin = block.getFieldValue('PIN') || '0';
  var code = "pin" + pin + ".read_digital()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['python_pin_microbitReadAnalogPin'] = function(block) {
  var pin = block.getFieldValue('PIN') || '0';
  var code = "pin" + pin + ".read_analog()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['python_pin_microbitPinTouched'] = function(block) {
  var pin = block.getFieldValue('PIN') || '0';
  var code = "pin" + pin + ".is_touched()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['python_display_microbitShowImage'] = function(block) {
  var arg0 = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '0';

  arg0 = arg0.replace(/1/g, '9');
  arg0 = arg0.slice(0, 5) + ':' + arg0.slice(5, 10) + ':' + arg0.slice(10, 15)
    + ':' + arg0.slice(15, 20) + ':' + arg0.slice(20, 25);
  var code = "display.show(Image('" + arg0 + "'))\n";
  return code;
};

Blockly.Python['python_display_microbitShowImageUntil'] = function(block) {
  var arg0 = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '0';
  var arg1 = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_ATOMIC) || '0';

  arg0 = arg0.replace(/1/g, '9');
  arg0 = arg0.slice(0, 5) + ':' + arg0.slice(5, 10) + ':' + arg0.slice(10, 15)
    + ':' + arg0.slice(15, 20) + ':' + arg0.slice(20, 25);
  var code = "display.show(Image('" + arg0 + "'))\n" + "sleep(float(" + arg1 + ") * 1000)\n" + "display.clear()\n";
  return code;
};

Blockly.Python['python_display_microbitShow'] = function(block) {
  var arg0 = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_FUNCTION_CALL) || '';
  var code = "display.scroll(str(" + arg0 + "), wait=False, loop=False)\n";
  return code;
};

Blockly.Python['python_display_microbitShowUntilScrollDone'] = function(block) {
  var arg0 = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_FUNCTION_CALL) || '';
  var code = "display.scroll(str(" + arg0 + "), wait=True, loop=False)\n";
  return code;
};

Blockly.Python['python_display_microbitClearDisplay'] = function() {
  var code = "display.clear()\n";
  return code;
};

Blockly.Python['python_display_microbitLightPixelAt'] = function(block) {
  var sta = block.getFieldValue('STATE');
  var x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_FUNCTION_CALL) || '';
  var y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_FUNCTION_CALL) || '';

  if (sta === 'off') {
    sta = 0;
  } else {
    sta = 9;
  }

  var code = "display.set_pixel(int(" + x + "), int(" + y + "), " + sta + ")\n";
  return code;
};

Blockly.Python['python_display_microbitShowOnPiexlbrightness'] = function(block) {
  var brt = block.getFieldValue('BRT');
  var x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_FUNCTION_CALL) || '';
  var y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_FUNCTION_CALL) || '';

  var code = "display.set_pixel(int(" + x + "), int(" + y + "), " + brt + ")\n";
  return code;
};

Blockly.Python['python_sensor_menu_ledBrightness'] = function(block) {
  var code = block.getFieldValue('ledBrightness') || '0';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['python_sensor_microbitButtonIsPressed'] = function(block) {
  var key = block.getFieldValue('KEY');

  var code = "button_" + key + ".is_pressed()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['python_sensor_microbitGestureIsX'] = function(block) {
  var sta = block.getFieldValue('STA');

  var code = "accelerometer.is_gesture('" + sta + "')";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['python_sensor_microbitAxisAcceleration'] = function(block) {
  var axis = block.getFieldValue('AXIS');

  var code = "accelerometer.get_" + axis + "()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['python_sensor_microbitCompassAngle'] = function() {
  var code = "compass.heading()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['python_sensor_microbitCompassMagneticDensity'] = function() {
  var code = "compass.get_field_strength()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['python_sensor_microbitCalibrateCompass'] = function() {
  var code = "compass.calibrate()\n";
  return code;
};

Blockly.Python['python_sensor_microbitLightLevel'] = function() {
  var code = "display.read_light_level()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['python_sensor_microbitTemperature'] = function() {
  var code = "temperature()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['python_sensor_microbitRunningTime'] = function() {
  var code = "running_time()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['python_wireless_microbitOpenWirelessCommunication'] = function() {
  Blockly.Python.imports_["radio"] = "import radio";
  var code = "radio.on()\n";
  return code;
};

Blockly.Python['python_wireless_microbitCloseWirelessCommunication'] = function() {
  Blockly.Python.imports_["radio"] = "import radio";
  var code = "radio.off()\n";
  return code;
};

Blockly.Python['python_wireless_microbitResetWirelessCommunication'] = function() {
  Blockly.Python.imports_["radio"] = "import radio";
  var code = "radio.reset()\n";
  return code;
};

Blockly.Python['python_wireless_microbitSendWirelessMessage'] = function(block) {
  Blockly.Python.imports_["radio"] = "import radio";

  var msg = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_FUNCTION_CALL) || '';
  var code = "radio.send(str(" + msg + "))\n";
  return code;
};

Blockly.Python['python_wireless_microbitReceiveWirelessMessage'] = function() {
  Blockly.Python.imports_["radio"] = "import radio";
  var code = "radio.receive()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['python_wireless_microbitSetWirelessCommunicationChannel'] = function(block) {
  Blockly.Python.imports_["radio"] = "import radio";

  var ch = block.getFieldValue('CH');
  var code = "radio.config(channel = " + ch + ")\n";
  return code;
};

Blockly.Python['python_console_microbitConsolePrint'] = function(block) {
  var msg = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_FUNCTION_CALL) || '';
  var code = "print(" + msg + ")\n";
  return code;
};
