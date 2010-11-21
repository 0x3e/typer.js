menu_display.prototype = new display()
function menu_display(parent_id)
{
  this.display_parent=parent_id
  this.init=function()
  {
    el = document.getElementById(this.display_parent)
    if(el) el.innerHTML=''
    this.add_div({id:'con_label_1', classes:'label', inner_html:'a)'})
    this.add_div({id:'con_1', inner_html:'easy'})
    this.add_div({id:'con_label_2', classes:'label', inner_html:'b)'})
    this.add_div({id:'con_1', inner_html:'medium'})
  }
}
