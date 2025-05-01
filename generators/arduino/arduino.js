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

goog.provide('Blockly.Arduino.arduino');

goog.require('Blockly.Arduino');


Blockly.Arduino['arduino_pin_setPinMode'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = block.getFieldValue('MODE') || 'INPUT';
  var code = "pinMode(" + arg0 + ", " + arg1 + ");\n";
  return code;
};

Blockly.Arduino['arduino_pin_setDigitalOutput'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'LEVEL', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 'LOW';
  var code = "digitalWrite(" + arg0 + ", " + arg1 + ");\n";
  return code;
};

Blockly.Arduino['arduino_pin_menu_level'] = function(block) {
  var code = block.getFieldValue('level') || 'LOW';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_pin_setPwmOutput'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var code = "analogWrite(" + arg0 + ", " + arg1 + ");\n";
  return code;
};

Blockly.Arduino['arduino_pin_readDigitalPin'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var code = "digitalRead(" + arg0 + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_pin_readAnalogPin'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || 'A1';
  var code = "analogRead(" + arg0 + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_pin_setServoOutput'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || 'A1';
  var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;

  Blockly.Arduino.includes_['include_servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['definitions_servo' + arg0] = 'Servo servo_' + arg0 + ';';
  Blockly.Arduino.setups_['setups_servo' + arg0] = 'servo_' + arg0 + '.attach' + '(' + arg0 + ', 544, 2400);';

  var code = 'servo_' + arg0 + '.write' + '(' + arg1 + ');\n';
  return code;
};

Blockly.Arduino['arduino_pin_attachInterrupt'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '2';
  var arg1 = block.getFieldValue('MODE') || 'RISING';

  var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);

  Blockly.Arduino.definitions_['definitions_ISR_' + arg1 + arg0] =
    'void ISR_' + arg1 + '_' + arg0 + '() {\n' + branch + '}';

  var code = 'attachInterrupt(digitalPinToInterrupt(' + arg0 + '), ISR_' + arg1 + '_' + arg0 + ', ' + arg1 + ');\n';
  return code;
};

Blockly.Arduino['arduino_pin_detachInterrupt'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '2';

  var code = 'detachInterrupt(digitalPinToInterrupt(' + arg0 + '));\n';
  return code;
};

Blockly.Arduino['arduino_serial_serialBegin'] = function(block) {
  var arg0 = block.getFieldValue('VALUE') || '9600';

  var code = 'Serial.begin(' + arg0 + ');\n';
  return code;
};

Blockly.Arduino['arduino_serial_serialPrint'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';
  var eol = block.getFieldValue('EOL') || 'warp';
  var code = '';
  if (eol === 'warp') {
    code = 'Serial.println(' + arg0 + ');\n';
  } else {
    code = 'Serial.print(' + arg0 + ');\n';
  }
  return code;
};

Blockly.Arduino['arduino_serial_serialAvailable'] = function() {
  var code = 'Serial.available()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino['arduino_serial_serialReadData'] = function() {
  var code = 'Serial.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_serial_multiSerialBegin'] = function(block) {
  var arg0 = block.getFieldValue('NO') || '0';
  var arg1 = block.getFieldValue('VALUE') || '9600';

  var code;
  if(arg0 === '0')
  {
    arg0 = '';
  }
  code = 'Serial' + arg0 + '.begin(' + arg1 + ');\n';
  return code;
};

Blockly.Arduino['arduino_serial_multiSerialPrint'] = function(block) {
  var arg0 = block.getFieldValue('NO') || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';
  var eol = block.getFieldValue('EOL') || 'warp';

  var code;
  if(arg0 === '0')
  {
    arg0 = '';
  }
  if (eol === 'warp') {
    code = 'Serial' + arg0 + '.println(' + arg1 + ');\n';
  } else {
    code = 'Serial' + arg0 + '.print(' + arg1 + ');\n';
  }
  return code;
};

