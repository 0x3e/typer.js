var store=new Store()
var typer=new Typer(document)
if(window['typer']===undefined)
{
  window['typer']=typer
  typer['key_action']=function(a){typer.key_action(a)}
}
window.onload = typer.init();
