function level(display,keys,words){
  this.level_display=new level_display(display.level)
  this.score_display=new score_display(display.score)
  this.keys=keys
  this.words=words
  this.current_letter=0
  this.current_press=0
  this.correct_letters=0
  this.incorrect_letters=0
  this.start_time=0
  this.total_time=0
  this.key_action=function(key_code)
  {
    //console.log(key_code)
    if(this.keys.meta(key_code)==true)
      return
    if(this.current_press==0){
      d=new Date
      this.start_time=d.getTime()
      this.timer=setInterval(function(){typer.level.update_score()},807)
      d=null
    }
    this.current_press++
    //put this in the keys I think
    letter=this.words[this.current_letter]
    if(this.keys.equivalent(key_code,letter))
    {
      this.correct_letters++
      this.current_letter++
      this.level_display.update_letters(this.current_letter)
      if(this.current_letter==this.words.length)
        this.complete()
    }
    else
      this.incorrect_letters++
  }
  this.update_score=function()
  {
    this.score_display.update_totals({
      correct_letters:this.correct_letters
      ,current_press:this.current_press
      ,incorrect_letters:this.incorrect_letters
      ,total_time:this.total_time
      ,start_time:this.start_time
    })
  }
  this.complete=function()
  {
    this.update_score()
    d=new Date
    this.total_time=d.getTime-this.start_time
    clearInterval(this.timer)
    delete this.timer
    this.typing=false
  }
  this.init=function()
  {
    typer.typing=true
    this.level_display.init(this.words)
    this.score_display.init()
  }
}
