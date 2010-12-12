score=function(display_parent,words_database)
{
  this.display=new score_display(display_parent)
}
score.prototype.update=function(key,score)
{
  var level_scores=store.get(key)
  if(level_scores)
  {
    try{level_scores=JSON.parse(level_scores)}
    catch(e){level_scores=[]}
  }
  var n_score={
    "c":score['correct_letters']
  , "i":score['incorrect_letters']
  , "t":score['total_time']
  , "s":score['start_time']
  }
  try{level_scores.push(n_score)}
  catch(e){level_scores=[n_score]}
  var score_ob=JSON.stringify(level_scores)
  if(key) store.set(key,score_ob)
  return true
}
