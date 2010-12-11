score=function(display_parent,words_database)
{
  this.display=new score_display(display_parent)
  this.words_database=words_database
}
score.prototype.update=function(new_score)
{
  cur_score=store.get(this.words_database.get_selected_url())
  if(cur_score)
  {
    try{cur_score_json=JSON.parse(cur_score)}
    catch(e){cur_score_json={}}
  }
  var key=this.words_database.get_selected_url()
  var value=JSON.stringify(new_score)
  store.set(key,value)
}
