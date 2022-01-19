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

goog.provide('Blockly.Python.maixduino');

goog.require('Blockly.Python');

Blockly.Python['maixduino_Maixduino_whenmaixduinobegin'] = function(block) {

  var code = '';
  return code;
};

//Pins
Blockly.Python['maixduino_pin_setDigitalOutput'] = function(block) {
  Blockly.Python.imports_["maixduino_board"] = "from board import board_info";
  Blockly.Python.imports_["maixduino_pin"] = "from pin import Pin";
  var pin = block.getFieldValue('PIN');
  var level = block.getFieldValue('LEVEL');
  
  
var code = "Pin.digital_write(board_info.PIN" + pin + ", " + level + ")\n";
  return code;
};

Blockly.Python['maixduino_pin_initializePwm'] = function(block) {
	Blockly.Python.imports_["maixduino_board"] = "from board import board_info";
    Blockly.Python.imports_["maixduino_pin"] = "from pin import Pin";
	var pin = block.getFieldValue('PIN');
	var freq = Blockly.Python.valueToCode(block, 'FREQ', Blockly.Python.ORDER_UNARY_POSTFIX) || '0';
  var timer = block.getFieldValue('TIMER') || '0';


var code = "Pin.pwm_init(board_info.PIN" + pin + ", " + freq + ", "+ timer + ")\n";
  return code;
};

Blockly.Python['maixduino_pin_setPwmOutput'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var out = Blockly.Python.valueToCode(block, 'OUT', Blockly.Python.ORDER_UNARY_POSTFIX);
  
  Blockly.Python.imports_["maixduino_board"] = "from board import board_info";
  Blockly.Python.imports_["maixduino_pin"] = "from pin import Pin";


  var code = "Pinpwm_set(board_info.PIN" + pin + ", " + out + ")\n";
  return code;
};

Blockly.Python['maixduino_pin_readDigitalPin'] = function(block) {
  Blockly.Python.imports_["maixduino_board"] = "from board import board_info";
  Blockly.Python.imports_["maixduino_pin"] = "from pin import Pin";
  
  var pin = block.getFieldValue('PIN') || '0';
  var code = "Pin.digital_read(board_info.PIN" + pin + ")";
  
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['maixduino_pin_readAnalogPin'] = function(block) {
  Blockly.Python.imports_["maixduino_board"] = "from board import board_info";
  var pin = block.getFieldValue('PIN') || '0';
  var code = "Pin.analog_read(board_info.PIN" + pin + ")";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

//display
Blockly.Python['maixduino_display_initializeDisplay'] = function(block) {
  Blockly.Python.imports_["maixduino_display"] = "import lcd";	
  Blockly.Python.customFunctions_["hex_to_rgb"] = "def RGB888Format(r, g, b):\n" +
Blockly.Python.INDENT +
"n888Color = r<<16 | g<<8 | b\n" +
Blockly.Python.INDENT +
"cRed = (n888Color & 0x00ff0000) >> 19\n" +
Blockly.Python.INDENT +
"cGreen = (n888Color & 0x0000ff00) >> 10\n" +
Blockly.Python.INDENT +
"cBlue = (n888Color & 0x000000ff) >> 3\n" +
Blockly.Python.INDENT +
"n565Color = (cRed << 11) + (cGreen << 5) + (cBlue << 0)\n" +
Blockly.Python.INDENT +
"format = n565Color & 0xff\n" +
Blockly.Python.INDENT +
"format = format << 8;\n" +
Blockly.Python.INDENT +
"return format | ((n565Color >> 8) & 0xff);\n";
  var freq = Blockly.Python.valueToCode(block, 'FREQ', Blockly.Python.ORDER_ATOMIC) || '0';
  const colour = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_FUNCTION_CALL);
  const b_colour = colour.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
				 ,(m, r, g, b) => '#' + r + r + g + g + b + b)
		.substring(1).match(/.{2}/g)
		.map(x => parseInt(x, 16))
  var invert = block.getFieldValue('INVERT');

  var code = "lcd.init(freq=" + freq + ", color= RGB888Format(" + b_colour[0] + ", " + b_colour[1] + ", " + b_colour[2] + "), invert=" + invert + ")\n";
  return code;
};


