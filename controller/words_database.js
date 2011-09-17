"use strict";
/**
 * @constructor
*/
/*global Words_Database:true,Words_List,store */
var Words_Database=function()
{
  this.selection='a';
  this.words_keys=[];
  this.words_values=[];
  this.words_descriptions=[];
  this.words_author=[];
  this.words_url=[];
};
Words_Database.prototype.init=function()
{
  var word_list,store_selection;
  word_list=new Words_List();
  this.load(word_list.get_list());
  store_selection=store.get('word_database_selected');
  if(store_selection){this.set_selection(store_selection);}
  else{this.set_selection('a');}
};
Words_Database.prototype.set_selection=function(sel)
{
  if(this.get_words(sel))
  {
    store.set('word_database_selected',sel);
    this.selection=sel;
    this.selection_index=this.words_keys.indexOf(sel);
    return true;
  }
  return false;
};
Words_Database.prototype.get_selected_words=function()
{
  return this.words_values[this.selection_index];
};
Words_Database.prototype.get_selected_url=function()
{
  return this.words_url[this.selection_index];
};
Words_Database.prototype.get_selection=function()
{
  return this.selection;
};
Words_Database.prototype.get_words=function(ch)
{
  var index=this.words_keys.indexOf(ch);
  //console.log(ch)
  //console.log(index)
  if(index!==-1){return this.words_values[index];}
  return false;
};
Words_Database.prototype.count=function()
{
  return this.words_keys.length;
};
Words_Database.prototype.get_key=function(nu)
{
  return this.words_keys[nu];
};
Words_Database.prototype.get_description=function(nu)
{
  return this.words_descriptions[nu];
};
Words_Database.prototype.get_author=function(nu)
{
  return this.words_author[nu];
};
Words_Database.prototype.get_url=function(nu)
{
  return this.words_url[nu];
};
Words_Database.prototype.load=function(resp_json)
{
  var i,json,len,ascii;
  //json=eval(resp_json)
  json=resp_json;
  len=json.length;
  for(i=0;i<len;i+=1)
  {
    ascii=i+97;
/*jslint sub: true */
    this.words_keys[i]=String.fromCharCode(ascii);
    this.words_values[i]=json[i]['Content'];
    this.words_descriptions[i]=this.words_values[i].substring(0,11);
    this.words_author[i]=json[i]['Author'];
    this.words_url[i]=json[i]['URL'];
/*jslint sub: false */
  }
};
