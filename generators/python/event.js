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

goog.provide('Blockly.Python.event');

goog.require('Blockly.Python');


Blockly.Python['event_whenmicrobitbegin'] = function(block) {
  Blockly.Python.imports_["microbit"] = "from microbit import *";

  var code = "";
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (!nextBlock) {
    code += "pass\n";
  }

  return code;
};

Blockly.Python['event_whenmicrobitbuttonpressed'] = function(block) {
  Blockly.Python.imports_["microbit"] = "from microbit import *";

  var key = block.getFieldValue('KEY_OPTION');

  var i = '';
  while (Blockly.Python.loops_["event_whenmicrobitbegin" + key + i]) {
    if (i === '') {
      i = 1;
    } else {
      i++;
    }
  }

  Blockly.Python.loops_["event_whenmicrobitbegin" + key + i] = "if button_" + key + ".is_pressed():\n" +
    Blockly.Python.INDENT + Blockly.Python.INDENT + "on_button_" + key + i + "()";

  var code = "def on_button_" + key + i + "():\n";
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (!nextBlock) {
    code += Blockly.Python.INDENT + "pass\n";
  }

  return code;
};

Blockly.Python['event_whenmicrobitpinbeingtouched'] = function(block) {
  Blockly.Python.imports_["microbit"] = "from microbit import *";

  var pin = block.getFieldValue('PIN_OPTION');

  var i = '';
  while (Blockly.Python.loops_["event_whenmicrobitpinbeingtouched" + pin + i]) {
    if (i === '') {
      i = 1;
    } else {
      i++;
    }
  }

  Blockly.Python.loops_["event_whenmicrobitpinbeingtouched" + pin + i] = "if pin" + pin + ".is_pressed():\n" +
    Blockly.Python.INDENT + Blockly.Python.INDENT + "on_pin" + pin + i + "()";

  var code = "def on_pin" + pin + i + "():\n";
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (!nextBlock) {
    code += Blockly.Python.INDENT + "pass\n";
  }

  return code;
};

Blockly.Python['event_whenmicrobitgesture'] = function(block) {
  Blockly.Python.imports_["microbit"] = "from microbit import *";

  var sta = block.getFieldValue('GESTURE_OPTION');

  var i = '';
  while (Blockly.Python.loops_["event_whenmicrobitgesture" + sta + i]) {
    if (i === '') {
      i = 1;
    } else {
      i++;
    }
  }

  Blockly.Python.loops_["event_whenmicrobitgesture" + sta + i] = "if accelerometer.was_gesture('" + sta + "'):\n" +
    Blockly.Python.INDENT + Blockly.Python.INDENT + "on_" + sta + i + "()";

  var code = "def on_" + sta + i + "():\n";
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (!nextBlock) {
    code += Blockly.Python.INDENT + "pass\n";
  }

  return code;
};
