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

goog.provide('Blockly.Arduino.ottorobot');

goog.require('Blockly.Arduino');


Blockly.Arduino['arduino_ottoRobot_setInitial'] = function(block) {
    Blockly.Arduino.includes_['include_ottoRobot'] = '#include <Otto.h>\nOtto Otto;';
    Blockly.Arduino.definitions_['definitions_ottoRobot_setInitial'] = 
    '#define PIN_LEG_L           4   // Left leg servo\n' +
    '#define PIN_LEG_R           5   // Right leg servo\n' +
    '#define PIN_FOOT_L          6   // Left foot servo\n' +
    '#define PIN_FOOT_R          7   // Right foot servo\n' +
    '#define PIN_TRIGGER         8   // TRIGGER PIN (8)\n' +
    '#define PIN_ECHO            9   // ECHO PIN (9)\n' +
    '#define PIN_BUZZER          13  // BUZZER PIN (13)\n';
    Blockly.Arduino.setups_['setups_ottoRobot_setInitial'] = 
        'Otto.init(PIN_LEG_L, PIN_LEG_R, PIN_FOOT_L, PIN_FOOT_R, true, PIN_BUZZER);\n' +
        '  Otto.sing(S_connection);   // Otto wake up!\n' +
        '  delay(50);\n' +
        '  Otto.playGesture(OttoHappy);\n' +
        '  Otto.home();';

    return '';
};

Blockly.Arduino['arduino_ottoRobot_setHome'] = function(block) {
    var code = 'Otto.home();\n';
    return code;
};

Blockly.Arduino['arduino_ottoRobot_setGesture'] = function(block) {
    var arg0 = block.getFieldValue('GESTURE');

    var code = '';
    code = 'Otto.playGesture(' + arg0 + ');\n';
    return code;
};

Blockly.Arduino['arduino_ottoRobot_setPlaySound'] = function(block) {
    var arg0 = block.getFieldValue('SOUND');

    var code = '';
    code = 'Otto.sing(' + arg0 + ');\n';
    return code;
};