Blockly.Python['maixduino_display_displayWords'] = function(block) {
  Blockly.Python.imports_["maixduino_display"] = "import lcd";
  Blockly.Python.customFunctions_["hex_to_rgb"] = "def RGB888Format(r, g, b):\n" +
Blockly.Python.INDENT +
"n888Color = r<<16 | g<<8 | b\n" +
Blockly.Python.INDENT +
"cRed = (n888Color & 0x00ff0000) >> 19\n" +
Blockly.Python.INDENT +
"cGreen = (n888Color & 0x0000ff00) >> 10\n" +
Blockly.Python.INDENT +
"cBlue = (n888Color & 0x000000ff) >> 3\n" +
Blockly.Python.INDENT +
"n565Color = (cRed << 11) + (cGreen << 5) + (cBlue << 0)\n" +
Blockly.Python.INDENT +
"format = n565Color & 0xff\n" +
Blockly.Python.INDENT +
"format = format << 8;\n" +
Blockly.Python.INDENT +
"return format | ((n565Color >> 8) & 0xff);\n";
  var arg0 = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_FUNCTION_CALL)
  var x_val = Blockly.Python.valueToCode(block, 'X_VALUE', Blockly.Python.ORDER_ATOMIC) || '0';
  var y_val = Blockly.Python.valueToCode(block, 'X_VALUE', Blockly.Python.ORDER_ATOMIC) || '0';
  const tcolour = Blockly.Python.valueToCode(block, 'T_COLOR', Blockly.Python.ORDER_FUNCTION_CALL);
  const colour = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_FUNCTION_CALL);
  
  const t_colour = tcolour.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
				 ,(m, r, g, b) => '#' + r + r + g + g + b + b)
		.substring(1).match(/.{2}/g)
		.map(x => parseInt(x, 16))

  const b_colour = colour.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
				 ,(m, r, g, b) => '#' + r + r + g + g + b + b)
		.substring(1).match(/.{2}/g)
		.map(x => parseInt(x, 16))

  var code = "lcd.draw_string(" + x_val + ", " + y_val + ", str(" + arg0 + "), RGB888Format(" + t_colour[0] + ", " + t_colour[1] + ", " + t_colour[2] + "), RGB888Format(" + b_colour[0] + ", " + b_colour[1] + ", " + b_colour[2] + "))\n";
  return code;
};

Blockly.Python['maixduino_display_displayImagePath'] = function(block) {
	Blockly.Python.imports_["maixduino_image"] = "import image";
	Blockly.Python.imports_["maixduino_display"] = "import lcd";
	var loc = Blockly.Python.valueToCode(block, 'PATH', Blockly.Python.ORDER_UNARY_POSTFIX)
var code = "lcd.display(image.Image("+ loc +"))\n";
return code;
};

Blockly.Python['maixduino_display_displayImage'] = function(block) {
	Blockly.Python.imports_["maixduino_image"] = "import image";
	Blockly.Python.imports_["maixduino_display"] = "import lcd";
	var img = Blockly.Python.valueToCode(block, 'IMAGE', Blockly.Python.ORDER_UNARY_POSTFIX).replace(/\'/g, "")
var code = "lcd.display("+ img +")\n";
return code;
};

Blockly.Python['maixduino_display_displayClear'] = function(block) {
	Blockly.Python.imports_["maixduino_display"] = "import lcd";
	Blockly.Python.customFunctions_["hex_to_rgb"] = "def RGB888Format(r, g, b):\n" +
Blockly.Python.INDENT +
"n888Color = r<<16 | g<<8 | b\n" +
Blockly.Python.INDENT +
"cRed = (n888Color & 0x00ff0000) >> 19\n" +
Blockly.Python.INDENT +
"cGreen = (n888Color & 0x0000ff00) >> 10\n" +
Blockly.Python.INDENT +
"cBlue = (n888Color & 0x000000ff) >> 3\n" +
Blockly.Python.INDENT +
"n565Color = (cRed << 11) + (cGreen << 5) + (cBlue << 0)\n" +
Blockly.Python.INDENT +
"format = n565Color & 0xff\n" +
Blockly.Python.INDENT +
"format = format << 8;\n" +
Blockly.Python.INDENT +
"return format | ((n565Color >> 8) & 0xff);\n";

	const colour = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_FUNCTION_CALL);
	const b_colour = colour.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
				 ,(m, r, g, b) => '#' + r + r + g + g + b + b)
		.substring(1).match(/.{2}/g)
		.map(x => parseInt(x, 16))
		
