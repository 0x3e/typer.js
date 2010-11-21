function menu(display,keys,words_database)
{
  this.display=new menu_display(display.menu)
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
    if(this.keys.equivalent(key_code,'a'))
    {
      this.words_database.set_selection('a')
      typer.reset_level()
      typer.switch_context('level')
    }
    if(this.keys.equivalent(key_code,'b'))
    {
      this.words_database.set_selection('b')
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