Blockly.Arduino['arduino_ottoRobot_setDance'] = function(block) {
    var arg0 = block.getFieldValue('DANCE');

    var dance_function = '';
    var code = '';
    if (arg0 == 'Feeling Good') {
        dance_function = 'void feeling_good() {\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.moonwalker(1, 1000, 30, 1);\n' +
            '  Otto.moonwalker(1, 1000, 30, -1);\n' +
            '  Otto.moonwalker(1, 1000, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  Otto.home();\n' +
            '  Otto.ascendingTurn(8, 870, 30);\n' +
            '  Otto.home();\n' +
            '  Otto.jitter(8, 900, 30);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  Otto.home();\n' +
            '  Otto.ascendingTurn(8, 870, 30);\n' +
            '  Otto.home();\n' +
            '  Otto.jitter(8, 900, 30);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  Otto.home();\n' +
            '  Otto.ascendingTurn(8, 870, 30);\n' +
            '  Otto.home();\n' +
            '  Otto.jitter(8, 900, 30);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.updown(8, 870, 30);\n' +
            '  Otto.tiptoeSwing(7, 900, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.ascendingTurn(8, 870, 30);\n' +
            '  delay(100);\n' +
            '  Otto.jitter(8, 900, 30);\n' +
            '  delay(500);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.updown(8, 870, 30);\n' +
            '  Otto.tiptoeSwing(7, 900, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.ascendingTurn(8, 870, 30);\n' +
            '  delay(100);\n' +
            '  Otto.jitter(8, 900, 30);\n' +
            '  delay(500);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.updown(8, 870, 30);\n' +
            '  Otto.tiptoeSwing(7, 900, 30);\n' +
            '  delay(500);\n' +
            '  Otto.home();\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.moonwalker(1, 1000, 30, 1);\n' +
            '  Otto.moonwalker(1, 1000, 30, -1);\n' +
            '  Otto.moonwalker(1, 1000, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  Otto.home();\n' +
            '  Otto.ascendingTurn(8, 870, 30);\n' +
            '  Otto.home();\n' +
            '  Otto.jitter(8, 900, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.updown(8, 870, 30);\n' +
            '  Otto.tiptoeSwing(7, 900, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '}';
        code = 'feeling_good();\n';
    } else if (arg0 == 'Happy Dance') {
        dance_function = 'void happy_dance() {\n' +
            '  Otto.jitter(2, 750, 20);\n' +
            '  Otto.crusaito(1, 800, 30, 1);\n' +
            '  Otto.crusaito(1, 800, 30, -1);\n' +
            '  Otto.crusaito(1, 800, 30, 1);\n' +
            '  delay(300);\n' +
            '  Otto.walk(1, 1500, -1);\n' +
            '  Otto.walk(2, 1000, 1);\n' +
            '  Otto.moonwalker(1, 600, 30, 1);\n' +
            '  Otto.moonwalker(1, 600, 30, -1);\n' +
            '  Otto.moonwalker(1, 600, 30, 1);\n' +
            '  Otto.moonwalker(1, 600, 30, -1);\n' +
            '  Otto.walk(1, 1500, -1);\n' +
            '  Otto.walk(2, 1000, 1);\n' +
            '  Otto.moonwalker(1, 600, 30, 1);\n' +
            '  Otto.moonwalker(1, 600, 30, -1);\n' +
            '  Otto.moonwalker(1, 600, 30, 1);\n' +
            '  Otto.moonwalker(1, 600, 30, -1);\n' +
            '  Otto.walk(1, 1500, -1);\n' +
            '  Otto.walk(2, 1000, 1);\n' +
            '  Otto.shakeLeg(1, 700, 1);\n' +
            '  Otto.shakeLeg(1, 700, -1);\n' +
            '  delay(1000);\n' +
            '  Otto.home();\n' +
            '  Otto.moonwalker(1, 3000, 50, 1);\n' +
            '  Otto.moonwalker(1, 3000, 50, -1);\n' +
            '  delay(100);\n' +
            '  Otto.moonwalker(1, 3000, 50, -1);\n' +
            '  Otto.moonwalker(1, 3000, 50, 1);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.bend(1, 100, 1);\n' +
            '  Otto.bend(1, 100, -1);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.bend(1, 100, 1);\n' +
            '  Otto.bend(1, 100, -1);\n' +
            '  delay(500);\n' +
            '  Otto.crusaito(1, 800, 30, 1);\n' +
            '  Otto.crusaito(1, 800, 30, -1);\n' +
            '  Otto.crusaito(1, 800, 30, 1);\n' +
            '  delay(300);\n' +
            '  Otto.walk(1, 1500, -1);\n' +
            '  Otto.walk(2, 1000, 1);\n' +
            '  Otto.moonwalker(1, 600, 30, 1);\n' +
            '  Otto.moonwalker(1, 600, 30, -1);\n' +
            '  Otto.moonwalker(1, 600, 30, 1);\n' +
            '  Otto.moonwalker(1, 600, 30, -1);\n' +
            '  Otto.walk(1, 1500, -1);\n' +
            '  Otto.walk(2, 1000, 1);\n' +
            '  Otto.moonwalker(1, 600, 30, 1);\n' +
            '  Otto.moonwalker(1, 600, 30, -1);\n' +
            '  Otto.moonwalker(1, 600, 30, 1);\n' +
            '  Otto.moonwalker(1, 600, 30, -1);\n' +
            '  Otto.walk(1, 1500, -1);\n' +
            '  Otto.walk(2, 1000, 1);\n' +
            '  Otto.shakeLeg(1, 700, 1);\n' +
            '  Otto.shakeLeg(1, 700, -1);\n' +
            '  delay(1000);\n' +
            '  Otto.home();\n' +
            '  Otto.moonwalker(1, 3000, 50, 1);\n' +
            '  Otto.moonwalker(1, 3000, 50, -1);\n' +
            '  delay(100);\n' +
            '  Otto.moonwalker(1, 3000, 50, -1);\n' +
            '  Otto.moonwalker(1, 3000, 50, 1);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.bend(1, 100, 1);\n' +
            '  Otto.bend(1, 100, -1);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.bend(1, 100, 1);\n' +
            '  Otto.bend(1, 100, -1);\n' +
            '  Otto.updown(3, 900, 30);\n' +
            '  Otto.jitter(3, 1000, 20);\n' +
            '  Otto.updown(3, 900, 30);\n' +
            '  Otto.jitter(3, 1000, 20);\n' +
            '  Otto.jump(1, 400);\n' +
            '  Otto.jump(1, 400);\n' +
            '  Otto.jump(1, 400);\n' +
            '  Otto.jump(1, 400);\n' +
            '  Otto.jitter(4, 800, 20);\n' +
            '  Otto.jump(1, 400);\n' +
            '  Otto.jump(1, 400);\n' +
            '  Otto.jump(1, 400);\n' +
            '  Otto.jump(1, 400);\n' +
            '  Otto.jitter(2, 800, 20);\n' +
            '  delay(1500);\n' +
            '  Otto.home();\n' +
            '  Otto.moonwalker(1, 3000, 50, 1);\n' +
            '  Otto.moonwalker(1, 3000, 50, -1);\n' +
            '  delay(100);\n' +
            '  Otto.moonwalker(1, 3000, 50, -1);\n' +
            '  Otto.moonwalker(1, 3000, 50, 1);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.bend(1, 100, 1);\n' +
            '  Otto.bend(1, 100, -1);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.bend(1, 100, 1);\n' +
            '  Otto.bend(1, 100, -1);\n' +
            '  Otto.moonwalker(1, 3000, 50, 1);\n' +
            '  Otto.moonwalker(1, 3000, 50, -1);\n' +
            '  delay(100);\n' +
            '  Otto.moonwalker(1, 3000, 50, -1);\n' +
            '  Otto.moonwalker(1, 3000, 50, 1);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.bend(1, 100, 1);\n' +
            '  Otto.bend(1, 100, -1);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.bend(1, 100, 1);\n' +
            '  Otto.bend(1, 100, -1);\n' +
            '  Otto.home();\n' +
            '  Otto.updown(3, 900, 30);\n' +
            '  Otto.jitter(3, 1000, 20);\n' +
            '  Otto.updown(3, 900, 30);\n' +
            '  Otto.jitter(3, 1000, 20);\n' +
            '  Otto.moonwalker(1, 3000, 50, 1);\n' +
            '  Otto.moonwalker(1, 3000, 50, -1);\n' +
            '  delay(100);\n' +
            '  Otto.moonwalker(1, 3000, 50, -1);\n' +
            '  Otto.moonwalker(1, 3000, 50, 1);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.bend(1, 100, 1);\n' +
            '  Otto.bend(1, 100, -1);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.bend(1, 100, 1);\n' +
            '  Otto.bend(1, 100, -1);\n' +
            '  Otto.moonwalker(1, 3000, 50, 1);\n' +
            '  Otto.moonwalker(1, 3000, 50, -1);\n' +
            '  delay(100);\n' +
            '  Otto.moonwalker(1, 3000, 50, -1);\n' +
            '  Otto.moonwalker(1, 3000, 50, 1);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.bend(1, 100, 1);\n' +
            '  Otto.bend(1, 100, -1);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.jump(1, 370);\n' +
            '  Otto.bend(1, 100, 1);\n' +
            '  Otto.bend(1, 100, -1);\n' +
            '  Otto.home();\n' +
            '}';
        code = 'happy_dance();\n';
    } else if (arg0 == 'Touch Me') {
        dance_function = 'void touch_me() {\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.moonwalker(1, 1000, 30, 1);\n' +
            '  Otto.moonwalker(1, 1000, 30, -1);\n' +
            '  Otto.moonwalker(1, 1000, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  Otto.home();\n' +
            '  Otto.ascendingTurn(8, 870, 30);\n' +
            '  Otto.home();\n' +
            '  Otto.jitter(8, 900, 30);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  Otto.home();\n' +
            '  Otto.ascendingTurn(8, 870, 30);\n' +
            '  Otto.home();\n' +
            '  Otto.jitter(8, 900, 30);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  Otto.home();\n' +
            '  Otto.ascendingTurn(8, 870, 30);\n' +
            '  Otto.home();\n' +
            '  Otto.jitter(8, 900, 30);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.updown(8, 870, 30);\n' +
            '  Otto.tiptoeSwing(7, 900, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.ascendingTurn(8, 870, 30);\n' +
            '  delay(100);\n' +
            '  Otto.jitter(8, 900, 30);\n' +
            '  delay(500);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.updown(8, 870, 30);\n' +
            '  Otto.tiptoeSwing(7, 900, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.ascendingTurn(8, 870, 30);\n' +
            '  delay(100);\n' +
            '  Otto.jitter(8, 900, 30);\n' +
            '  delay(500);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.updown(8, 870, 30);\n' +
            '  Otto.tiptoeSwing(7, 900, 30);\n' +
            '  delay(500);\n' +
            '  Otto.home();\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' +
            '  Otto.moonwalker(1, 950, 30, -1);\n' +
            '  Otto.moonwalker(1, 950, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.moonwalker(1, 1000, 30, 1);\n' +
            '  Otto.moonwalker(1, 1000, 30, -1);\n' +
            '  Otto.moonwalker(1, 1000, 30, 1);\n' + 
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.swing(3, 1000, 30);\n' +
            '  Otto.home();\n' +
            '  Otto.ascendingTurn(8, 870, 30);\n' +
            '  Otto.home();\n' +
            '  Otto.jitter(8, 900, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '  Otto.updown(8, 870, 30);\n' +
            '  Otto.tiptoeSwing(7, 900, 30);\n' +
            '  delay(150);\n' +
            '  Otto.home();\n' +
            '}';
        code = 'touch_me();\n';
    }
    Blockly.Arduino.definitions_['definitions_ottoRobot_setDance'] = dance_function;
    return code;
};