var code = "lcd.clear(RGB888Format("+ b_colour[0] + ", " + b_colour[1] + ", " + b_colour[2] +"))\n";
return code;
};

Blockly.Python['maixduino_display_displayRotate'] = function(block) {
	Blockly.Python.imports_["maixduino_display"] = "import lcd";
	var angle = block.getFieldValue('ANGLE')
var code = "lcd.rotation("+ angle +")\n";
return code;
};

Blockly.Python['maixduino_display_displayMirror'] = function(block) {
	Blockly.Python.imports_["maixduino_display"] = "import lcd";
	var value = block.getFieldValue('VALUE')
var code = "lcd.mirror("+ value +")\n";
return code;
};

Blockly.Python['maixduino_display_displayResolution'] = function(block) {
	Blockly.Python.imports_["maixduino_display"] = "import lcd";
var value = block.getFieldValue('DIM')
var code = "lcd."+ value +"()";
return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['maixduino_display_displayRGB888'] = function(block) {
	Blockly.Python.customFunctions_["hex_to_rgb"] = "def RGB888Format(r, g, b):\n" +
Blockly.Python.INDENT +
"n888Color = r<<16 | g<<8 | b\n" +
Blockly.Python.INDENT +
"cRed = (n888Color & 0x00ff0000) >> 19\n" +
Blockly.Python.INDENT +
"cGreen = (n888Color & 0x0000ff00) >> 10\n" +
Blockly.Python.INDENT +
"cBlue = (n888Color & 0x000000ff) >> 3\n" +
Blockly.Python.INDENT +
"n565Color = (cRed << 11) + (cGreen << 5) + (cBlue << 0)\n" +
Blockly.Python.INDENT +
"format = n565Color & 0xff\n" +
Blockly.Python.INDENT +
"format = format << 8;\n" +
Blockly.Python.INDENT +
"return format | ((n565Color >> 8) & 0xff);\n";

var red = Blockly.Python.valueToCode(block, 'RED', Blockly.Python.ORDER_ATOMIC)
var green = Blockly.Python.valueToCode(block, 'GREEN', Blockly.Python.ORDER_ATOMIC)
var blue = Blockly.Python.valueToCode(block, 'BLUE', Blockly.Python.ORDER_ATOMIC)
var code = "RGB888Format("+ red + ", " + green + ", " + blue +")";
return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['maixduino_display_displayColor'] = function(block) {
	Blockly.Python.customFunctions_["hex_to_rgb"] = "def RGB888Format(r, g, b):\n" +
Blockly.Python.INDENT +
"n888Color = r<<16 | g<<8 | b\n" +
Blockly.Python.INDENT +
"cRed = (n888Color & 0x00ff0000) >> 19\n" +
Blockly.Python.INDENT +
"cGreen = (n888Color & 0x0000ff00) >> 10\n" +
Blockly.Python.INDENT +
"cBlue = (n888Color & 0x000000ff) >> 3\n" +
Blockly.Python.INDENT +
"n565Color = (cRed << 11) + (cGreen << 5) + (cBlue << 0)\n" +
Blockly.Python.INDENT +
"format = n565Color & 0xff\n" +
Blockly.Python.INDENT +
"format = format << 8;\n" +
Blockly.Python.INDENT +
"return format | ((n565Color >> 8) & 0xff);\n";
const colour = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_FUNCTION_CALL);
const b_colour = colour.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
				 ,(m, r, g, b) => '#' + r + r + g + g + b + b)
		.substring(1).match(/.{2}/g)
		.map(x => parseInt(x, 16))
		
var code = "RGB888Format("+ b_colour[0] + ", " + b_colour[1] + ", " + b_colour[2] +")";
return [code,Blockly.Python.ORDER_ATOMIC];
};

