function menu(typer)
{
  this.typer=typer
  this.display=new menu_display(typer.display.menu,typer.words_database)
  this.keys=typer.keys
  this.words_database=typer.words_database
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
      this.typer.reset_level()
      this.typer.switch_context('level')
    }
  }
  this.init=function()
  {
    this.typer.typing=true
    this.display.init()
  }

}
