/*208*/

/**
 * @constructor
*/
/*global Score:true,Score_Display,store */

var Score=function(display_parent,words_database)
{
  this.display=new Score_Display(display_parent);
};
Score.prototype.update=function(key,score)
{
  if(key){key="score."+key;}
  var level_scores,score_ob;
/*jslint sub: true */
  if( 
    score['c']===undefined||
    score['i']===undefined||
    score['t']===undefined||
    score['s']===undefined)
  {return false;}
/*jslint sub: false */
  level_scores=this.get_level_scores(key);
  try{level_scores.push(score);}
  catch(e){level_scores=[score];}
  score_ob=JSON.stringify(level_scores);
  if(key){store.set(key,score_ob);}
  return true;
};
Score.prototype.get_level_scores=function(key)
{
  var level_scores=store.get(key);
  if(level_scores)
  {
    try{level_scores=JSON.parse(level_scores);}
    catch(e){level_scores=[];}
  }
  if(level_scores){return level_scores;}
  return false;
};
Score.prototype.get_best=function(key)
{
  var i,ii,score,wpm,level_scores,best_wpm;
  if(key){key="score."+key;}
  level_scores=this.get_level_scores(key);
  best_wpm=0;
  for(i=0,ii=level_scores.length;i<ii;i+=1)
  {
    score=level_scores[i];
    wpm=this.calculate_wpm(score);
    if(wpm>best_wpm){best_wpm=wpm;}
  }
  if(best_wpm){return best_wpm;}
  return false;
};
Score.prototype.calculate_wpm=function(ob)
{
/*jslint sub: true */
  return Math.floor(((ob['c']/5)-ob['i'])/(ob['t']/1000/60));
};
/*jslint sub: false */

/**
 * @constructor
*/
/*jslint maxlen: 9900 */
/*global Words_List:true */
var Words_List=function(){
  this.list=[{
  "Title":"THE LIFE OF KING HENRY THE FIFTH",
  "Author":"William Shakespeare",
  "Source":"Project Gutenberg",
  "URL":"http://0x3e.com/typer.js/words/1",
  "Content":
"Once more unto the breach, dear friends, once more;\nOr close the wall up with our English dead."
},{
  "Title":"The glass bead game",
  "Author":"Hermann Hesse",
  "URL":"http://0x3e.com/typer.js/words/7",
  "Content":
"Therefore the music of a well-ordered age is calm and cheerful, and so is its government. The music of a restive age is excited and fierce, and its government is perverted. The music of a decaying state is sentimental and sad, and its government is imperiled."

},{
  "Title":"Dracula",
  "Author":"Bram Stoker",
  "Source":"Project Gutenberg",
  "Source_URL":"http://www.gutenberg.org/ebooks/345",
  "URL":"http://0x3e.com/typer.js/words/2",
  "Content":
"To my intense surprise, there was no one with him. He was quite alone, and on the table opposite him was what I knew at once from the description to be a phonograph. I had never seen one, and was much interested." 
},{
  "Title": "The Art of War",
  "Author": "Sun Tzu",
  "Translator": "Lionel Giles",
  "Source":"Project Gutenberg",
  "Source_URL":"http://www.gutenberg.org/ebooks/132",
  "URL":"http://0x3e.com/typer.js/words/3",
  "Content":
"The general who loses a battle makes but few calculations beforehand. Thus do many calculations lead to victory, and few calculations to defeat: how much more no calculation at all! It is by attention to this point that I can foresee who is likely to win or lose."
},{
  "Title": "The Time Machine",
  "Author": "H. G. (Herbert George) Wells",
  "Source":"Project Gutenberg",
  "Source_URL":"http://www.gutenberg.org/ebooks/35",
  "URL":"http://0x3e.com/typer.js/words/4",
  "Content":
"'It is a law of nature we overlook, that intellectual versatility is the compensation for change, danger, and trouble. An animal perfectly in harmony with its environment is a perfect mechanism. Nature never appeals to intelligence until habit and instinct are useless. There is no intelligence where there is no change and no need of change. Only those animals partake of intelligence that have to meet a huge variety of needs and dangers."
},{
  "Title":"Alice's Adventures in Wonderland",
  "Author":"Lewis Carroll",
  "Source":"Project Gutenberg",
  "Source_URL":"http://www.gutenberg.org/ebooks/11",
  "URL":"http://0x3e.com/typer.js/words/5",
  "Content":
"There was nothing so VERY remarkable in that; nor did Alice think it so VERY much out of the way to hear the Rabbit say to itself, 'Oh dear! Oh dear! I shall be late!' (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural); but when the Rabbit actually TOOK A WATCH OUT OF ITS WAISTCOAT-POCKET, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge."
},{
  "Title": "Moby Dick; or The Whale",
  "Author": "Herman Melville",
  "Source":"Project Gutenberg",
  "Source_URL":"http://www.gutenberg.org/ebooks/2701",
  "URL":"http://0x3e.com/typer.js/words/6",
  "Content":
"Oh, God! to sail with such a heathen crew that have small touch of human mothers in them! Whelped somewhere by the sharkish sea. The white whale is their demigorgon. Hark! the infernal orgies! that revelry is forward! mark the unfaltering silence aft! Methinks it pictures life. Foremost through the sparkling sea shoots on the gay, embattled, bantering bow, but only to drag dark Ahab after it, where he broods within his sternward cabin, builded over the dead water of the wake, and further on, hunted by its wolfish gurglings. The long howl thrills me through! Peace! ye revellers, and set the watch! Oh, life! 'tis in an hour like this, with soul beat down and held to knowledge,--as wild, untutored things are forced to feed--Oh, life! 'tis now that I do feel the latent horror in thee! but 'tis not me! that horror's out of me! and with the soft feeling of the human in me, yet will I try to fight ye, ye grim, phantom futures! Stand by me, hold me, bind me, O ye blessed influences!"
}];
};
Words_List.prototype.get_list=function(){return this.list;};