// camera
Blockly.Python['maixduino_camera_cameraInit'] = function(block) {
	Blockly.Python.imports_["maixduino_camera"] = "import sensor";
	var camera = block.getFieldValue('CAMERA')
	var camcolor = block.getFieldValue('CAMCOLOR')
	var camsize = block.getFieldValue('CAMSIZE')
	Blockly.Python.customFunctions_["maixduino_cameraInit_1"] = "def camera_init(skipFrames, ss_enable):\n"
+ Blockly.Python.INDENT +
"sensor."
+ camera +
"()\n"
+ Blockly.Python.INDENT +
"sensor.set_pixformat(sensor."
+ camcolor +
")\n"
+ Blockly.Python.INDENT +
"sensor.set_framesize(sensor."
+ camsize +
")\n"+ Blockly.Python.INDENT + "sensor.skip_frames(skipFrames)\n"+ Blockly.Python.INDENT +"sensor.run(ss_enable)\n";
	
var code = "";
return code;
};

Blockly.Python['maixduino_camera_cameraInitSkipScreenshot'] = function(block) {
	Blockly.Python.imports_["maixduino_camera"] = "import sensor";
	var skip = Blockly.Python.valueToCode(block, 'SKIP', Blockly.Python.ORDER_ATOMIC);
	var value = block.getFieldValue('VALUE');
	
	var code = "camera_init(" + skip + ", " + value + ")\n";
	return code;
};

Blockly.Python['maixduino_camera_getImage'] = function(block) {
	Blockly.Python.imports_["maixduino_camera"] = "import sensor";
var code = "sensor.snapshot()";
return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['maixduino_camera_chooseCameraEye'] = function(block) {
	Blockly.Python.imports_["maixduino_camera"] = "import sensor";
	var eye = block.getFieldValue('EYE');
var code = "sensor.shutdown("+ eye +")\n";
return code;
};

Blockly.Python['maixduino_camera_cameraMirrorHorizontal'] = function(block) {
	Blockly.Python.imports_["maixduino_camera"] = "import sensor";
    var value = block.getFieldValue('VALUE');
var code = "sensor.set_hmirror("+ value +")\n";
return code;
};

Blockly.Python['maixduino_camera_cameraMirrorVertical'] = function(block) {
	Blockly.Python.imports_["maixduino_camera"] = "import sensor";
	var value = block.getFieldValue('VALUE');
var code = "sensor.set_vflip("+ value +")\n";
return code;
};

Blockly.Python['maixduino_camera_cameraColorfulStrips'] = function(block) {
	Blockly.Python.imports_["maixduino_camera"] = "import sensor";
var value = block.getFieldValue('VALUE');
var code = "sensor.set_colorbar("+ value +")\n";
return code;
};

Blockly.Python['maixduino_camera_cameraSetColorMode'] = function(block) {
	Blockly.Python.imports_["maixduino_camera"] = "import sensor";
var colormode = block.getFieldValue('COLORMODE');
var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC)
var code = "sensor.set_"+ colormode + "(" + value + ")\n";
return code;
};

Blockly.Python['maixduino_camera_cameraSetWindow'] = function(block) {
	Blockly.Python.imports_["maixduino_camera"] = "import sensor";
var width = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.Python.ORDER_ATOMIC)
var height = Blockly.Python.valueToCode(block, 'HEIGHT', Blockly.Python.ORDER_ATOMIC)
var code = "sensor.set_windowing((" + width + ", " + height + ")\n";
return code;
};

Blockly.Python['maixduino_camera_cameraGetDetails'] = function(block) {
	Blockly.Python.imports_["maixduino_camera"] = "import sensor";
	var details = block.getFieldValue('DETAILS');
var code = "sensor." + details + "()";
return [code,Blockly.Python.ORDER_ATOMIC];
};

