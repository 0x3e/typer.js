level_display.prototype = new display()
function level_display(display_parent)
{
  this.display_parent=display_parent
  this.init=function(chars)
  {
    el = document.getElementById(this.display_parent)
    if(el) el.innerHTML=''
    this.load_letters(chars)
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
  this.update_letters=function(current_letter)
  {
    el = document.getElementById('l'+(current_letter-1))
    el.className=el.className.replace(/next/, '')
    el.className=el.className+' done'
    el = document.getElementById('l'+current_letter)
    if(el) el.className=el.className+' next'
  }
  this.error_letter=function(current_letter)
  {
    el = document.getElementById('l'+current_letter)
    if(el) el.className=el.className+' error'
  }
}
