function typer(){
  this.test_words='Hello world how are you today.'
  this.display=new display()
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
      this.timer=setInterval('typer.update_display()',107)
      d=null
    }
    if(counts)
      this.current_press++
    if(timers[16])
      letter=this.test_words[this.current_letter].toLowerCase()
    else
      letter=this.test_words[this.current_letter]
    if(this.keys.codes[key_code]==letter){
      this.correct_letters++
      this.current_letter++
      this.display.update_letters(this.current_letter)
      if(this.current_letter==this.test_words.length)
        this.complete()
    }
    else if(counts)
      this.incorrect_letters++
  }
	this.update_display=function(){
    this.display.update_totals({
	 		correct_letters:this.correct_letters
      ,current_press:this.current_press
      ,incorrect_letters:this.incorrect_letters
      ,total_time:this.total_time
      ,start_time:this.start_time
		})
	}
  this.complete=function(){
		this.update_display()
    clearInterval(this.timer)
    delete this.timer
    this.typing=false
  }
  this.init=function(){
    this.display.init(this.test_words)
  }
}
