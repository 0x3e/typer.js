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
