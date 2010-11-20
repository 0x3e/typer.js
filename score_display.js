score_display.prototype = new display()
function score_display(parent_id)
{
  this.display_parent=parent_id
  this.init=function()
  {
    el = document.getElementById(this.display_parent)
    if(el) el.innerHTML=''
    this.add_div({id:'word_label', classes:'label', inner_html:'words'})
    this.add_div({id:'word', inner_html:'0'})
    this.add_div({id:'error_label', classes:'label', inner_html:'errors'})
    this.add_div({id:'errors', inner_html:'0'})
    this.add_div({id:'time_label', classes:'label', inner_html:'time'})
    this.add_div({id:'time', inner_html:'0'})
    this.add_div({id:'wpm_label', classes:'label', inner_html:'wpm'})
    this.add_div({id:'wpm', inner_html:'0'})
  }
  this.update_totals=function(ob)
  {
    d=new Date
    el = document.getElementById('time')
    this.total_time=d.getTime()-ob.start_time
    el.innerHTML=Math.floor(this.total_time/1000)+'.'+Math.ceil(this.total_time/100)%10
    d=null
    el = document.getElementById('word')
    el.innerHTML=Math.round(ob.correct_letters/5)
    el = document.getElementById('errors')
    el.innerHTML=ob.incorrect_letters
    el = document.getElementById('wpm')
    el.innerHTML=Math.floor((ob.correct_letters/5)/(this.total_time/1000/60))
  }
}
