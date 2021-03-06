"use strict";
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
