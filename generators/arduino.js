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

goog.provide('Blockly.Arduino');

goog.require('Blockly.Generator');


/**
 * Arduino code generator.
 * @type {!Blockly.Generator}
 */
Blockly.Arduino = new Blockly.Generator('Arduino');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Arduino.addReservedWords(
    // https://en.cppreference.com/w/cpp/keyword
    'alignas,alignof,and,and_eq,asm,atomic_cancel,atomic_commit,' +
  'atomic_noexcept,auto,bitand,bitor,bool,break,case,catch,char,char8_t,' +
  'char16_t,char32_t,class,compl,concept,const,consteval,constexpr,' +
  'constinit,const_cast,continue,co_await,co_return,co_yield,decltype,' +
  'default,delete,do,double,dynamic_cast,else,enum,explicit,export,extern,' +
  'false,float,for,friend,goto,if,inline,int,long,mutable,namespace,new,' +
  'noexcept,not,not_eq,nullptr,operator,or,or_eq,private,protected,public,' +
  'reflexpr,register,reinterpret_cast,requires,return,short,signed,sizeof,' +
  'static,static_assert,static_cast,struct,switch,synchronized,template,' +
  'this,thread_local,throw,true,try,typedef,typeid,typename,union,' +
  'unsigned,using,virtual,void,volatile,wchar_t,while,xor,xor_eq,' +
  // https://en.wikipedia.org/wiki/C_standard_library
  'assert,int8_t,uint8_t,int16_t,uint16_t,int32_t,uint32_t,abs,labs,llabs,' +
  'fabs,div,ldiv,lldiv,fmod,remainder,remquo,fma,fmax,fmin,fdim,nan,nanf,' +
  'nanl,exp,exp2,expm1,log,log2,log10,log1p,ilogb,logb,sqrt,cbrt,hypot,pow,' +
  'sin,cos,tan,asin,acos,atan,atan2,sinh,cosh,tanh,asinh,acosh,atanh,erf,' +
  'erfc,lgamma,tgamma,ceil,floor,trunc,round,lround,llround,nearbyint,' +
  'rint,lrint,llrint,frexp,ldxp,modf,scalbn,scalbln,nextafter,nexttoward' +
  'copysign,fpclassify,isfinite,isfinite,isinf,isnan,isnormal,signbit' +
  'size_t,fopen,freopen,fflush,fclose,setbuf,setvbuf,fwide,fread,fwrite' +
  'fgetc,fgetwa,getc,getwc,fgets,fgetws,fputc,fputwc,putc,putwc,fputs,' +
  'fputws,getchar,getwchar,gets,putchar,putwchar,puts,ungetc,ungetwc,' +
  'scanf,wscanf,fscanf,fwscanf,sscanf,swscanf,vscanf,vwscanf,vfscanf,' +
  'vfwsanf,printf,wprintf,fprintf,fwprintf,sprintf,swprintf,snprintf,' +
  'vprintf,vwprintf,vfprintf,vfwprintf,vsprintf,vwsprintf,vsnprintf,perror' +
  'ftell,ftello,fseek,fseeko,fgetpos,fsetpos,rewind,clearerr,feof,ferror' +
  'remove,rename,tmpfile,tmpnam,strcpy,strncpy,strcat,strncat,strxfrm,' +
  'strlen,strcmp,strncmp,strcoll,strchr,strrchr,strspn,strcspn,strpbrk,' +
  'strstr,strtok,strerror,memset,memcpy,memmove,memcmp,memchr,' +
  // http://arduino.cc/en/Reference/HomePage
  'setup,loop,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,interger,' +
  'constants,floating,point,boolean,byte,word,double,string,String,' +
  'array,pinMode,digitalWrite,digitalRead,analogReference,analogRead,' +
  'analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,' +
  'delayMicroseconds,min,max,constrain,map,randomSeed,random,lowByte,' +
  'highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,' +
  'detachInterrupt,interrupts,noInterrupts'
);

/**
 * Order of operation ENUMs.
 */
