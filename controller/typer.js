/**
 * @constructor
*/
Typer=function(parent_ob)
{
  this.repeat=250
  var repeat=this.repeat
  this.timers=[]
  var timers=this.timers
  var that=this
  this.context='menu'
  this.keys=new Keys(timers)
  this.words_database=new Words_Database()
  this.words_database.init()
  this.display=new Display({menu:'menu_display_area',level:'level_display_area',score:'score_display_area'})
  this.menu=new Menu(this)
  this.level=new Level(this)

  parent_ob.onkeydown=function (evt)
  {
    //console.log('d'+evt.keyCode)
    //console.log('d_char'+evt.charCode)
    var key=evt.keyCode
    if(that.typing && !timers[key]){
      that.key_action(key)
      if (repeat!==0)
        timers[key]= setInterval('typer.key_action('+key+')', repeat)
    }
    if(key===222||key===191||key===32)
      return false
  }
  parent_ob.onkeypress=function (evt)
  {
    //console.log('press'+evt.keyCode)
    //console.log('press_char'+evt.charCode)
  }
  parent_ob.onkeyup=function (evt)
  {
    var key=evt.keyCode
    //console.log('u'+key)
    if (timers[key]!==null)
      clearInterval(timers[key])
    delete timers[key]
  }
  parent_ob.onblur=function ()
  {
    for(var key in timers){
      clearInterval(timers[key])
      delete timers[key]
    }
  }
}
Typer.prototype.key_action=function(key_code)
{
  if(this.keys.equivalent(key_code,'escape'))
  {
    this.switch_context()
    return
  }
  //console.log(key_code)
  if(this.context==='menu')
    this.menu.key_action(key_code)
  else if(this.context==='level')
    this.level.key_action(key_code)
  else
    this.switch_context('menu')
}
Typer.prototype.reset_level=function()
{
  delete(this.level)
  this.level=new Level(this)
  this.level.init()
}
Typer.prototype.switch_context=function()
{
  if (this.context==='menu')
  {
    this.context='level'
    store.set('context','level')
    this.menu.bg()
    this.level.fg()
  }
  else
  {
    this.context='menu'
    store.set('context','menu')
    this.level.bg()
    this.menu.fg()
  }
}
Typer.prototype.set_context=function(context)
{
  if (context==='level')
  {
    this.context='level'
    store.set('context','level')
    this.menu.bg()
    this.level.fg()
  }
  else
  {
    this.context='menu'
    store.set('context','menu')
    this.level.bg()
    this.menu.fg()
  }
}
Typer.prototype.init=function()
{
  this.display.init()
  this.level.init()
  this.menu.init()
  var context=store.get('context')
  //console.log(context)
  this.set_context(context)
}