/**
 * @constructor
*/
/*global Words_Database:true,Words_List,store */
var Words_Database=function()
{
  this.selection='a';
  this.words_keys=[];
  this.words_texts=[];
  this.words_authors=[];
};
Words_Database.prototype.init=function()
{
  var store_selection,store_items;
  var len=0;
  store_items=JSON.parse(store.get('words_database_list'));

  if(store_items!=null)
    len=store_items.length;

  for(var i=0;i<len;i++)
  {
    this.load(store_items[i]);
  }
  store_selection=store.get('word_database_selected');
  if(store_selection){this.set_selection(store_selection);}
  else{this.set_selection('a');}
};
Words_Database.prototype.set_selection=function(sel)
{
  if(this.get_words(sel))
  {
    store.set('word_database_selected',sel);
    this.selection=sel;
    //this.selection_index=this.words_keys.indexOf(sel);
    this.selection_index=0;
    return true;
  }
  return false;
};
Words_Database.prototype.load=function(key)
{

  var val;
  var val_string=store.get(key);
  var cur=this.words_keys.indexOf(key);

  if(val_string)
  {

    val=JSON.parse(val_string);

    this.words_keys.unshift(key);
    this.words_texts.unshift(val.text.replace(/\r\n/g,'\n'));
    this.words_authors.unshift(val.author);

    return true;
  }
}
Words_Database.prototype.add=function(key,val)
{
  var db={};
  var db_json=store.get("words_database_list");
  var db_string;
  if(db_json)
  {
    try{db=JSON.parse(db_json);}
    catch(e){db={};}
  }
  try{db[key]=1;}
  catch(e){db[key]=1;}
  db_string=JSON.stringify(db);
  if(key){store.set("words_database_list",db_string);}
  db=JSON.parse(db_json);



  store.set(key,JSON.stringify(val));
  this.load(key);
}
Words_Database.prototype.get_selected_words=function()
{
  return this.words_texts[0];
};
Words_Database.prototype.get_selected_key=function()
{
  return this.words_keys[0];
};
Words_Database.prototype.get_selection=function()
{
  return this.selection;
};
Words_Database.prototype.get_words=function(ch)
{
  return this.words_texts[0];
};
Words_Database.prototype.count=function()
{

  return this.words_texts.length;
};
Words_Database.prototype.get_description=function(nu)
{
  return this.words_texts[nu];
};
Words_Database.prototype.get_author=function(nu)
{
  return this.words_authors[nu];
};
Words_Database.prototype.get_key=function(nu)
{
  return this.words_keys[nu];
};

