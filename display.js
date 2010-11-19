function display()
{
  this.init=function(chars)
  {
    this.load_letters(chars)
    this.add_div({id:'word_label', classes:'label', inner_html:'words'})
    this.add_div({id:'word', inner_html:'0'})
    this.add_div({id:'error_label', classes:'label', inner_html:'errors'})
    this.add_div({id:'errors', inner_html:'0'})
    this.add_div({id:'time_label', classes:'label', inner_html:'time'})
    this.add_div({id:'time', inner_html:'0'})
    this.add_div({id:'wpm_label', classes:'label', inner_html:'wpm'})
    this.add_div({id:'wpm', inner_html:'0'})
  }
  this.add_div=function(ob)
  {
    ob.element="div"
    this.add_element(ob)
  }
  this.add_span=function(ob)
  {
    ob.element="span"
    this.add_element(ob)
  }
  this.add_element=function(ob)
  {
    div = document.createElement(ob.element)
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
  this.load_letters=function(chars)
  {
   //console.log(chars)
    this.add_div({id:'letters_container'})
    letters_in_current_words=chars.length
    for(i=0;i<letters_in_current_words;i++){
      if(chars[i]=='\n')
        this.add_span({parent:'letters_container', id:'l'+i,classes:"newline letter",inner_html:chars[i]})
       else
        this.add_span({parent:'letters_container', id:'l'+i,classes:"letter "+chars[i],inner_html:chars[i]})
    }
    el = document.getElementById('l0')
    el.className=el.className+' next'
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
  this.update_letters=function(current_letter)
  {
    el = document.getElementById('l'+(current_letter-1))
    el.className=el.className.replace(/next/, '')
    el.className=el.className+' done'
    el = document.getElementById('l'+current_letter)
    if(el) el.className=el.className+' next'
  }
}