//audio
Blockly.Python['maixduino_audio_audioPlay'] = function(block) {
	Blockly.Python.imports_["maixduino_audio"] = "from player import audio_player";
  var loc = Blockly.Python.valueToCode(block, 'LOC', Blockly.Python.ORDER_FUNCTION_CALL);
  var wait = block.getFieldValue('WAIT');
  var code = "audio_player.play(" + loc + ", " + wait + ")\n";
  return code;
};

Blockly.Python['maixduino_audio_audioVolume'] = function(block) {
	Blockly.Python.imports_["maixduino_audio"] = "from player import audio_player";
  var volume = Blockly.Python.valueToCode(block, 'VOLUME', Blockly.Python.ORDER_ATOMIC);
var code = "audio_player.volume(" + volume + ")\n";
  return code;
};

Blockly.Python['maixduino_audio_audioStatus'] = function(block) {
	Blockly.Python.imports_["maixduino_audio"] = "from player import audio_player";
var code = "audio_player.state()";
return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['maixduino_audio_audioRecord'] = function(block) {
	Blockly.Python.imports_["maixduino_audio"] = "from player import audio_player";
  var loc = Blockly.Python.valueToCode(block, 'LOC', Blockly.Python.ORDER_FUNCTION_CALL);
  var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
  var wait = block.getFieldValue('WAIT');
  var code = "audio_player.record(" + loc + ", " + value + ", " + wait + ")\n";
  return code;
};

//video

Blockly.Python['maixduino_video_videoPlay'] = function(block) {
	Blockly.Python.imports_["maixduino_video"] = "from player import video_player";
  var loc = Blockly.Python.valueToCode(block, 'LOC', Blockly.Python.ORDER_FUNCTION_CALL);
  var wait = block.getFieldValue('WAIT');
  var code = "video_player.play(" + loc + ", " + wait + ")\n";
  return code;
};

Blockly.Python['maixduino_video_videoVolume'] = function(block) {
	Blockly.Python.imports_["maixduino_video"] = "from player import video_player";
  var volume = Blockly.Python.valueToCode(block, 'VOLUME', Blockly.Python.ORDER_ATOMIC);
var code = "video_player.volume(" + volume + ")\n";
  return code;
};

Blockly.Python['maixduino_video_videoStatus'] = function(block) {
	Blockly.Python.imports_["maixduino_video"] = "from player import video_player";
var code = "video_player.state()";
return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['maixduino_video_videoRecord'] = function(block) {
	Blockly.Python.imports_["maixduino_video"] = "from player import video_player";
  var loc = Blockly.Python.valueToCode(block, 'LOC', Blockly.Python.ORDER_FUNCTION_CALL);
  var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
  var wait = block.getFieldValue('WAIT');
  var code = "video_player.record(" + loc + ", " + value + ", " + wait + ")\n";
  return code;
};

//system

Blockly.Python['maixduino_system_getExecutiveTime'] = function(block) {
	Blockly.Python.imports_["control_wait_ms"] = "import time";
	
	var begin = Blockly.Python.valueToCode(block, 'BEGIN', Blockly.Python.ORDER_ATOMIC);
	var end = Blockly.Python.valueToCode(block, 'END', Blockly.Python.ORDER_ATOMIC);
	
var code = "time.ticks_diff(" + begin + ", " + end + ")";
return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['maixduino_system_executeTime'] = function(block) {
	Blockly.Python.imports_["control_wait_ms"] = "import time";
	
	var time = block.getFieldValue('TIME');
	
var code = "time." + time + "()";
return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['maixduino_system_garbageCollection'] = function(block) {
	Blockly.Python.imports_["maixduino_gc"] = "import gc";
	
	var collection = block.getFieldValue('COLLECTION');
	
var code = "gc." + collection + "()\n";
return code;
};

Blockly.Python['maixduino_system_reset'] = function(block) {
	Blockly.Python.imports_["maixduino_machine"] = "import machine";
    var code = "machine.reset()\n";
return code;
};

Blockly.Python['maixduino_console_consolePrint'] = function(block) {
  var msg = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_FUNCTION_CALL) || '';
  var code = "print(" + msg + ")\n";
  return code;
};
