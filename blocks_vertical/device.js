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


Blockly.Blocks['event_whenarduinobegin'] = {
  /**
   * Block for when arduino begin.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "event_whenarduinobegin",
      "message0": Blockly.Msg.EVENT_WHENARDUINOBEGIN,
      "nextStatement": null,
      "category": Blockly.Categories.event,
      "colour": Blockly.Colours.event.primary,
      "colourSecondary": Blockly.Colours.event.secondary,
      "colourTertiary": Blockly.Colours.event.tertiary
    });
  }
};

Blockly.Blocks['event_whenmicrobitbegin'] = {
  /**
   * Block for when microbit begin.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "event_whenmicrobitbegin",
      "message0": Blockly.Msg.EVENT_WHENMICROBITBEGIN,
      "nextStatement": null,
      "category": Blockly.Categories.event,
      "colour": Blockly.Colours.event.primary,
      "colourSecondary": Blockly.Colours.event.secondary,
      "colourTertiary": Blockly.Colours.event.tertiary
    });
  }
};

Blockly.Blocks['event_whenmicrobitbuttonpressed'] = {
  /**
   * Block for when microbit button pressed.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "event_whenmicrobitbuttonpressed",
      "message0": Blockly.Msg.EVENT_WHENMICROBITBUTTONPRESSED,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "KEY_OPTION",
          "options": [
            ['A', 'a'],
            ['B', 'b'],
            ['A+B', 'ab']
          ]
        }
      ],
      "nextStatement": null,
      "category": Blockly.Categories.event,
      "colour": Blockly.Colours.event.primary,
      "colourSecondary": Blockly.Colours.event.secondary,
      "colourTertiary": Blockly.Colours.event.tertiary
    });
  }
};

Blockly.Blocks['event_whenmicrobitpinbeingtouched'] = {
  /**
   * Block for when microbit pin was touched.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "event_whenmicrobitpinbeingtouched",
      "message0": Blockly.Msg.EVENT_WHENMICROBITPINBEINGTOUCHED,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "PIN_OPTION",
          "options": [
            ['0', '0'],
            ['1', '1'],
            ['2', '2']
          ]
        }
      ],
      "nextStatement": null,
      "category": Blockly.Categories.event,
      "colour": Blockly.Colours.event.primary,
      "colourSecondary": Blockly.Colours.event.secondary,
      "colourTertiary": Blockly.Colours.event.tertiary
    });
  }
};

Blockly.Blocks['event_whenmicrobitgesture'] = {
  /**
   * Block for when microbit gesture is XXX.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "event_whenmicrobitgesture",
      "message0": Blockly.Msg.EVENT_WHENMICROBITGESTURE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "GESTURE_OPTION",
          "options": [
            [Blockly.Msg.EVENT_WHENMICROBITGESTURE_SHAKEN, 'shake'],
            [Blockly.Msg.EVENT_WHENMICROBITGESTURE_TILTEDUPWARD, 'up'],
            [Blockly.Msg.EVENT_WHENMICROBITGESTURE_TILTEDDOWNWARD, 'down'],
            [Blockly.Msg.EVENT_WHENMICROBITGESTURE_TILTEDDLEFTWARD, 'left'],
            [Blockly.Msg.EVENT_WHENMICROBITGESTURE_TILTEDDRIGHTWARD, 'right'],
            [Blockly.Msg.EVENT_WHENMICROBITGESTURE_FACEUP, 'face up'],
            [Blockly.Msg.EVENT_WHENMICROBITGESTURE_FACEDOWN, 'face down'],
            [Blockly.Msg.EVENT_WHENMICROBITGESTURE_FREEFALL, 'freefall'],
            ['3g', '3g'],
            ['6g', '6g'],
            ['8g', '8g']
          ]
        }
      ],
      "nextStatement": null,
      "category": Blockly.Categories.event,
      "colour": Blockly.Colours.event.primary,
      "colourSecondary": Blockly.Colours.event.secondary,
      "colourTertiary": Blockly.Colours.event.tertiary
    });
  }
};
