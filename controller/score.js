/**
 * @constructor
*/
Score=function(display_parent,words_database)
{
  this.display=new Score_Display(display_parent)
}
Score.prototype.update=function(key,score)
{
  if(
      score['c']===undefined
    ||score['i']===undefined
    ||score['t']===undefined
    ||score['s']===undefined
  )
    return false
  var level_scores=this.get_level_scores(key)
  try{level_scores.push(score)}
  catch(e){level_scores=[score]}
  var score_ob=JSON.stringify(level_scores)
  if(key) store.set(key,score_ob)
  return true
}
Score.prototype.get_level_scores=function(key)
{
  var level_scores=store.get(key)
  if(level_scores)
  {
    try{level_scores=JSON.parse(level_scores)}
    catch(e){level_scores=[]}
  }
  if(level_scores)
    return level_scores
  return false
}
Score.prototype.get_best=function(key)
{
  var level_scores=this.get_level_scores(key)
  var best_wpm=0;
  for(i=0,ii=level_scores.length;i<ii;i++)
  {
    score=level_scores[i]
    wpm=this.calculate_wpm(score)
    if(wpm>best_wpm) best_wpm=wpm
  }
  if(best_wpm)
    return best_wpm
  return false
}
Score.prototype.calculate_wpm=function(ob)
{
  return Math.floor(((ob['c']/5)-ob['i'])/(ob['t']/1000/60))
}
