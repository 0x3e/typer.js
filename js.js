var timers=[]
var repeat=250
var store=new store()
var typer=new typer()
document.onkeydown=function (evt)
{
  //console.log('d'+evt.keyCode)
  //console.log('d_char'+evt.charCode)
  var key=evt.keyCode
  if(typer.typing && !timers[key]){
    typer.key_action(key)
    if (repeat!==0)
      timers[key]= setInterval('typer.key_action('+key+')', repeat)
  }
  if(key==222||key==191||key==32)
    return false
}
document.onkeypress=function (evt)
{
  //console.log('press'+evt.keyCode)
  //console.log('press_char'+evt.charCode)
}
document.onkeyup=function (evt)
{
  key=evt.keyCode
  //console.log('u'+key)
  if (timers[key]!==null)
    clearInterval(timers[key])
  delete timers[key]
}
document.onblur=function ()
{
  for(key in timers){
    clearInterval(timers[key])
    delete timers[key]
  }
}
if(window['typer']==undefined)
{
  window['typer']=typer
  typer['key_action']=function(a){typer.key_action(a)}
}
window.onload = typer.init();
