function words_database()
{
  this._selection='a'
  this.init=function()
  {
    //db=this
    //ajax=new ajax
    //ajax.get('words_classic_texts.json',function(req_json){db.load(req_json)},false)
    word_list=new words_list
    this.load(word_list.get_list())
    store_selection=store.get_value('word_database_selected')
    if(store_selection)
      this.set_selection(store_selection)
  }
  this.set_selection=function(sel)
  {
    if(this.get_words(sel))
    {
      store.set_value('word_database_selected',sel)
      this._selection=sel
      return true
    }
    return false
  }
  this.get_selected=function()
  {
    return this.get_words(this._selection)
  }
  this.get_words=function(ch)
  {
    index=this._words_keys.indexOf(ch)
    //console.log(ch)
    //console.log(index)
    if(index!=-1)
      return this._words_values[index]
    return false
  }
  this.count=function()
  {
    return this._words_keys.length
  }
  this.get_key=function(nu)
  {
    return this._words_keys[nu]
  }
  this.get_description=function(nu)
  {
    return this._words_descriptions[nu]
  }
  this.load=function(resp_json)
  {
    //json=eval(resp_json)
    json=resp_json
    len=json.length
    for(i=0;i<len;i++)
    {
      ascii=i+97
      this._words_keys[i]=String.fromCharCode(ascii)
      words=json[i]['Content']
      this._words_values[i]=words
      this._words_descriptions[i]=words.substring(0,11)
    }
  }
  this._words_keys=[
  ]
  this._words_values=[
  ]
  this._words_descriptions=[
  ]
}

