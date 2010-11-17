var timers=[]
var repeat=250
var typer=new typer()
typer.typing=true
document.onkeydown=function (evt){
  if(typer.typing){
    key=evt.keyCode
    typer.key_action(key)
    if (repeat!==0)
      timers[key]= setInterval('typer.key_action(key)', repeat)
  }
}
document.onkeyup=function (evt){
  key=evt.keyCode
  if (key in timers) {
    if (timers[key]!==null)
      clearInterval(timers[key])
    delete timers[key]
  }
}
document.onblur=function (){
  for(key in timers){
    clearInterval(timers[key])
    delete timers[key]
  }
}

