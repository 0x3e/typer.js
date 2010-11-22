level_display.prototype = new display()
function level_display(display_parent)
{
  this.display_parent=display_parent
  this.errors=[]
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
  this.update_letters=function(letter_index)
  {
    el = document.getElementById('l'+(letter_index-1))
    el.className=el.className.replace(/next/, '')
    el.className=el.className+' done'
    el = document.getElementById('l'+letter_index)
    if(el) el.className=el.className+' next'
  }
  this.error_letter=function(letter_index)
  {
    if(isNaN(this.errors[letter_index]))
      this.errors[letter_index]=1
    else if(this.errors[letter_index]<5)
      this.errors[letter_index]++
    el = document.getElementById('l'+letter_index)
    if(el) 
    {
      el.className=el.className.replace(/error\d+/, '')
      el.className=el.className+' error'+this.errors[letter_index]
    }
  }
}
