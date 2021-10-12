/**
 * Visual Blocks Language
 *
 * Copyright 2020 Ottawa STEM.
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

goog.provide('Blockly.Arduino.led');

goog.require('Blockly.Arduino');


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
