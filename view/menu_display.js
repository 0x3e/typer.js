/**
 * @constructor
*/
Menu_Display=function(parent_id,words_database)
{
  this.display_parent=parent_id;
  this.words_database=words_database;
};
Menu_Display.prototype = new Display();
Menu_Display.prototype.init=function()
{
  var el = document.getElementById(this.display_parent);
  var len=this.words_database.count();
  if(el){el.innerHTML='';}
  for(var i=0;i<len;i++)
  {
    this.add_div({id:'con_label_'+i, classes:'menu_label label', inner_html:this.words_database.get_key(i)+')'});
    this.add_div({id:'con_'+i, classes:'con', inner_html:this.words_database.get_description(i)});
    this.add_div({id:'aut_'+i, classes:'aut', inner_html:':'+this.words_database.get_author(i)});
  }
};
