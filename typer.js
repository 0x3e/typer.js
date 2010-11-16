function typer(){
  this.test_words='Hello world how are you today.'
  this.keys=new keys()
  this.current_letter=0
  this.current_press=0
  this.correct_letters=0
  this.incorrect_letters=0
  this.start_time=0
  this.total_time=0
  this.typing=false
  this.key_action=function(key_code){
    //console.log(key_code)
    if(this.keys.not_count.indexOf(key_code)==-1)
      counts=true
    else
      counts=false
    if(this.current_press==0&&counts){
      d=new Date
      this.start_time=d.getTime()
      display.timer=setInterval('display.update_totals({correct_letters:typer.correct_letters,current_press:typer.current_press,incorrect_letters:typer.incorrect_letters,total_time:typer.total_time,start_time:typer.start_time})',107)
      d=null
    }
    if(counts)
      this.current_press++;
    if(timers[16])
      letter=this.test_words[this.current_letter].toLowerCase()
    else
      letter=this.test_words[this.current_letter]
    if(this.keys.codes[key_code]==letter){
      this.correct_letters++
      this.current_letter++
      display.update_letters(this.current_letter)
      if(this.current_letter==this.test_words.length)
        this.complete()
    }
    else if(counts)
      this.incorrect_letters++
  }
  this.complete=function(){
    clearInterval(display.timer)
    delete display.timer
    this.typing=false
  }
  this.init=function(){
    display.init(this.test_words)
  }
}
