menu_display.prototype = new display()
function menu_display(parent_id,words_database)
{
  this.display_parent=parent_id
  this.words_database=words_database
  this.init=function()
  {
    el = document.getElementById(this.display_parent)
    if(el) el.innerHTML=''
    len=this.words_database.count()
    for(i=0;i<len;i++)
    {
    this.add_div({id:'con_label_'+i, classes:'menu_label label', inner_html:this.words_database.get_key(i)+')'})
    this.add_div({id:'con_'+i, classes:'con', inner_html:this.words_database.get_description(i)})
    this.add_div({id:'aut_'+i, classes:'aut', inner_html:':'+this.words_database.get_author(i)})
    }
  }
}
