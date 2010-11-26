function words_database(){
  this._selection='a'
  this.init=function()
  {
    store_selection=store.get_value('word_database_selected')
    if(store_selection)
      this.set_selection(store_selection)
  }
  this.set_selection=function(sel)
  {
    if(this.get_words(sel))
    {
      store.set_value('word_database_selected',sel)
      this._selection=sel
      return true
    }
    return false
  }
  this.get_selected=function()
  {
    return this.get_words(this._selection)
  }
  this.get_words=function(ch)
  {
    index=this._words_keys.indexOf(ch)
    //console.log(ch)
    //console.log(index)
    if(index!=-1)
      return this._words_values[index]
    return false
  }
  this.count=function()
  {
    return this._words_keys.length
  }
  this.get_key=function(nu)
  {
    return this._words_keys[nu]
  }
  this.get_description=function(nu)
  {
    return this._words_descriptions[nu]
  }
  this._words_keys=[
     'a'
    ,'b'
    ,'c'
    ,'d'
    ,'e'
    ,'f'
    ,'g'
    ,'h'
  ]
  this._words_values=[
     'Hello world how are you today.'
    ,'this.level=new level(this.display,this.keys,this.words)'
    ,'var http = require(\'http\');\nhttp.createServer(function (req, res) {\n  res.writeHead(200, {\'Content-Type\': \'text/plain\'});\n  res.end(\'Hello World\\n\');\n}).listen(8124, "127.0.0.1");\nconsole.log(\'Server running at http://127.0.0.1:8124/\');'
    ,'<?>\'"\\~!@#$%^&*|{}[];'
    ,'for(i=0;i<128;i++)'
    ,'(1lI||Il1)'
    ,'this.level=new level(this.display,this.keys,this.words)'
    ,'Once more unto the breach, dear friends, once more;\nOr close the wall up with our English dead.'
  ]
  this._words_descriptions=[
     'Hello world...'
    ,'this.level=...'
    ,'var http = ...'
    ,'&lt;?&gt;\'"\\~!@...'
    ,'for(i=0;i<1...'
    ,'(1lI||Il1)'
    ,'this.level=...'
    ,'Once more u...'
  ]
}

