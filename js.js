var timers=[]
var repeat=250
var typer=new typer()
document.onkeydown=function (evt)
{
  //console.log('d'+evt.keyCode)
  //console.log('d_char'+evt.charCode)
  key=evt.keyCode
  if(typer.typing){
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
function get_cookie_value(name)
{
  cookie=document.cookie
  i=0
  split_values=cookie.split(";")
  length=split_values.length
  for(i=0;i<length;i++)
  {
    split_keys=split_values[i].split("=")
    split_keys[0]=split_keys[0].replace(/^ /,"")
    if(split_keys[0]==name) return split_keys[1]
  }
  return ""
}

