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
  Blockly.Arduino.setups_['setups_servo' + arg0] = 'servo_' + arg0 + '.attach' + '(' + arg0 + ');';

  var code = 'servo_' + arg0 + '.write' + '(' + arg1 + ');\n';
  return code;
};

Blockly.Arduino['arduino_pin_attachInterrupt'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '2';
  var arg1 = block.getFieldValue('MODE') || 'RISING';

  var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);

  Blockly.Arduino.definitions_['definitions_ISR_' + arg1 + arg0] =
    'ISR_' + arg1 + '_' + arg0 + '() {\n' + branch + '}';

  var code = 'attachInterrupt(digitalPinToInterrupt(' + arg0 + '), ISR_' + arg1 + '_' + arg0 + ', ' + arg1 + ');\n';
  return code;
};

Blockly.Arduino['arduino_pin_detachInterrupt'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '2';

  var code = 'detachInterrupt(digitalPinToInterrupt(' + arg0 + ');\n';
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

Blockly.Arduino['arduino_sensor_runningTime'] = function() {
  var code = "millis()";
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

// FastLED
Blockly.Arduino['arduino_fastled_setLEDNumber'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'NUMBER', Blockly.Arduino.ORDER_NONE) || 5;

  Blockly.Arduino.includes_['include_fastled'] = '#include <FastLED.h>';
  Blockly.Arduino.definitions_['definitions_fasled_setLEDNumber'] = 
      '#define NUM_LEDS    ' + arg0 + '\n' +
      'CRGB leds[NUM_LEDS];';
  Blockly.Arduino.setups_['setups_fastled_setLEDNumber'] = 'FastLED.addLeds<WS2813, 3, GRB>(leds, NUM_LEDS);\n';
  return '';
};

Blockly.Arduino['arduino_fastled_setBrightness'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'NUMBER', Blockly.Arduino.ORDER_NONE) || 10;
  var code = 'FastLED.setBrightness(' + arg0 + ');\n';
  return code;
};

Blockly.Arduino['arduino_fastled_setAllLEDColor'] = function(block) {
  var arg0 = block.getFieldValue('COLOR');

  var code = 'fill_solid(leds, NUM_LEDS, CRGB::' + arg0 + ');\n';
  code += 'FastLED.show();\n';
  return code;
};

Blockly.Arduino['arduino_fastled_setAllLEDColorRGB'] = function(block) {
  var red = Blockly.Arduino.valueToCode(block, 'RED', Blockly.Arduino.ORDER_NONE) || 255;
  var green = Blockly.Arduino.valueToCode(block, 'GREEN', Blockly.Arduino.ORDER_NONE) || 255;
  var blue = Blockly.Arduino.valueToCode(block, 'BLUE', Blockly.Arduino.ORDER_NONE) || 255;
  
  var code = 'fill_solid(leds, NUM_LEDS, CRGB(' + red + ', ' + green + ', ' + blue + '));\n';
  code += 'FastLED.show();\n';
  return code;
};

Blockly.Arduino['arduino_fastled_setAllLEDColorHSV'] = function(block) {
  const colour = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE).replace('#', '');
  const red = parseInt(colour.substring(0, 2), 16);
  const green = parseInt(colour.substring(2, 4), 16);
  const blue = parseInt(colour.substring(4, 6), 16);
  
  var code = 'fill_solid(leds, NUM_LEDS, CRGB(' + red + ', ' + green + ', ' + blue + '));\n';
  code += 'FastLED.show();\n';
  return code;
};

Blockly.Arduino['arduino_fastled_setLEDColorGradient'] = function(block) {
  var arg0 = block.getFieldValue('COLOR_FROM');
  var arg1 = block.getFieldValue('COLOR_TO');

  var code = 'fill_gradient_RGB(leds, NUM_LEDS, CRGB::' + arg0 + ', CRGB::' + arg1 + ');\n';
  code += 'FastLED.show();\n';
  return code;
};