/**
 * @constructor
*/
/*global Display:true,document */
var Display=function(ob)
{
  if(ob){
    this.menu=ob.menu;
    this.level=ob.level;
    this.score=ob.score;
    this.display_parent='body';
  }
};
Display.prototype.init=function()
{
  this.add_div({id:this.menu, classes:'menu', inner_html:'menu'});
  this.add_div({id:this.level, classes:'level', inner_html:'level'});
  this.add_div({id:this.score, classes:'score', inner_html:'score'});
};
Display.prototype.add_div=function(ob)
{
  ob.element="div";
  this.add_element(ob);
};
Display.prototype.add_span=function(ob)
{
  ob.element="span";
  this.add_element(ob);
};
Display.prototype.add_element=function(ob)
{
  var el,div;
  div = document.createElement(ob.element);
  div.id=ob.id;
  if(ob.classes){div.className=ob.classes;}
  if(ob.inner_html){div.innerHTML=ob.inner_html;}
  if(ob.parent){
    el = document.getElementById(ob.parent);
    el.appendChild(div);
  }
  else
  {
    el = document.getElementById(this.display_parent);
    if(!el){el=document.body;}
    el.appendChild(div);
  }
};
Display.prototype.hide=function()
{
  var el = document.getElementById(this.display_parent);
  if(el){el.style.display = 'none';}
};
Display.prototype.show=function()
{
  var el = document.getElementById(this.display_parent);
  if(el){el.style.display = 'block';}
};

/**
 * @constructor
*/
/*global Menu_Display:true,Display,document */
var Menu_Display=function(parent_id,words_database)
{
  this.display_parent=parent_id;
  this.words_database=words_database;
};
Menu_Display.prototype = new Display();
Menu_Display.prototype.init=function()
{
  var i,el,len;
  el = document.getElementById(this.display_parent);
  len=this.words_database.count();
  if(el){el.innerHTML='';}
  for(i=0;i<len;i+=1)
  {
    this.add_div({
      id:'con_label_'+i,
      classes:'menu_label label',
      inner_html:"x"+')'
    });
    this.add_div({
      id:'con_'+i,
      classes:'con',
      inner_html:this.words_database.get_description(i)
    });
    this.add_div({
      id:'aut_'+i,
      classes:'aut',
      inner_html:':'+this.words_database.get_author(i)
    });
  }
  this.add_div({
    id:'con_label_'+(len+1),
    classes:'menu_label label',
    inner_html:"h)"
  });
  this.add_div({
    id:'con_'+(len+1),
    classes:'con',
    inner_html:"Load"
  });
  this.add_div({
    id:'aut_'+(len+1),
    classes:'aut',
    inner_html:': Load a new item'
  });
};

