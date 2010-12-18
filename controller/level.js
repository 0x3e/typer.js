/**
 * @constructor
*/
Level=function(typer)
{
  this.typer=typer
  this.level_display=new Level_Display(typer.display.level)
  this.keys=typer.keys
  this.words_database=typer.words_database
  this.score=new Score(typer.display.score,this.words_database)
  this.words=typer.words_database.get_selected_words()
  this.current_letter=0
  this.current_press=0
  this.correct_letters=0
  this.incorrect_letters=0
  this.start_time=0
  this.total_time=0
}
Level.prototype.key_action=function(key_code)
{
  if(key_code===undefined)
    return false
  if(this.keys.meta(key_code)===true)
    return true
  if(this.current_press===0){
    var d=new Date
    this.start_time=d.getTime()
    var lev=this
    d=null
  }
  this.current_press++
  var letter=this.words[this.current_letter]
  if(this.keys.equivalent(key_code,letter))
  {
    this.correct_letters++
    this.current_letter++
    this.level_display.update_letters(this.current_letter)
    if(this.current_letter===this.words.length)
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
Level.prototype.complete=function()
{
  var d=new Date
  this.total_time=d.getTime()-this.start_time
  this.typing=false
  var new_score={
    "c":this.correct_letters
  , "i":this.incorrect_letters
  , "t":this.total_time
  , "s":this.start_time
  }
  level=this.words_database.get_selected_url()
  this.score.update(level,new_score)
  var best=this.score.get_best(level)
  var wpm=this.score.calculate_wpm(new_score)
  this.score.display.update_totals(
     this.total_time
    ,this.correct_letters
    ,this.incorrect_letters
    ,wpm
    ,best
  )
  this.score.display.show()
  return true
}
Level.prototype.fg=function()
{
  return this.level_display.show()
}
Level.prototype.bg=function()
{
  return this.level_display.hide()
}
Level.prototype.init=function()
{
  this.typer.typing=true
  this.level_display.init(this.words)
  this.score.display.init()
  this.score.display.hide()
  return true
}
