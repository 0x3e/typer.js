function display(ob)
{
  if(ob){
    this.menu=ob.menu
    this.level=ob.level
    this.score=ob.score
    this.display_parent='body'
  }
  this.init=function()
  {
    this.add_div({id:this.menu, classes:'menu', inner_html:'menu'})
    this.add_div({id:this.level, classes:'level', inner_html:'level'})
    this.add_div({id:this.score, classes:'score', inner_html:'score'})
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
    {
      el = document.getElementById(this.display_parent)
      if(!el) el=document.body
      el.appendChild(div)
    }
  }
  this.hide=function()
  {
    el = document.getElementById(this.display_parent)
    if(el) el.style.display = 'none';
  }
  this.show=function()
  {
    el = document.getElementById(this.display_parent)
    if(el) el.style.display = 'block';
  }
}