Blockly.Arduino['arduino_serial_multiSerialAvailable'] = function(block) {
  var arg0 = block.getFieldValue('NO') || '0';
  var code;
  if(arg0 === '0')
  {
    arg0 = '';
  }

  var code = 'Serial' + arg0 + '.available()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino['arduino_serial_multiSerialReadAByte'] = function(block) {
  var arg0 = block.getFieldValue('NO') || '0';
  var code;
  if(arg0 === '0')
  {
    arg0 = '';
  }

  var code = 'Serial' + arg0 + '.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_data_dataMap'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg1 = Blockly.Arduino.valueToCode(block, 'ARG0', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 1;
  var arg2 = Blockly.Arduino.valueToCode(block, 'ARG1', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 100;
  var arg3 = Blockly.Arduino.valueToCode(block, 'ARG2', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 1;
  var arg4 = Blockly.Arduino.valueToCode(block, 'ARG3', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 1000;

  var code = 'map(' + arg0 + ', ' + arg1 + ', ' + arg2 + ', ' + arg3 + ', ' + arg4 + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_data_dataConstrain'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg1 = Blockly.Arduino.valueToCode(block, 'ARG0', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 1;
  var arg2 = Blockly.Arduino.valueToCode(block, 'ARG1', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 100;

  var code = 'constrain(' + arg0 + ', ' + arg1 + ', ' + arg2 + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_data_dataConvert'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg1 = block.getFieldValue('TYPE') || 'INTEGER';

  var code;

  switch(arg1) {
    case 'INTEGER':
      code = 'String(' + arg0 + ').toInt()';
      break;
    case 'DECIMAL':
      code = 'String(' + arg0 + ').toFloat()';
      break;
    case 'STRING':
      code = 'String(' + arg0 + ')';
      break;
  }

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_data_dataConvertASCIICharacter'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '0';

  var code = 'String(char(' + arg0 + '))';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_data_dataConvertASCIINumber'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '0';

  var code = 'toascii(String(' + arg0 + ')[0])';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_display_showImage'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '0';

  Blockly.Arduino.includes_['include_arduino_led_matrix'] = '#include <Arduino_LED_Matrix.h>';
  Blockly.Arduino.definitions_['definitions_arduino_led_matrix'] = "ArduinoLEDMatrix matrix;";
  Blockly.Arduino.setups_['setups_matrix_begin'] = "matrix.begin();";

  var hexArray = arg0.match(/.{32}/g).map(function(bin) {
    return "0x" + parseInt(bin, 2).toString(16).padStart(8, '0');
  });

  var code = 'matrix.loadFrame((const uint32_t[]){ ' + hexArray[0] + ', ' + hexArray[1] + ', ' + hexArray[2] + ' });\n';
  return code;
};

Blockly.Arduino['arduino_display_showImageUntil'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'TIME', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '0';

  Blockly.Arduino.includes_['include_arduino_led_matrix'] = '#include <Arduino_LED_Matrix.h>';
  Blockly.Arduino.definitions_['definitions_arduino_led_matrix'] = "ArduinoLEDMatrix matrix;";
  Blockly.Arduino.setups_['setups_matrix_begin'] = "matrix.begin();";

  var hexArray = arg0.match(/.{32}/g).map(function(bin) {
    return "0x" + parseInt(bin, 2).toString(16).padStart(8, '0');
  });

  var code = 'matrix.loadFrame((const uint32_t[]){ ' + hexArray[0] + ', ' + hexArray[1] + ', ' + hexArray[2] +
    ' });\ndelay(' + arg1 + ' * 1000);\nmatrix.clear();\n';
  return code;
};

Blockly.Arduino['arduino_display_showUntilScrollDone'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '0';

  Blockly.Arduino.includes_['include_arduino_graphics'] = '#include <ArduinoGraphics.h>';
  Blockly.Arduino.includes_['include_arduino_led_matrix'] = '#include <Arduino_LED_Matrix.h>';
  Blockly.Arduino.definitions_['definitions_arduino_led_matrix'] = "ArduinoLEDMatrix matrix;";
  Blockly.Arduino.setups_['setups_matrix_begin'] = "matrix.begin();";
  Blockly.Arduino.setups_['setups_matrix_text_font'] = "matrix.textFont(Font_4x6);";
  Blockly.Arduino.setups_['setups_matrix_text_pos'] = "matrix.beginText(0, 1, 0xFFFFFF);";
  Blockly.Arduino.setups_['setups_matrix_text_speed'] = "matrix.textScrollSpeed(100);";

  var code = 'matrix.println((const char[]){' + arg0 + '});\nmatrix.endText(SCROLL_LEFT);\n';
  return code;
};

Blockly.Arduino['arduino_display_clearDisplay'] = function() {
  Blockly.Arduino.includes_['include_arduino_led_matrix'] = '#include <Arduino_LED_Matrix.h>';
  Blockly.Arduino.definitions_['definitions_arduino_led_matrix'] = "ArduinoLEDMatrix matrix;";
  Blockly.Arduino.setups_['setups_matrix_begin'] = "matrix.begin();";

  var code = 'matrix.clear();\n';
  return code;
};

Blockly.Arduino['arduino_display_lightPixelAt'] = function(block) {
  var sta = block.getFieldValue('STATE');
  var x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '0';
  var y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '0';

  Blockly.Arduino.includes_['include_arduino_led_matrix'] = '#include <Arduino_LED_Matrix.h>';
  Blockly.Arduino.definitions_['definitions_arduino_led_matrix'] = "ArduinoLEDMatrix matrix;";
  Blockly.Arduino.definitions_['definitions_arduino_led_matrix_frame'] = "byte frame[8][12] = { 0 };";
  Blockly.Arduino.setups_['setups_matrix_begin'] = "matrix.begin();";

  var code = 'frame[' + x + '][' + y + '] = ' + sta + ';\nmatrix.renderBitmap(frame, 8, 12);\n';
  return code;
};