Blockly.Arduino.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.Arduino.ORDER_UNARY_POSTFIX = 1;  // expr++ expr-- () [] .
Blockly.Arduino.ORDER_UNARY_PREFIX = 2;   // -expr !expr ~expr ++expr --expr
Blockly.Arduino.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.Arduino.ORDER_ADDITIVE = 4;       // + -
Blockly.Arduino.ORDER_SHIFT = 5;          // << >>
Blockly.Arduino.ORDER_RELATIONAL = 6;     // is is! >= > <= <
Blockly.Arduino.ORDER_EQUALITY = 7;       // == != === !==
Blockly.Arduino.ORDER_BITWISE_AND = 8;    // &
Blockly.Arduino.ORDER_BITWISE_XOR = 9;    // ^
Blockly.Arduino.ORDER_BITWISE_OR = 10;    // |
Blockly.Arduino.ORDER_LOGICAL_AND = 11;   // &&
Blockly.Arduino.ORDER_LOGICAL_OR = 12;    // ||
Blockly.Arduino.ORDER_CONDITIONAL = 13;   // expr ? expr : expr
Blockly.Arduino.ORDER_ASSIGNMENT = 14;    // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.Arduino.ORDER_NONE = 99;          // (...)

/**
 * define indent
 */
Blockly.Arduino.INDENT = '  ';

Blockly.Arduino.firstLoop = true;

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Arduino.init = function(workspace) {
  // Create a dictionary of includes to be printed at head.
  Blockly.Arduino.includes_ = Object.create(null);
  // Create a dictionary of definitions to be printed after includes.
  Blockly.Arduino.definitions_ = Object.create(null);
  // Create a dictionary of custom founction definitions to be printed after definitions.
  Blockly.Arduino.customFunctions_ = Object.create(null);
  // Create a dictionary of custom args safe name. Avoid generating multiple
  // security names with different suffixes due to multiple uses of getName.
  Blockly.Arduino.customFunctionsArgName_ = Object.create(null);
  // Create a dictionary of functions which should called in setup() to be
  // printed in setup().
  Blockly.Arduino.setups_ = Object.create(null);
  // Create a dictionary of functions which should called in loop() to be
  // printed in loop().
  Blockly.Arduino.loops_ = Object.create(null);

  if (!Blockly.Arduino.variableDB_) {
    Blockly.Arduino.variableDB_ =
      new Blockly.Names(Blockly.Arduino.RESERVED_WORDS_);
  } else {
    Blockly.Arduino.variableDB_.reset();
  }
  Blockly.Arduino.variableDB_.setVariableMap(workspace.getVariableMap());

  var defvars = [];
  var variables = Blockly.Variables.allVariables(workspace);
  for (var x = 0; x < variables.length; x++) {
    defvars[x] = 'float ' +
      Blockly.Arduino.variableDB_.getName(variables[x].name,
          Blockly.Variables.NAME_TYPE) + ';';
  }
  if (variables.length > 0) {
    Blockly.Arduino.definitions_['variables'] = defvars.join('\n');
  }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Arduino.finish = function(code) {
  // Convert the includes dictionary into a list.
  var including = [];
  for (var name in Blockly.Arduino.includes_) {
    including.push(Blockly.Arduino.includes_[name]);
  }
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.Arduino.definitions_) {
    definitions.push(Blockly.Arduino.definitions_[name]);
  }
  // Convert the custom function definitions dictionary into a list.
  var customFunctions = [];
  for (var name in Blockly.Arduino.customFunctions_) {
    customFunctions.push(Blockly.Arduino.customFunctions_[name]);
  }
  // Convert the functions which should called in setup() dictionary into a list.
  var setups = [];
  for (var name in Blockly.Arduino.setups_) {
    setups.push(Blockly.Arduino.setups_[name]);
  }
  // Convert the functions which should called in loop() dictionary into a list.
  var loops = [];
  for (var name in Blockly.Arduino.loops_) {
    loops.push(Blockly.Arduino.loops_[name]);
  }

  var ret = "// generated by Scratch Arduino\n";
  // include
  if (including.length != 0) {
    ret += including.join('\n') + "\n\n";
  }
  // definitions
  if (definitions.length != 0) {
    ret += definitions.join('\n') + "\n\n";
  }
  // custom function definitions
  if (customFunctions.length != 0) {
    ret += customFunctions.join('\n\n') + "\n\n";
  }

  // setup()
  ret += "void setup() {\n";
  if (setups.length != 0) {
    ret += Blockly.Arduino.INDENT + setups.join('\n' + Blockly.Arduino.INDENT) + "\n";
  }
  ret += code;
  ret += "}\n";

  // loop()
  // if there is no loop add a empty loop function.
  if (Blockly.Arduino.firstLoop) {
    ret += "\nvoid loop() {\n" + Blockly.Arduino.INDENT + "repeat();\n}\n";
  }

  // repeat()
  // if has loops_ code, add the repeat() function to place it.
  if (loops.length != 0) {
    ret += "\nvoid repeat() {\n";
    ret += Blockly.Arduino.INDENT + loops.join('\n' + Blockly.Arduino.INDENT) + "\n";
    ret += "}\n";
  } else {
    // if no repeat delet all repeat() call in code.
    ret = ret.replace(/ *repeat\(\);\n/g, '');
  }

  // Clean up temporary data.
  delete Blockly.Arduino.definitions_;
  delete Blockly.Arduino.includes_;
  delete Blockly.Arduino.customFunctions_;
  delete Blockly.Arduino.customFunctionsArgName_;
  delete Blockly.Arduino.setups_;
  delete Blockly.Arduino.loop_;
  Blockly.Arduino.variableDB_.reset();
  Blockly.Arduino.firstLoop = true;

  return ret;
};

