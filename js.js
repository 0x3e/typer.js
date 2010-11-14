var timers=[]
var repeat=250
var display=new display()
display.typing=true
document.onkeydown=function (evt){
  if(display.typing){
    key=evt.keyCode
    display.key_action(key)
    if (repeat!==0)
      timers[key]= setInterval('display.key_action(key)', repeat)
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
