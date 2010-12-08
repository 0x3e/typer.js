words_database=function()
{
  this._selection='a'
  this._words_keys=[]
  this._words_values=[]
  this._words_descriptions=[]
  this._words_author=[]
  this._words_url=[]
}
words_database.prototype.init=function()
{
  //db=this
  //ajax=new ajax
  //ajax.get('words_classic_texts.json',function(req_json){db.load(req_json)},false)
  word_list=new words_list
  this.load(word_list.get_list())
  store_selection=store.get('word_database_selected')
  if(store_selection)
    this.set_selection(store_selection)
}
words_database.prototype.set_selection=function(sel)
{
  if(this.get_words(sel))
  {
    store.set('word_database_selected',sel)
    this._selection=sel
    this._selection_index=this._words_keys.indexOf(sel)
    return true
  }
  return false
}
words_database.prototype.get_selected_words=function()
{
  return this._words_values[this._selection_index]
}
words_database.prototype.get_selected_url=function()
{
  return this._words_url[this._selection_index]
}
words_database.prototype.get_selection=function()
{
  return this._selection
}
words_database.prototype.get_words=function(ch)
{
  index=this._words_keys.indexOf(ch)
  //console.log(ch)
  //console.log(index)
  if(index!=-1)
    return this._words_values[index]
  return false
}
words_database.prototype.count=function()
{
  return this._words_keys.length
}
words_database.prototype.get_key=function(nu)
{
  return this._words_keys[nu]
}
words_database.prototype.get_description=function(nu)
{
  return this._words_descriptions[nu]
}
words_database.prototype.get_author=function(nu)
{
  return this._words_author[nu]
}
words_database.prototype.get_url=function(nu)
{
  return this._words_url[nu]
}
words_database.prototype.load=function(resp_json)
{
  //json=eval(resp_json)
  json=resp_json
  len=json.length
  for(i=0;i<len;i++)
  {
    ascii=i+97
    this._words_keys[i]=String.fromCharCode(ascii)
    this._words_values[i]=json[i]['Content']
    this._words_descriptions[i]=this._words_values[i].substring(0,11)
    this._words_author[i]=json[i]['Author']
    this._words_url[i]=json[i]['URL']
  }
}