Blockly.Arduino['arduino_ottoRobot_setDistance'] = function(block) {
    Blockly.Arduino.customFunctions_['definitions_ottoRobot_setDistance'] = 
        '#include <Ultrasonic.h>\n' +
        'Ultrasonic ultrasonic(PIN_TRIGGER, PIN_ECHO);\n' +
        'int distance;';

    var code = 'distance = ultrasonic.read();\n';
    return code;
};

Blockly.Arduino['arduino_ottoRobot_readDistance'] = function(block) {
    var code = 'distance';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_ottoRobot_setMove'] = function(block) {
    var arg0 = block.getFieldValue('MOVE');
    var arg1 = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_NONE) || 1;

    var code = '';
    if (arg0 == 'Forward') {
        code = 'Otto.walk(1, ' + arg1*1000 + ', 1);\n';
    } else if (arg0 == 'Backward') {
        code = 'Otto.walk(1, ' + arg1*1000 + ', -1);\n';
    } else if (arg0 == 'Turn Left') {
        code = 'Otto.turn(1, ' + arg1*1000 + ', 1);\n';
    } else if (arg0 == 'Turn Right') {
        code = 'Otto.turn(1, ' + arg1*1000 + ', -1);\n';
    }

    return code;
};

Blockly.Arduino['arduino_ottoRobot_setAction'] = function(block) {
    var arg0 = block.getFieldValue('ACTION');
    var arg1 = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_NONE) || 128;
    var arg2 = Blockly.Arduino.valueToCode(block, 'ANGLE', Blockly.Arduino.ORDER_NONE) || 1;

    var code = '';
    if (arg0 == 'Ascending Turn') 
        code = 'Otto.ascendingTurn(1, ' + arg1*1000 + ', '+ arg2 + ');\n';
    else if (arg0 == 'Bend Left Foot') 
        code = 'Otto.bend(1, ' + arg2 + ', -1);\n';
    else if (arg0 == 'Bend Right Foot') 
        code = 'Otto.bend(1, ' + arg2 + ', 1);\n';
    else if (arg0 == 'Crusaito Forward') 
        code = 'Otto.crusaito(1, ' + arg1*1000 + ', '+ arg2 + ', 1);\n';
    else if (arg0 == 'Crusaito Backward') 
        code = 'Otto.crusaito(1, ' + arg1*1000 + ', '+ arg2 + ', -1);\n';
    else if (arg0 == 'Flapping Forward') 
        code = 'Otto.flapping(1, ' + arg1*1000 + ', '+ arg2 + ', 1);\n';
    else if (arg0 == 'Flapping Backward') 
        code = 'Otto.flapping(1, ' + arg1*1000 + ', '+ arg2 + ', -1);\n';
    else if (arg0 == 'Jitter') 
        code = 'Otto.jitter(1, ' + arg1*1000 + ', '+ arg2 + ');\n';
    else if (arg0 == 'Jump') 
        code = 'Otto.jump(1, ' + arg2 + ');\n';
    else if (arg0 == 'Moonwalker Left')
        code = 'Otto.moonwalker(1, ' + arg1*1000 + ', '+ arg2 + ', 1);\n';
    else if (arg0 == 'Moonwalker Right') 
        code = 'Otto.moonwalker(1, ' + arg1*1000 + ', '+ arg2 + ', -1);\n';
    else if (arg0 == 'Shake Left Foot') 
        code = 'Otto.shakeLeg(1, ' + arg1*1000 + ', -1);\n';
    else if (arg0 == 'Shake Right Foot') 
        code = 'Otto.shakeLeg(1, ' + arg1*1000 + ', 1);\n';
    else if (arg0 == 'Swing') 
        code = 'Otto.swing(1, ' + arg1*1000 + ', '+ arg2 + ');\n';
    else if (arg0 == 'Tiptoe Swing') 
        code = 'Otto.tiptoeSwing(1, ' + arg1*1000 + ', '+ arg2 + ');\n';
    else if (arg0 == 'Up & Down') 
            code = 'Otto.updown(1, ' + arg1*1000 + ', '+ arg2 + ');\n';

    return code;
};

