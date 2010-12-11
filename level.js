level=function(typer)
{
  this.typer=typer
  this.level_display=new level_display(typer.display.level)
  this.keys=typer.keys
  this.words_database=typer.words_database
  this.score=new score(typer.display.score,this.words_database)
  this.words=typer.words_database.get_selected_words()
  this.current_letter=0
  this.current_press=0
  this.correct_letters=0
  this.incorrect_letters=0
  this.start_time=0
  this.total_time=0
}
level.prototype.key_action=function(key_code)
{
  if(key_code==undefined)
    return false
  if(this.keys.meta(key_code)===true)
    return true
  if(this.current_press===0){
    d=new Date
    this.start_time=d.getTime()
    this.timer=setInterval(function(){this.typer.level.update_score()},407)
    d=null
  }
  this.current_press++
  letter=this.words[this.current_letter]
  if(this.keys.equivalent(key_code,letter))
  {
    this.correct_letters++
    this.current_letter++
    this.level_display.update_letters(this.current_letter)
    if(this.current_letter==this.words.length)
      this.complete()
    return true
  }
  else
  {
    this.incorrect_letters++
    this.level_display.error_letter(this.current_letter)
  }
  return false
}
level.prototype.update_score=function()
{
  this.score.display.update_totals({
    correct_letters:this.correct_letters
  , current_press:this.current_press
  , incorrect_letters:this.incorrect_letters
  , start_time:this.start_time
  })
  return true
}
level.prototype.complete=function()
{
  this.update_score()
  this.score.display.show()
  d=new Date
  this.total_time=d.getTime()-this.start_time
  clearInterval(this.timer)
  delete this.timer
  this.typing=false
  new_score={
    c:this.correct_letters
  , i:this.incorrect_letters
  , t:this.total_time
  , s:this.start_time
  }
  this.score.update(new_score)
  return true
}
level.prototype.fg=function()
{
  return this.level_display.show()
}
level.prototype.bg=function()
{
  return this.level_display.hide()
}
level.prototype.init=function()
{
  this.typer.typing=true
  this.level_display.init(this.words)
  this.score.display.init()
  this.score.display.hide()
  return true
}