/**
 * @constructor
*/
/*global Level_Display:true,Display,document */
var Level_Display=function(display_parent)
{
  this.display_parent=display_parent;
  this.errors=[];
};
Level_Display.prototype=new Display();
Level_Display.prototype.init=function(chars)
{
  var el = document.getElementById(this.display_parent);
  if(el){el.innerHTML='';}
  this.load_letters(chars);
};
Level_Display.prototype.load_letters=function(chars)
{
  var i,el,letters_in_current_words;

  this.add_div({id:'letters_container'});
  letters_in_current_words=chars.length;
  for(i=0;i<letters_in_current_words;i+=1)
  {
    if(chars[i]==='\n')
    {
      this.add_span({
        parent:'letters_container', 
        id:'l'+i,classes:"newline letter",
        inner_html:chars[i]
      });
    }
    else if(chars[i]===' ')
    {
      this.add_span({
        parent:'letters_container', 
        id:'l'+i,classes:"space letter",
        inner_html:chars[i]
      });
      this.add_span({
        parent:'letters_container',
        id:'i'+i,classes:"inspace ",
        inner_html:chars[i]
      });
    }
    else
    {
      this.add_span({
        parent:'letters_container',
        id:'l'+i,classes:"letter "+chars[i],
        inner_html:chars[i]
      });
    }
  }
  el = document.getElementById('l0');
  el.className=el.className+' next';
};
Level_Display.prototype.update_letters=function(letter_index)
{
  var el = document.getElementById('l'+(letter_index-1));
  el.className=el.className.replace(/next/, '');
  el.className=el.className+' done';
  el = document.getElementById('l'+letter_index);
  if(el){el.className=el.className+' next';}
};
Level_Display.prototype.error_letter=function(letter_index)
{
  var el;
  if(isNaN(this.errors[letter_index])){
    this.errors[letter_index]=1;}
  else if(this.errors[letter_index]<5){
    this.errors[letter_index]+=1;}
  el = document.getElementById('l'+letter_index);
  if(el) 
  {
    el.className=el.className.replace(/error\d+/, '');
    el.className=el.className+' error'+this.errors[letter_index];
  }
};

/**
 * @constructor
*/
/*global Score_Display:true,Display,document */
var Score_Display=function(parent_id)
{
  this.display_parent=parent_id;
};
Score_Display.prototype = new Display();
Score_Display.prototype.init=function()
{
  var el = document.getElementById(this.display_parent);
  if(el){el.innerHTML='';}
  this.add_div({
    id:'word_label',
    classes:'score_label label',
    inner_html:'words'
  });
  this.add_div({
    id:'word',
    inner_html:'0'
  });
  this.add_div({
    id:'error_label',
    classes:'score_label label',
    inner_html:'errors'
  });
  this.add_div({
    id:'errors',
    inner_html:'0'
  });
  //this.add_div({id:'time_label', classes:'label', inner_html:'time'})
  //this.add_div({id:'time', inner_html:'0'})
  this.add_div({
    id:'wpm_label',
    classes:'score_label label',
    inner_html:'wpm'
  });
  this.add_div({
    id:'wpm',
    inner_html:'0'
   });
  this.add_div({
    id:'best_wpm_label',
    classes:'score_label label',
    inner_html:'best'
  });
  this.add_div({
    id:'best_wpm',
    inner_html:'0'
  });
};
Score_Display.prototype.update_totals=
  function(tot,correct,errors,wpm,best)
{
  var el = document.getElementById('word');
  el.innerHTML=Math.round(correct/5);
  el = document.getElementById('errors');
  el.innerHTML=errors;
  el = document.getElementById('wpm');
  if(wpm<1){wpm='nil';}
  el.innerHTML=wpm;
  el = document.getElementById('best_wpm');
  el.innerHTML=best;
};