Blockly.Arduino['arduino_ottoRobot_setTone'] = function(block) {
    var arg0 = block.getFieldValue('TONE');
    // var arg0 = Blockly.Arduino.valueToCode(block, 'TONE', Blockly.Arduino.ORDER_NONE);
    var arg1 = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_NONE) || 100;
    var arg2 = Blockly.Arduino.valueToCode(block, 'SILENT', Blockly.Arduino.ORDER_NONE) || 100;

    var code = '';
    code = 'Otto._tone(' + arg0 + ', ' + arg1 + ', ' + arg2 + ');\n';
    return code;
};

Blockly.Arduino['arduino_ottoRobot_setBendTone'] = function(block) {
    var arg0 = block.getFieldValue('INITIALTONE');
    var arg1 = block.getFieldValue('FINALTONE');
    var arg2 = Blockly.Arduino.valueToCode(block, 'STEP', Blockly.Arduino.ORDER_NONE) || 1.01;
    var arg3 = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_NONE) || 100;
    var arg4 = Blockly.Arduino.valueToCode(block, 'SILENT', Blockly.Arduino.ORDER_NONE) || 100;

    var code = '';
    code = 'Otto.bendTones(' + arg0 + ', ' + arg1 + ', ' + arg2 + ', ' + arg3 + ', ' + arg4 + ');\n';
    return code;
};

