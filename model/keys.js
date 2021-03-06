"use strict";
/**
 * @constructor
*/
/*global Keys:true */
var Keys=function(timers){
  this.timers=timers;
  this.metas=[0,16,17,18,20,27];
  this.char_char={
    8:'backspace',
    9:'tab',
    13:'\n',
    16:'shift',
    17:'ctrl',
    18:'alt',
    19:'pause/break',
    20:'caps lock',
    27:'escape',
    32:' ',
    33:'page up',
    34:'page down',
    35:'end',
    36:'home',
    37:'left arrow',
    38:'up arrow',
    39:'right arrow',
    40:'down arrow',
    45:'insert',
    46:'delete',
    48:'0',
    49:'1',
    50:'2',
    51:'3',
    52:'4',
    53:'5',
    54:'6',
    55:'7',
    56:'8',
    57:'9',
    59:';',
    61:'=',
    65:'a',
    66:'b',
    67:'c',
    68:'d',
    69:'e',
    70:'f',
    71:'g',
    72:'h',
    73:'i',
    74:'j',
    75:'k',
    76:'l',
    77:'m',
    78:'n',
    79:'o',
    80:'p',
    81:'q',
    82:'r',
    83:'s',
    84:'t',
    85:'u',
    86:'v',
    87:'w',
    88:'x',
    89:'y',
    90:'z',
    91:'left window key',
    92:'right window key',
    93:'select key',
    96:'numpad 0',
    97:'numpad 1',
    98:'numpad 2',
    99:'numpad 3',
    100:'numpad 4',
    101:'numpad 5',
    102:'numpad 6',
    103:'numpad 7',
    104:'numpad 8',
    105:'numpad 9',
    106:'multiply',
    107:'+',
    109:'-',
    110:'decimal point',
    111:'divide',
    112:'f1',
    113:'f2',
    114:'f3',
    115:'f4',
    116:'f5',
    117:'f6',
    118:'f7',
    119:'f8',
    120:'f9',
    121:'f10',
    122:'f11',
    123:'f12',
    144:'num lock',
    145:'scroll lock',
    186:';',
    187:'=',
    188:',',
    189:'-',
    190:'.',
    191:'/',
    192:'`',
    219:'[',
    220:"\\",
    221:']',
    222:"'"
  };
  this.shift_char=
  {
    48:')',
    49:'!',
    50:'@',
    51:'#',
    52:'$',
    53:'%',
    54:'^',
    55:'&',
    56:'*',
    57:'(',
    59:':',
    61:'+',
    65:'A',
    66:'B',
    67:'C',
    68:'D',
    69:'E',
    70:'F',
    71:'G',
    72:'H',
    73:'I',
    74:'J',
    75:'K',
    76:'L',
    77:'M',
    78:'N',
    79:'O',
    80:'P',
    81:'Q',
    82:'R',
    83:'S',
    84:'T',
    85:'U',
    86:'V',
    87:'W',
    88:'X',
    89:'Y',
    90:'Z',
    91:'left window key',
    92:'right window key',
    93:'select key',
    96:'numpad 0',
    97:'numpad 1',
    98:'numpad 2',
    99:'numpad 3',
    100:'numpad 4',
    101:'numpad 5',
    102:'numpad 6',
    103:'numpad 7',
    104:'numpad 8',
    105:'numpad 9',
    106:'multiply',
    107:'+',
    109:'_',
    110:'decimal point',
    111:'divide',
    112:'f1',
    113:'f2',
    114:'f3',
    115:'f4',
    116:'f5',
    117:'f6',
    118:'f7',
    119:'f8',
    120:'f9',
    121:'f10',
    122:'f11',
    123:'f12',
    144:'num lock',
    145:'scroll lock',
    186:':',
    187:'+',
    188:'<',
    189:'_',
    190:'>',
    191:'?',
    192:'~',
    219:'{',
    220:'|',
    221:'}',
    222:'"'
  };
};
Keys.prototype.equivalent=function(key_code,letter)
{
  //console.log(key_code+" "+letter)
  if(this.get_char(key_code)===letter){return true;}
  else{return false;}
};
Keys.prototype.get_char=function(code)
{
  if(this.timers[16]){
    //console.log(this.shift_char[code])
    return this.shift_char[code];
  }
  else{
    return this.char_char[code];
  }
};
Keys.prototype.is_control=function(code)
{
  if(this.timers[17]){
    return true;
  }
  else{
    return false;
  }
};
Keys.prototype.meta=function(key_code)
{
  if(this.metas.indexOf(key_code)!==-1){
    return true;}
  else{
    return false;}
};
