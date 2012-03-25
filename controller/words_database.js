"use strict";
/**
 * @constructor
*/
/*global Words_Database:true,Words_List,store */
var Words_Database=function()
{
  this.selection='a';
  this.words_keys=[];
  this.words_texts=[];
  this.words_authors=[];
};
Words_Database.prototype.init=function()
{
  var store_selection,store_items;
  store_items=JSON.parse(store.get('words_database_list'));
  console.log(store_items);
  var len=store_items.length;
  for(var i=0;i<len;i++)
  {
    this.load(store_items[i]);
  }
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
    //this.selection_index=this.words_keys.indexOf(sel);
    this.selection_index=0;
    return true;
  }
  return false;
};
Words_Database.prototype.load=function(key)
{
  console.log(key);
  var val,val_string;
  if(val_string=store.get(key))
  {
    console.log("loading");
    val=JSON.parse(val_string);
    this.words_keys.unshift(key);
    this.words_texts.unshift(val.text);
    this.words_authors.unshift(val.author);
    return true;
  }
}
Words_Database.prototype.add=function(key,val)
{
  var db=[];
  var db_json=store.get("words_database_list");
  var db_string;
  if(db_json)
  {
    try{db=JSON.parse(db_json);}
    catch(e){db=[];}
  }
  try{db.push(key);}
  catch(e){db=[key];}
  console.log(db);
  db_string=JSON.stringify(db);
  if(key){store.set("words_database_list",db_string);}
  db=JSON.parse(db_json);
  store.set(key,JSON.stringify(val));
  this.load(key);
}
Words_Database.prototype.get_selected_words=function()
{
  return this.words_texts[0];
};
Words_Database.prototype.get_selected_key=function()
{
  return this.words_keys[0];
};
Words_Database.prototype.get_selection=function()
{
  return this.selection;
};
Words_Database.prototype.get_words=function(ch)
{
  return this.words_texts[0];
};
Words_Database.prototype.count=function()
{
  console.log(this.words_texts.length);
  return this.words_texts.length;
};
Words_Database.prototype.get_description=function(nu)
{
  return this.words_texts[nu];
};
Words_Database.prototype.get_author=function(nu)
{
  return this.words_authors[nu];
};
Words_Database.prototype.get_key=function(nu)
{
  return this.words_keys[nu];
};
