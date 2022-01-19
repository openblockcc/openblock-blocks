/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2020 Arthur Zheng.
 * All rights reserved.
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

goog.provide('Blockly.Blocks.device');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');

Blockly.Blocks['control_wait_ms'] = {
  /**
   * Block to wait (pause) stack.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "control_wait_ms",
      "message0": Blockly.Msg.CONTROL_WAIT_MS,
      "args0": [
        {
          "type": "input_value",
          "name": "DURATION"
        },
		{
          "type": "field_dropdown",
          "name": "WAIT_MENU",
          "options": [
            ['seconds', 'sleep'],
            ['milliseconds', 'sleep_ms'],
            ['microseconds', 'sleep_us']
          ]
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};
