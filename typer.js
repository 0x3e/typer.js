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
      console.log('context error')
  }
  this.reset_level=function()
  {
    delete(this.level)
    this.level=new level(this.display,this.keys,this.words_database.get_selected())
    this.level.init()
  }
  this.switch_context=function(context)
  {
    d = new Date();
    d.setTime(d.getTime()+(24*60*60*1000));
    expires = "; expires="+d.toGMTString();
    if (context=='level')
    {
      this.context='level'
      document.cookie = 'context=level; expires='+expires+' path=/'
      this.menu.bg()
      this.level.fg()
    }
    else
    {
      this.context='menu'
      document.cookie = 'context=menu; expires='+expires+' path=/'
      this.level.bg()
      this.menu.fg()
    }
  }
  this.init=function()
  {
    this.display.init()
    this.level.init()
    this.menu.init()
    context=get_cookie_value('context')
    console.log(context)
    this.switch_context(context)
  }
}