/**
 * @constructor
*/
/*global Menu:true,Menu_Display */
var Menu=function(typer)
{
  this.typer=typer;
  this.display=new Menu_Display(
    typer.display.menu,typer.words_database);
  this.keys=typer.keys;
  this.words_database=typer.words_database;
};
Menu.prototype.fg=function()
{
  this.display.show();
};
Menu.prototype.bg=function()
{
  this.display.hide();
};
Menu.prototype.key_action=function(key_code)
{
  return;
  var key_char=this.keys.get_char(key_code);
  if(this.words_database.get_words(key_char))
  {
    this.words_database.set_selection(key_char);
    this.typer.reset_level();
    this.typer.switch_context('level');
  }
};
Menu.prototype.init=function()
{
  this.typer.typing=true;
  this.display.init();
};

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

  if(this.get_char(key_code)===letter){return true;}
  else{return false;}
};
Keys.prototype.get_char=function(code)
{
  if(this.timers[16]){

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

/**
 * @constructor
*/
/*global Level:true,Level_Display,Score */
var Level=function(typer)
{
  this.typer=typer;
  this.level_display=new Level_Display(typer.display.level);
  this.keys=typer.keys;
  this.words_database=typer.words_database;
  this.score=new Score(typer.display.score,this.words_database);
  this.words='';
  this.current_letter=0;
  this.current_press=0;
  this.correct_letters=0;
  this.incorrect_letters=0;
  this.start_time=0;
  this.total_time=0;
};
Level.prototype.key_action=function(key_code)
{
  var letter,d;
  if(key_code===undefined){return false;}
  if(this.keys.meta(key_code)===true){return true;}
  if(this.current_press===0)
  {
    d=new Date();
    this.start_time=d.getTime();
    d=null;
  }
  this.current_press+=1;
  letter=this.words[this.current_letter];
  if(this.keys.equivalent(key_code,letter))
  {
    this.correct_letters+=1;
    this.current_letter+=1;
    this.level_display.update_letters(this.current_letter);
    if(this.current_letter===this.words.length){this.complete();}
    return true;
  }
  else
  {
    this.incorrect_letters+=1;
    this.level_display.error_letter(this.current_letter);
  }
  return false;
};
Level.prototype.complete=function()
{
  var level,d,new_score,best,wpm;
  d=new Date();
  this.total_time=d.getTime()-this.start_time;
  this.typing=false;
  new_score={
    "c":this.correct_letters,
    "i":this.incorrect_letters,
    "t":this.total_time,
    "s":this.start_time
  };
  level=this.words_database.get_selected_key();
  this.score.update(level,new_score);
  best=this.score.get_best(level);
  wpm=this.score.calculate_wpm(new_score);
  this.score.display.update_totals(
    this.total_time,
    this.correct_letters,
    this.incorrect_letters,
    wpm,
    best);
  this.score.display.show();
  return true;
};
Level.prototype.fg=function()
{
  return this.level_display.show();
};
Level.prototype.bg=function()
{
  return this.level_display.hide();
};
Level.prototype.init=function()
{
  this.words=this.words_database.get_selected_words();
  this.typer.typing=true;
  this.level_display.init(this.words);
  this.score.display.init();
  this.score.display.hide();
  return true;
};

/**
 * @constructor
*/
/*global Typer:true,Keys,Words_Database,Display,Menu,Level,store */
/*global setInterval,clearInterval */
var Typer=function(parent_ob)
{
  var repeat,timers,that;
  this.repeat=250;
  repeat=this.repeat;
  this.timers=[];
  timers=this.timers;
  that=this;
  this.context='level';
  this.keys=new Keys(timers);
  this.words_database=new Words_Database();
  this.words_database.init();
  this.display=new Display({
    menu:'menu_display_area',
    level:'level_display_area',
    score:'score_display_area'
  });
  this.menu=new Menu(this);
  this.level=new Level(this);

  parent_ob.onkeydown=function (evt)
  {


    var key=evt.keyCode;
    if(that.typing && !timers[key]){
      that.key_action(key);
      if (repeat!==0){
        timers[key]= setInterval('typer.key_action('+key+')', repeat);}
    }
    if(key===222||key===191||key===32){return false;}
  };
  parent_ob.onkeypress=function (evt)
  {


  };
  parent_ob.onkeyup=function (evt)
  {
    var key=evt.keyCode;

    if (timers[key]!==null){
      clearInterval(timers[key]);}
    delete timers[key];
  };
  parent_ob.onblur=function ()
  {
    for(var key in timers){if(timers.hasOwnProperty(key)){
      clearInterval(timers[key]);
      delete timers[key];
    }}
  };
  this.waited=0;
  this.wait=false;
  this.set_context('level');
  if(this.jsonp_twitter_call(false))
    this.wait=true;
  if(this.jsonp_gist_call(false)===true)
    this.wait=true;
  else
    this.wait=false;
};
Typer.prototype.jsonp_twitter_call=function(twitter)
{
  if(!twitter)
  {
    twitter = getUrlVar('tweet');
  }
  if(twitter)
  {
    if(this.words_database.load("tweet."+twitter))
      return true;

    var script = document.createElement('script');
    script.src = 'http://api.twitter.com/1/statuses/show/'+twitter+'.json?callback=t'
    document.body.appendChild(script);
    return true;
  }
}
Typer.prototype.jsonp_gist_call=function(gist)
{
  if(!gist)
  {
    gist = getUrlVar('gist');
  }
  if(gist)
  {
    if(this.words_database.load("gist."+gist))
    {

      return 2;
    }

    var script = document.createElement('script');
    script.src = 'https://api.github.com/gists/'+gist+'?callback=G';
    document.body.appendChild(script);
    return true;
  }
}
Typer.prototype.key_action=function(key_code)
{
  if(this.keys.equivalent(key_code,'escape')||(this.keys.is_control()&&this.keys.equivalent(key_code,'c')))
  {
    this.switch_context();
    return;
  }

  if(this.context==='menu'){
    this.menu.key_action(key_code);}
  else if(this.context==='level'){
    this.level.key_action(key_code);}
  else{
    this.switch_context('level');}
};
Typer.prototype.reset_level=function()
{
  delete(this.level);
  this.level=new Level(this);
  this.level.init();
};
Typer.prototype.switch_context=function(set)
{
  if (set==='level'||this.context==='menu')
  {
    this.context='level';
    store.set('context','level');
    this.menu.bg();
    this.level.fg();
  }
  else
  {
    this.context='menu';
    store.set('context','menu');
    this.level.bg();
    this.menu.fg();
  }
};
Typer.prototype.set_context=function(context)
{
  if (context==='level')
  {
    this.context='level';
    store.set('context','level');
    this.menu.bg();
    this.level.fg();
  }
  else
  {
    this.context='menu';
    store.set('context','menu');
    this.level.bg();
    this.menu.fg();
  }
};
Typer.prototype.new_tweet=function(ob)
{

  this.words_database.add("tweet."+ob.id_str,{'text':ob.text,'author':ob.user.screen_name});
  this.wait=false;
}
Typer.prototype.new_gist=function(ob)
{
  var file,text,login;
  for(var files in ob.data.files)
  {
    file=files;
    break;
  } 
  text=ob.data.files[file].content;

  if(ob.data.user!=null)
    login=ob.data.user.login;
  if(!login) login="anonymous";
  this.words_database.add("gist."+ob.data.id,{'text':text,'author':login});
  this.wait=false;
}
Typer.prototype.init=function()
{
  if(this.wait)
  {
    if(this.waited<60)
    {
      var that=this;
      setTimeout(function(){that.init()},100);
    }
    this.waited++;

  }
  else
  {
    this.display.init();
    this.level.init();
    this.menu.init();
    var context=store.get('context');
    this.set_context(context);
  }
};

/**
 * @constructor
*/
/*global Store:true,localStorage,document */
var Store=function(){};
Store.prototype.set=function(key,value)
{
  localStorage.setItem(key, value);
};
Store.prototype.set_cookie=function(key,value)
{
  var expires,d;
  d = new Date();
  d.setTime(d.getTime()+(365*24*60*60*1000));
  expires = "; expires="+d.toGMTString();
  document.cookie = key+'='+value+'; expires='+expires+' path=/';
};
Store.prototype.get=function(key)
{
  return localStorage.getItem(key);
};
Store.prototype.get_cookie_value=function(name)
{
  var i,split_keys,cookie,split_values,length;
  cookie=document.cookie;
  split_values=cookie.split(";");
  length=split_values.length;
  for(i=0;i<length;i+=1)
  {
    split_keys=split_values[i].split("=");
    split_keys[0]=split_keys[0].replace(/^ /,"");
    if(split_keys[0]===name){return split_keys[1];}
  }
  return "";
};

/**
 * @constructor
*/
/*global Store,Typer */
/*global window,document */
var store=new Store();
var typer=new Typer(document);
/*jslint sub: true */
if(window['typer']===undefined)
{
  window['typer']=typer;
  typer['key_action']=function(a){typer.key_action(a);};
}
function t(ob)
{
  typer.new_tweet(ob);
}
var G;
G=function(ob)
{
  typer.new_gist(ob);
}
function getUrlVar(key){
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search); 
      return result && unescape(result[1]) || ""; 
}
/*jslint sub: false */
window.onload = typer.init();
