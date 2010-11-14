function display(){
  this.current_letter=0;
  this.current_press=0;
  this.correct_letters=0
  this.incorrect_letters=0
  this.start_time=0;
  this.total_time=0;
  this.key_action=function(key_code){
    //console.log(key_code)
    if(this.keys.not_count.indexOf(key_code)==-1)
      counts=true
    else
      counts=false
    if(this.current_press==0&&counts){
      d=new Date
      this.start_time=d.getTime()
      this.timer=setInterval('display.update_time()', 107)
      d=null
    }
    if(counts)
      this.current_press++;
    if(timers[16])
      letter=this.test_words[this.current_letter].toLowerCase()
    else
      letter=this.test_words[this.current_letter]
    if(this.keys.codes[key_code]==letter){
      this.correct_letters++
      el = document.getElementById('l'+this.current_letter)
      el.className=el.className.replace(/next/, '');
      el.className=el.className+' done'
      this.current_letter++
      el = document.getElementById('l'+this.current_letter)
      if(el)
        el.className=el.className+' next'
      else
        this.complete()
    }
    else if(counts)
      this.incorrect_letters++
    el = document.getElementById('keyDowns')
    el.innerHTML=this.current_press
    el = document.getElementById('word')
    el.innerHTML=Math.round(this.correct_letters/5)
    el = document.getElementById('errors')
    el.innerHTML=this.incorrect_letters
    el = document.getElementById('wpm')
    el.innerHTML=Math.floor((this.correct_letters/5)/(this.total_time/1000/60))
  }
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
  this.init=function(){
    this.load_letters()
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
  this.test_words='Hello world how are you today.'
  this.current_letter=0
  this.load_letters=function(){
    this.add_div({id:'letters_container'})
    letters_in_current_words=this.test_words.length
    for(i=0;i<letters_in_current_words;i++){
      this.add_div({parent:'letters_container', id:'l'+i,classes:"letter "+this.test_words[i],inner_html:this.test_words[i]})
    }
    el = document.getElementById('l0')
    el.className=el.className+' next'
  }
  this.keys=new keys()
  this.update_time=function(){
    d=new Date
    el = document.getElementById('time')
    this.total_time=d.getTime()-this.start_time
    el.innerHTML=Math.round(this.total_time/100)/10
    d=null
  }
  this.complete=function(){
    clearInterval(this.timer)
    delete this.timer
    el = document.getElementById('wpm')
    el.innerHTML=Math.round((this.correct_letters/5)/(this.total_time/1000/60))
  }
}