Blockly.Arduino['arduino_fastled_setLEDColorRainbow'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'MILLISECOND', Blockly.Arduino.ORDER_NONE) || 1;
  
  Blockly.Arduino.definitions_['arduino_fastled_setLEDColorRainbow'] = 'float hue;'
  var code = 'for (int i = 0; i < NUM_LEDS; i++) {\n';
  code += '  leds[i] = CHSV(hue, 255, 255);\n';
  code += '}\n';
  code += 'EVERY_N_MILLISECONDS(' + arg0 + ') {\n';
  code += '  hue++;\n';
  code += '}\n';
  code += 'FastLED.show();\n';
  return code;
};

Blockly.Arduino['arduino_fastled_setLEDColor'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'NUMBER', Blockly.Arduino.ORDER_NONE);
  var arg1 = block.getFieldValue('COLOR');

  var code = 'leds[' + arg0 + '] = CRGB::' + arg1 + ';\n';
  code += 'FastLED.show();\n';
  return code;
};

Blockly.Arduino['arduino_fastled_setLEDColorRGB'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'NUMBER', Blockly.Arduino.ORDER_NONE) || 0;
  var red = Blockly.Arduino.valueToCode(block, 'RED', Blockly.Arduino.ORDER_NONE) || 255;
  var green = Blockly.Arduino.valueToCode(block, 'GREEN', Blockly.Arduino.ORDER_NONE) || 255;
  var blue = Blockly.Arduino.valueToCode(block, 'BLUE', Blockly.Arduino.ORDER_NONE) || 255;

  var code = 'leds[' + arg0 + '] = CRGB(' + red + ', ' + green + ', ' + blue + ');\n';
  code += 'FastLED.show();\n';
  return code;
};

Blockly.Arduino['arduino_fastled_setLEDColorHSV'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'NUMBER', Blockly.Arduino.ORDER_NONE) || 0;
  const colour = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE).replace('#', '');
  const red = parseInt(colour.substring(0, 2), 16);
  const green = parseInt(colour.substring(2, 4), 16);
  const blue = parseInt(colour.substring(4, 6), 16);

  var code = 'leds[' + arg0 + '] = CRGB(' + red + ', ' + green + ', ' + blue + ');\n';
  code += 'FastLED.show();\n';
  return code;
};

Blockly.Arduino['arduino_fastled_repeat'] = function(block) {
  var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);

  var code = 'for (int i = 0; i < NUM_LEDS; i++) {\n';
  code += branch;
  code += '}\n';
  return code;
};

Blockly.Arduino['arduino_fastled_repeat_n_ms'] = function(block) {
  var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);
  var arg0 = Blockly.Arduino.valueToCode(block, 'MILLISECOND', Blockly.Arduino.ORDER_NONE) || 0;

  var code = 'EVERY_N_MILLISECONDS(' + arg0 + ') {\n';
  code += branch;
  code += '}\n';
  return code;
};

Blockly.Arduino['arduino_fastled_repeat_n_s'] = function(block) {
  var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);
  var arg0 = Blockly.Arduino.valueToCode(block, 'SECOND', Blockly.Arduino.ORDER_NONE) || 0;

  var code = 'EVERY_N_SECONDS(' + arg0 + ') {\n';
  code += branch;
  code += '}\n';
  return code;
};

Blockly.Arduino['arduino_fastled_repeat_n_min'] = function(block) {
  var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);
  var arg0 = Blockly.Arduino.valueToCode(block, 'MINTUE', Blockly.Arduino.ORDER_NONE) || 0;

  var code = 'EVERY_N_MINTUES(' + arg0 + ') {\n';
  code += branch;
  code += '}\n';
  return code;
};

Blockly.Arduino['arduino_fastled_repeat_n_hour'] = function(block) {
  var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);
  var arg0 = Blockly.Arduino.valueToCode(block, 'HOUR', Blockly.Arduino.ORDER_NONE) || 0;

  var code = 'EVERY_N_HOURS(' + arg0 + ') {\n';
  code += branch;
  code += '}\n';
  return code;
};
