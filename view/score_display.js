score_display=function(parent_id)
{
  this.display_parent=parent_id
}
score_display.prototype = new display()
score_display.prototype.init=function()
{
  el = document.getElementById(this.display_parent)
  if(el) el.innerHTML=''
  this.add_div({id:'word_label', classes:'score_label label', inner_html:'words'})
  this.add_div({id:'word', inner_html:'0'})
  this.add_div({id:'error_label', classes:'score_label label', inner_html:'errors'})
  this.add_div({id:'errors', inner_html:'0'})
  //this.add_div({id:'time_label', classes:'label', inner_html:'time'})
  //this.add_div({id:'time', inner_html:'0'})
  this.add_div({id:'wpm_label', classes:'score_label label', inner_html:'wpm'})
  this.add_div({id:'wpm', inner_html:'0'})
  this.add_div({id:'best_wpm_label', classes:'score_label label', inner_html:'best'})
  this.add_div({id:'best_wpm', inner_html:'0'})
}
score_display.prototype.update_totals=function(tot,correct,errors,wpm,best)
{
  el = document.getElementById('word')
  el.innerHTML=Math.round(correct/5)
  el = document.getElementById('errors')
  el.innerHTML=errors
  el = document.getElementById('wpm')
  if(wpm<1)
    wpm='nil'
  el.innerHTML=wpm
  el = document.getElementById('best_wpm')
  el.innerHTML=best
}
