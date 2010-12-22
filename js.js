"use strict";
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
/*jslint sub: false */
window.onload = typer.init();
