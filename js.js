var timers=[]
var repeat=250
var typer=new typer()
document.onkeydown=function (evt)
{
  //console.log('d'+evt.keyCode)
  //console.log('d_char'+evt.charCode)
  if(typer.typing){
    key=evt.keyCode
    typer.key_action(key)
    if (repeat!==0)
      timers[key]= setInterval('typer.key_action('+key+')', repeat)
  }
  if(key==222||key==191)
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