Blockly.Arduino['arduino_ottoRobot_setCalibration'] = function(block) {
    Blockly.Arduino.includes_['include_ottoRobot'] = '#include <EEPROM.h>\n' +
        '#include <Otto.h>\nOtto Otto;';
    Blockly.Arduino.definitions_['definitions_ottoRobot_setCalibration'] = 
        '#define PIN_LEG_L           4   // Left leg servo\n' +
        '#define PIN_LEG_R           5   // Right leg servo\n' +
        '#define PIN_FOOT_L          6   // Left foot servo\n' +
        '#define PIN_FOOT_R          7   // Right foot servo\n' +
        '#define PIN_TRIGGER         8   // TRIGGER PIN (8)\n' +
        '#define PIN_ECHO            9   // ECHO PIN (9)\n' +
        '#define PIN_BUZZER          13  // BUZZER PIN (13)\n\n' +

        'int positions[4] = {90, 90, 90, 90};\n' +
        'int8_t trims[4] = {0, 0, 0, 0};\n\n' +

        'void help() {\n' +
        '  Serial.println();\n' +
        '  Serial.println("Otto Robot Calibration:");\n' +
        '  Serial.println("Send \'d\' or \'f\' for adjusting Left Leg");\n' +
        '  Serial.println("Send \'j\' or \'k\' for adjusting Right Leg");\n' +
        '  Serial.println("Send \'c\' or \'v\' for adjusting Left Foot");\n' +
        '  Serial.println("Send \'n\' or \'m\' for adjusting Right Foot");\n' +
        '  Serial.println();\n' +
        '  Serial.println("Send \'s\' to save calibration settings");\n' +
        '}\n\n' +

        'void set_trims() {\n' +
        '  Otto.setTrims(trims[0], trims[1], trims[2], trims[3]);\n' +
        '  Otto._moveServos(10, positions);\n' +
        '}\n\n' +

        'void read_char(char cmd) {\n' +
        '  switch (cmd) {\n' +
        '    case \'d\':\n' +
        '      trims[0]++;\n' +
        '      set_trims();\n' +
        '      Serial.println();\n' +
        '      Serial.println(">>> Received \'d\' to adjust Left Leg <<<");\n' +
        '      Serial.println(trims[0], DEC);\n' +
        '      help();\n' +
        '      break;\n' +
        '    case \'f\':\n' +
        '      trims[0]--;\n' +
        '      set_trims();\n' +
        '      Serial.println();\n' +
        '      Serial.println(">>> Received \'f\' to adjust Left Leg <<<");\n' +
        '      Serial.println(trims[0], DEC);\n' +
        '      help();\n' +
        '      break;\n' +
        '    case \'j\':\n' +
        '      trims[1]++;\n' +
        '      set_trims();\n' +
        '      Serial.println();\n' +
        '      Serial.println(">>> Received \'j\' to adjust Right Leg <<<");\n' +
        '      Serial.println(trims[1], DEC);\n' +
        '      help();\n' +
        '      break;\n' +
        '    case \'k\':\n' +
        '      trims[1]--;\n' +
        '      set_trims();\n' +
        '      Serial.println();\n' +
        '      Serial.println(">>> Received \'k\' to adjust Right Leg <<<");\n' +
        '      Serial.println(trims[1], DEC);\n' +
        '      help();\n' +
        '      break;\n' +
        '    case \'c\':\n' +
        '      trims[2]++;\n' +
        '      set_trims();\n' +
        '      Serial.println();\n' +
        '      Serial.println(">>> Received \'c\' to adjust Left Foot <<<");\n' +
        '      Serial.println(trims[2], DEC);\n' +
        '      help();\n' +
        '      break;\n' +
        '    case \'v\':\n' +
        '      trims[2]--;\n' +
        '      set_trims();\n' +
        '      Serial.println();\n' +
        '      Serial.println(">>> Received \'v\' to adjust Left Foot <<<");\n' +
        '      Serial.println(trims[2], DEC);\n' +
        '      help();\n' +
        '      break;\n' +
        '    case \'n\':\n' +
        '      trims[3]++;\n' +
        '      set_trims();\n' +
        '      Serial.println();\n' +
        '      Serial.println(">>> Received \'n\' to adjust Right Foot <<<");\n' +
        '      Serial.println(trims[3], DEC);\n' +
        '      help();\n' +
        '      break;\n' +
        '    case \'m\':\n' +
        '      trims[3]--;\n' +
        '      set_trims();\n' +
        '      Serial.println();\n' +
        '      Serial.println(">>> Received \'m\' to adjust Right Foot <<<");\n' +
        '      Serial.println(trims[3], DEC);\n' +
        '      help();\n' +
        '      break;\n' +
        '    case \'s\':\n' +
        '      Serial.println();\n' +
        '      Serial.println(">>> Received \'s\' to save calibration settins <<<");\n' +
        '      for (int i = 0; i <= 3; i++) {\n' +
        '          EEPROM.write(i, trims[i]);\n' +
        '      }\n' +
        '      delay(500);\n' +
        '      Otto.sing(S_superHappy);\n' +
        '      Otto.sing(S_happy_short);\n' +
        '      help();\n' +
        '      break;\n' +
        '  }\n' +
        '}';
    Blockly.Arduino.setups_['setups_ottoRobot_definitions_ottoRobot_setCalibration'] = 
    'Otto.init(PIN_LEG_L, PIN_LEG_R, PIN_FOOT_L, PIN_FOOT_R, true, PIN_BUZZER);\n' +
    '  Otto.home();\n' +
    '  Serial.begin(9600);\n' +
    '  while (!Serial);\n' +
    '  help();';
    
    var code = 'read_char(Serial.read());\n';
    return code;

};
