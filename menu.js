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
  }
  this.init=function()
  {
    typer.typing=true
    this.display.init()
  }

}
