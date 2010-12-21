/**
 * @constructor
*/
Words_Database=function()
{
  this._selection='a';
  this._words_keys=[];
  this._words_values=[];
  this._words_descriptions=[];
  this._words_author=[];
  this._words_url=[];
};
Words_Database.prototype.init=function()
{
  var word_list,store_selection;
  //db=this
  //ajax=new ajax
  //ajax.get('words_classic_texts.json',function(req_json){db.load(req_json)},false)
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
    this._selection=sel;
    this._selection_index=this._words_keys.indexOf(sel);
    return true;
  }
  return false;
};
Words_Database.prototype.get_selected_words=function()
{
  return this._words_values[this._selection_index];
};
Words_Database.prototype.get_selected_url=function()
{
  return this._words_url[this._selection_index];
};
Words_Database.prototype.get_selection=function()
{
  return this._selection;
};
Words_Database.prototype.get_words=function(ch)
{
  var index=this._words_keys.indexOf(ch);
  //console.log(ch)
  //console.log(index)
  if(index!=-1){return this._words_values[index];}
  return false;
};
Words_Database.prototype.count=function()
{
  return this._words_keys.length;
};
Words_Database.prototype.get_key=function(nu)
{
  return this._words_keys[nu];
};
Words_Database.prototype.get_description=function(nu)
{
  return this._words_descriptions[nu];
};
Words_Database.prototype.get_author=function(nu)
{
  return this._words_author[nu];
};
Words_Database.prototype.get_url=function(nu)
{
  return this._words_url[nu];
};
Words_Database.prototype.load=function(resp_json)
{
  //json=eval(resp_json)
  var json=resp_json;
  var len=json.length;
  var ascii;
  for(var i=0;i<len;i++)
  {
    ascii=i+97;
/*jslint sub: true */
    this._words_keys[i]=String.fromCharCode(ascii);
    this._words_values[i]=json[i]['Content'];
    this._words_descriptions[i]=this._words_values[i].substring(0,11);
    this._words_author[i]=json[i]['Author'];
    this._words_url[i]=json[i]['URL'];
/*jslint sub: false */
  }
};
