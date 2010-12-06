function typer()
{
  this.context='menu'
  this.keys=new keys()
  this.words_database=new words_database()
  this.words_database.init()
  this.display=new display('menu_display_area','level_display_area','score_display_area')
  this.menu=new menu(this.display,this.keys,this.words_database)
  this.level=new level(this.display,this.keys,this.words_database)
  this.key_action=function(key_code)
  {
    if(this.keys.equivalent(key_code,'escape'))
    {
      this.switch_context()
      return
    }
    //console.log(key_code)
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
    this.level=new level(this.display,this.keys,this.words_database)
    this.level.init()
  }
  this.switch_context=function()
  {
    if (this.context=='menu')
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
  this.set_context=function(context)
  {
    if (context=='level')
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
  this.init=function()
  {
    this.display.init()
    this.level.init()
    this.menu.init()
    context=store.get('context')
    //console.log(context)
    this.set_context(context)
  }
}
window['typer']=typer
typer['key_action']=function(a){typer.key_action(a)}
