function display(){
  this.add_div=function(ob){
    div = document.createElement('div')
    div.id=ob.id
    if(ob.classes)
      div.className=ob.classes
    if(ob.inner_html)
      div.innerHTML=ob.inner_html
    if(ob.parent){
      el = document.getElementById(ob.parent)
      el.appendChild(div)
    }
    else
      document.body.appendChild(div)
  }
  this.init=function(chars){
    this.load_letters(chars)
    this.add_div({id:'keyDowns_label', classes:'label', inner_html:'Total keys'})
    this.add_div({id:'keyDowns', inner_html:'0'})
    this.add_div({id:'word_label', classes:'label', inner_html:'Total words'})
    this.add_div({id:'word', inner_html:'0'})
    this.add_div({id:'error_label', classes:'label', inner_html:'Total errors'})
    this.add_div({id:'errors', inner_html:'0'})
    this.add_div({id:'time_label', classes:'label', inner_html:'Total time'})
    this.add_div({id:'time', inner_html:'0'})
    this.add_div({id:'wpm_label', classes:'label', inner_html:'Total wpm'})
    this.add_div({id:'wpm', inner_html:'0'})
  }
  this.current_letter=0
  this.load_letters=function(chars){
   //console.log(chars)
    this.add_div({id:'letters_container'})
    letters_in_current_words=chars.length
    for(i=0;i<letters_in_current_words;i++){
      this.add_div({parent:'letters_container', id:'l'+i,classes:"letter "+chars[i],inner_html:chars[i]})
    }
    el = document.getElementById('l0')
    el.className=el.className+' next'
  }
  this.update_totals=function(ob){
    d=new Date
    el = document.getElementById('time')
    this.total_time=d.getTime()-ob.start_time
    el.innerHTML=Math.round(this.total_time/100)/10
    d=null
    el = document.getElementById('keyDowns')
    el.innerHTML=ob.current_press
    el = document.getElementById('word')
    el.innerHTML=Math.round(ob.correct_letters/5)
    el = document.getElementById('errors')
    el.innerHTML=ob.incorrect_letters
    el = document.getElementById('wpm')
    el.innerHTML=Math.floor((ob.correct_letters/5)/(this.total_time/1000/60))
  }
  this.update_letters=function(current_letter){
      el = document.getElementById('l'+(current_letter-1))
      el.className=el.className.replace(/next/, '')
      el.className=el.className+' done'
      el = document.getElementById('l'+current_letter)
      if(el) el.className=el.className+' next'
  }
}