function display(menu,level,score)
{
  this.menu=menu
  this.level=level
  this.score=score
  this.display_parent='body'
  this.init=function()
  {
    this.add_div({id:this.menu, classes:'menu', inner_html:'menu'})
    this.add_div({id:this.level, classes:'level', inner_html:'level'})
    this.add_div({id:this.score, classes:'score', inner_html:'score'})
  }
  this.add_div=function(ob)
  {
    ob.element="div"
    this.add_element(ob)
  }
  this.add_span=function(ob)
  {
    ob.element="span"
    this.add_element(ob)
  }
  this.add_element=function(ob)
  {
    div = document.createElement(ob.element)
    div.id=ob.id
    if(ob.classes)
      div.className=ob.classes
    if(ob.inner_html)
      div.innerHTML=ob.inner_html
    if(ob.parent){
      el = document.getElementById(ob.parent)
      el.appendChild(div)
    }
    else
    {
      el = document.getElementById(this.display_parent)
      if(!el) el=document.body
      el.appendChild(div)
    }
  }
  this.hide=function()
  {
    el = document.getElementById(this.display_parent)
    if(el) el.style.display = 'none';
  }
  this.show=function()
  {
    el = document.getElementById(this.display_parent)
    if(el) el.style.display = 'block';
  }
}
menu_display.prototype = new display()
function menu_display(parent_id,words_database)
{
  this.display_parent=parent_id
  this.words_database=words_database
  this.init=function()
  {
    el = document.getElementById(this.display_parent)
    if(el) el.innerHTML=''
    len=this.words_database.count()
    for(i=0;i<len;i++)
    {
    this.add_div({id:'con_label_'+i, classes:'label', inner_html:this.words_database.get_key(i)+')'})
    this.add_div({id:'con_'+i, inner_html:this.words_database.get_description(i)})
    }
  }
}
level_display.prototype = new display()
function level_display(display_parent)
{
  this.display_parent=display_parent
  this.errors=[]
  this.init=function(chars)
  {
    el = document.getElementById(this.display_parent)
    if(el) el.innerHTML=''
    this.load_letters(chars)
  }
  this.load_letters=function(chars)
  {
   //console.log(chars)
    this.add_div({id:'letters_container'})
    letters_in_current_words=chars.length
    for(i=0;i<letters_in_current_words;i++){
      if(chars[i]=='\n')
        this.add_span({parent:'letters_container', id:'l'+i,classes:"newline letter",inner_html:chars[i]})
       else
        this.add_span({parent:'letters_container', id:'l'+i,classes:"letter "+chars[i],inner_html:chars[i]})
    }
    el = document.getElementById('l0')
    el.className=el.className+' next'
  }
  this.update_letters=function(letter_index)
  {
    el = document.getElementById('l'+(letter_index-1))
    el.className=el.className.replace(/next/, '')
    el.className=el.className+' done'
    el = document.getElementById('l'+letter_index)
    if(el) el.className=el.className+' next'
  }
  this.error_letter=function(letter_index)
  {
    if(isNaN(this.errors[letter_index]))
      this.errors[letter_index]=1
    else if(this.errors[letter_index]<5)
      this.errors[letter_index]++
    el = document.getElementById('l'+letter_index)
    if(el) 
    {
      el.className=el.className.replace(/error\d+/, '')
      el.className=el.className+' error'+this.errors[letter_index]
    }
  }
}
score_display.prototype = new display()
function score_display(parent_id)
{
  this.display_parent=parent_id
  this.init=function()
  {
    el = document.getElementById(this.display_parent)
    if(el) el.innerHTML=''
    this.add_div({id:'word_label', classes:'label', inner_html:'words'})
    this.add_div({id:'word', inner_html:'0'})
    this.add_div({id:'error_label', classes:'label', inner_html:'errors'})
    this.add_div({id:'errors', inner_html:'0'})
    //this.add_div({id:'time_label', classes:'label', inner_html:'time'})
    //this.add_div({id:'time', inner_html:'0'})
    this.add_div({id:'wpm_label', classes:'label', inner_html:'wpm'})
    this.add_div({id:'wpm', inner_html:'0'})
  }
  this.update_totals=function(ob)
  {
    d=new Date
    this.total_time=d.getTime()-ob.start_time
    //el = document.getElementById('time')
    //el.innerHTML=Math.floor(this.total_time/1000)+'.'+Math.ceil(this.total_time/100)%10
    d=null
    el = document.getElementById('word')
    el.innerHTML=Math.round(ob.correct_letters/5)
    el = document.getElementById('errors')
    el.innerHTML=ob.incorrect_letters
    el = document.getElementById('wpm')
    out=Math.floor(((ob.correct_letters/5)-ob.incorrect_letters)/(this.total_time/1000/60))
    if(out<1)
      out='none'
    el.innerHTML=out
  }
}
function menu(display,keys,words_database)
{
  this.display=new menu_display(display.menu,words_database)
  this.keys=keys
  this.words_database=words_database
  this.fg=function()
  {
    this.display.show()
  }
  this.bg=function()
  {
    this.display.hide()
  }
  this.key_action=function(key_code)
  {
    key_char=this.keys.get_char(key_code)
    if(this.words_database.get_words(key_char))
    {
      this.words_database.set_selection(key_char)
      typer.reset_level()
      typer.switch_context('level')
    }
    else if(this.keys.equivalent(key_code,'escape'))
      typer.switch_context('level')
  }
  this.init=function()
  {
    typer.typing=true
    this.display.init()
  }

}
function keys(){
  this.equivalent=function(key_code,letter)
  {
    //console.log(key_code)
    if(this.get_char(key_code)==letter)
      return true
    else
      return false
  }
  this.get_char=function(code)
  {
    if(timers[16])
    {
      //console.log(this.shift_char[code])
      return this.shift_char[code]
    }
    else
      return this.char_char[code]
  }
  this._meta=[0,16,17,18,20,27]
  this.meta=function(key_code)
  {
    if(this._meta.indexOf(key_code)!=-1)
      return true
    else
      return false
  }
  this.char_char=
  {
     8:'backspace'
    ,9:'tab'
    ,13:'\n'
    ,16:'shift'
    ,17:'ctrl'
    ,18:'alt'
    ,19:'pause/break'
    ,20:'caps lock'
    ,27:'escape'
    ,32:' '
    ,33:'page up'
    ,34:'page down'
    ,35:'end'
    ,36:'home'
    ,37:'left arrow'
    ,38:'up arrow'
    ,39:'right arrow'
    ,40:'down arrow'
    ,45:'insert'
    ,46:'delete'
    ,48:'0'
    ,49:'1'
    ,50:'2'
    ,51:'3'
    ,52:'4'
    ,53:'5'
    ,54:'6'
    ,55:'7'
    ,56:'8'
    ,57:'9'
    ,59:';'
    ,61:'='
    ,65:'a'
    ,66:'b'
    ,67:'c'
    ,68:'d'
    ,69:'e'
    ,70:'f'
    ,71:'g'
    ,72:'h'
    ,73:'i'
    ,74:'j'
    ,75:'k'
    ,76:'l'
    ,77:'m'
    ,78:'n'
    ,79:'o'
    ,80:'p'
    ,81:'q'
    ,82:'r'
    ,83:'s'
    ,84:'t'
    ,85:'u'
    ,86:'v'
    ,87:'w'
    ,88:'x'
    ,89:'y'
    ,90:'z'
    ,91:'left window key'
    ,92:'right window key'
    ,93:'select key'
    ,96:'numpad 0'
    ,97:'numpad 1'
    ,98:'numpad 2'
    ,99:'numpad 3'
    ,100:'numpad 4'
    ,101:'numpad 5'
    ,102:'numpad 6'
    ,103:'numpad 7'
    ,104:'numpad 8'
    ,105:'numpad 9'
    ,106:'multiply'
    ,107:'+'
    ,109:'-'
    ,110:'decimal point'
    ,111:'divide'
    ,112:'f1'
    ,113:'f2'
    ,114:'f3'
    ,115:'f4'
    ,116:'f5'
    ,117:'f6'
    ,118:'f7'
    ,119:'f8'
    ,120:'f9'
    ,121:'f10'
    ,122:'f11'
    ,123:'f12'
    ,144:'num lock'
    ,145:'scroll lock'
    ,186:';'
    ,187:'='
    ,188:','
    ,189:'-'
    ,190:'.'
    ,191:'/'
    ,192:'`'
    ,219:'['
    ,220:"\\"
    ,221:']'
    ,222:"'"
  }
  this.shift_char=
  {
     48:')'
    ,49:'!'
    ,50:'@'
    ,51:'#'
    ,52:'$'
    ,53:'%'
    ,54:'^'
    ,55:'&'
    ,56:'*'
    ,57:'('
    ,59:':'
    ,61:'+'
    ,65:'A'
    ,66:'B'
    ,67:'C'
    ,68:'D'
    ,69:'E'
    ,70:'F'
    ,71:'G'
    ,72:'H'
    ,73:'I'
    ,74:'J'
    ,75:'K'
    ,76:'L'
    ,77:'M'
    ,78:'N'
    ,79:'O'
    ,80:'P'
    ,81:'Q'
    ,82:'R'
    ,83:'S'
    ,84:'T'
    ,85:'U'
    ,86:'V'
    ,87:'W'
    ,88:'X'
    ,89:'Y'
    ,90:'Z'
    ,91:'left window key'
    ,92:'right window key'
    ,93:'select key'
    ,96:'numpad 0'
    ,97:'numpad 1'
    ,98:'numpad 2'
    ,99:'numpad 3'
    ,100:'numpad 4'
    ,101:'numpad 5'
    ,102:'numpad 6'
    ,103:'numpad 7'
    ,104:'numpad 8'
    ,105:'numpad 9'
    ,106:'multiply'
    ,107:'+'
    ,109:'_'
    ,110:'decimal point'
    ,111:'divide'
    ,112:'f1'
    ,113:'f2'
    ,114:'f3'
    ,115:'f4'
    ,116:'f5'
    ,117:'f6'
    ,118:'f7'
    ,119:'f8'
    ,120:'f9'
    ,121:'f10'
    ,122:'f11'
    ,123:'f12'
    ,144:'num lock'
    ,145:'scroll lock'
    ,186:':'
    ,187:'+'
    ,188:'<'
    ,189:'dash'
    ,190:'>'
    ,191:'?'
    ,192:'~'
    ,219:'{'
    ,220:'|'
    ,221:'}'
    ,222:'"'
  }
}
function level(display,keys,words){
  this.level_display=new level_display(display.level)
  this.score_display=new score_display(display.score)
  this.keys=keys
  this.words=words
  this.current_letter=0
  this.current_press=0
  this.correct_letters=0
  this.incorrect_letters=0
  this.start_time=0
  this.total_time=0
  this.key_action=function(key_code)
  {
    //console.log(key_code)
    if(this.keys.equivalent(key_code,'escape'))
    {
      typer.switch_context('menu')
      return
    }
    if(this.keys.meta(key_code)==true)
      return
    if(this.current_press==0){
      d=new Date
      this.start_time=d.getTime()
      this.timer=setInterval(function(){typer.level.update_score()},807)
      d=null
    }
    this.current_press++
    //put this in the keys I think
    letter=this.words[this.current_letter]
    if(this.keys.equivalent(key_code,letter))
    {
      this.correct_letters++
      this.current_letter++
      this.level_display.update_letters(this.current_letter)
      if(this.current_letter==this.words.length)
        this.complete()
    }
    else
    {
      this.incorrect_letters++
      this.level_display.error_letter(this.current_letter)
    }
  }
  this.update_score=function()
  {
    this.score_display.update_totals({
      correct_letters:this.correct_letters
      ,current_press:this.current_press
      ,incorrect_letters:this.incorrect_letters
      ,total_time:this.total_time
      ,start_time:this.start_time
    })
  }
  this.complete=function()
  {
    this.update_score()
    d=new Date
    this.total_time=d.getTime-this.start_time
    clearInterval(this.timer)
    delete this.timer
    this.typing=false
  }
  this.fg=function()
  {
    this.level_display.show()
    this.score_display.show()
  }
  this.bg=function()
  {
    this.level_display.hide()
    this.score_display.hide()
  }
  this.init=function()
  {
    typer.typing=true
    this.level_display.init(this.words)
    this.score_display.init()
  }
}
function store()
{
  this.set_value=function(key,value)
  {
    this.set_cookie(key,value)
  }
  this.set_cookie=function(key,value)
  {
    d = new Date();
    d.setTime(d.getTime()+(365*24*60*60*1000));
    expires = "; expires="+d.toGMTString();
    document.cookie = key+'='+value+'; expires='+expires+' path=/'
  }
  this.get_value=function(key)
  {
    return this.get_cookie_value(key)
  }
  this.get_cookie_value=function(name)
  {
    cookie=document.cookie
    i=0
    split_values=cookie.split(";")
    length=split_values.length
    for(i=0;i<length;i++)
    {
      split_keys=split_values[i].split("=")
      split_keys[0]=split_keys[0].replace(/^ /,"")
      if(split_keys[0]==name) return split_keys[1]
    }
    return ""
  }
}
function typer(){
  this.keys=new keys()
  this.words_database=new words_database()
  this.words_database.init()
  this.display=new display('menu_display_area','level_display_area','score_display_area')
  this.menu=new menu(this.display,this.keys,this.words_database)
  this.level=new level(this.display,this.keys,this.words_database.get_selected())
  this.key_action=function(key_code)
  {
    if(this.context=='menu')
      this.menu.key_action(key_code)
    else if(this.context=='level')
      this.level.key_action(key_code)
    else
      this.switch_context('menu')
  }
  this.reset_level=function()
  {
    delete(this.level)
    this.level=new level(this.display,this.keys,this.words_database.get_selected())
    this.level.init()
  }
  this.switch_context=function(context)
  {
    if (context=='level')
    {
      this.context='level'
      store.set_value('context','level')
      this.menu.bg()
      this.level.fg()
    }
    else
    {
      this.context='menu'
      store.set_value('context','menu')
      this.level.bg()
      this.menu.fg()
    }
  }
  this.init=function()
  {
    this.display.init()
    this.level.init()
    this.menu.init()
    context=store.get_value('context')
    //console.log(context)
    this.switch_context(context)
  }
}
var timers=[]
var repeat=250
var store=new store()
var typer=new typer()
document.onkeydown=function (evt)
{
  //console.log('d'+evt.keyCode)
  //console.log('d_char'+evt.charCode)
  key=evt.keyCode
  if(typer.typing && !timers[key]){
    typer.key_action(key)
    if (repeat!==0)
      timers[key]= setInterval('typer.key_action('+key+')', repeat)
  }
  if(key==222||key==191)
    return false
}
document.onkeypress=function (evt)
{
  //console.log('press'+evt.keyCode)
  //console.log('press_char'+evt.charCode)
}
document.onkeyup=function (evt)
{
  key=evt.keyCode
  //console.log('u'+key)
  if (timers[key]!==null)
    clearInterval(timers[key])
  delete timers[key]
}
document.onblur=function ()
{
  for(key in timers){
    clearInterval(timers[key])
    delete timers[key]
  }
}

