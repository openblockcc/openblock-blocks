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

goog.provide('Blockly.Python.raspberrypico');

goog.require('Blockly.Python');

Blockly.Python['raspberrypico_RaspberryPico_whenraspberrypicobegin'] = function(block) {

  var code = '';
  return code;
};

//Pins

Blockly.Python['raspberrypico_pin_setPinMode'] = function(block) {
  Blockly.Python.imports_["raspberrypico_pin"] = "from machine import Pin";
  var pin = block.getFieldValue('PIN');
  var mode = block.getFieldValue('MODE');
  
  
var code = "Pin_" + pin + "=Pin(" + pin +", " + mode + ")\n";
  return code;
};

Blockly.Python['raspberrypico_pin_setDigitalOutput'] = function(block) {
  Blockly.Python.imports_["raspberrypico_pin"] = "from machine import Pin";
  var pin = block.getFieldValue('PIN');
  var level = block.getFieldValue('LEVEL');
  
  
var code = "Pin_" + pin + ".value(" + level + ")\n";
  return code;
};

Blockly.Python['raspberrypico_pin_setDigitalToggle'] = function(block) {
  Blockly.Python.imports_["raspberrypico_pin"] = "from machine import Pin";
  var pin = block.getFieldValue('PIN');  
  
var code = "Pin_" + pin + ".toggle()\n";
  return code;
};

Blockly.Python['raspberrypico_pin_setPwmOutput'] = function(block) {
  Blockly.Python.imports_["raspberrypico_pin"] = "from machine import Pin";
  Blockly.Python.imports_["raspberrypico_pwm"] = "from machine import PWM";
  var pin = block.getFieldValue('PIN');
  var out = Blockly.Python.valueToCode(block, 'OUT', Blockly.Python.ORDER_UNARY_POSTFIX);
  var freq = Blockly.Python.valueToCode(block, 'FREQ', Blockly.Python.ORDER_UNARY_POSTFIX);
  Blockly.Python.setups_["raspberrypico_pwm_"+pin] = "pwm_"+pin+" = PWM(Pin("+pin+"))";
  Blockly.Python.setups_["raspberrypico_freq_"+pin] = "pwm_"+pin+".freq("+freq+")";
 
  var code = "pwm_"+pin+".duty_u16(" + out + ")\n";
  return code;
};

Blockly.Python['raspberrypico_pin_readDigitalPin'] = function(block) {
  Blockly.Python.imports_["raspberrypico_pin"] = "from machine import Pin";
  
  var pin = block.getFieldValue('PIN') || '0';
  var code = "Pin_"+pin+".value()";
  
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['raspberrypico_pin_readAnalogPin'] = function(block) {
  Blockly.Python.imports_["raspberrypico_pin"] = "from machine import Pin";
  Blockly.Python.imports_["raspberrypico_adc"] = "from machine import ADC";
  var pin = block.getFieldValue('PIN') || '0';
  Blockly.Python.setups_["raspberrypico_adc_"+pin] = "adc_"+pin+" = ADC(Pin("+pin+"))";
  
  var code = "adc_"+pin+".read_u16()"
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['raspberrypico_console_consolePrint'] = function(block) {
  var msg = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_FUNCTION_CALL) || '';
  var code = "print(" + msg + ")\n";
  return code;
};