/**
 * Common tasks for generating Arduino from blocks.
 * Get comments for the specified block and any connected value blocks.
 * Remove the block's code which is unconnect to event_whenarduinobegin
 * Add indent at the beginning of each line in setup()
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Arduino code created for this block.
 * @return {string} Arduino code with comments and subsequent blocks added.
 * @private
 */
Blockly.Arduino.scrub_ = function(block, code) {
  if ((code === null) || (!Blockly.Arduino.check_(block))) {
    // Block has handled code generation itself.
    return '';
  }

  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += Blockly.Arduino.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Arduino.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Arduino.prefixLines(comment, '// ');
          }
        }
      }
    }
  }

  var codeWithIndent = code;
  // At this step if block is not surround by a parent and it is not empty and it's not
  // a control_forever block. mean's it is in setup() function or it is custom function,
  // add indent at start of every line.
  if (block.getSurroundParent() === null && code !== "" && block.type !== 'control_forever') {
    // Add indent at start except custom function
    if (block.type !== 'procedures_definition'
      && block.type !== 'procedures_prototype') {
      codeWithIndent = Blockly.Arduino.INDENT + codeWithIndent;
      if (commentCode !== '') {
        commentCode = Blockly.Arduino.INDENT + commentCode;
      }
    }
    codeWithIndent = codeWithIndent.replace(/\n/g, "\n" + Blockly.Arduino.INDENT);
    // Delet final indent
    codeWithIndent = codeWithIndent.slice(0, codeWithIndent.length - 2);
  }

  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Arduino.blockToCode(nextBlock);
  return commentCode + codeWithIndent + nextCode;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything. A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Arduino.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped Arduino string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Arduino string.
 * @private
 */
Blockly.Arduino.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\\n')
      .replace(/\$/g, '\\$')
      .replace(/'/g, '\\\'');
  return '"' + string + '"';
};

/**
 * Common tasks for generating code from blocks.
 * Check whether this block has a valid connection.
 * @param {!Blockly.Block} block The current block.
 * @return {bool} Wether the block has effective connection.
 * @private
 */
Blockly.Arduino.check_ = function(block) {
  // If a block has no previousConnection means it is a hat block
  // or a string/nubmer block or a bool block.

  // If this block is not surround by a parent. And if this block
  // is not connected to a hat block's tree or it's output shap is
  // round or sharp mean's it is not a program tree block. Skip it.
  if (block.getSurroundParent() === null) {
    if ((block.previousConnection !== null && block.getTopStackBlock().previousConnection !== null)
    || block.getOutputShape() === 2 || block.getOutputShape() === 1
    ) {
      return false;
    }
  }
  return true;
};
