function words_database(){
  this._selection='a'
  this.init=function()
  {
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
  this._words_keys=[
     'a'
    ,'b'
    ,'c'
    ,'d'
    ,'e'
    ,'f'
    ,'g'
    ,'h'
  ]
  this._words_values=[
     'Hello world how are you today.'
    ,'this.level=new level(this.display,this.keys,this.words)'
    ,'var http = require(\'http\');\nhttp.createServer(function (req, res) {\n  res.writeHead(200, {\'Content-Type\': \'text/plain\'});\n  res.end(\'Hello World\\n\');\n}).listen(8124, "127.0.0.1");\nconsole.log(\'Server running at http://127.0.0.1:8124/\');'
    ,'<?>\'"\\~!@#$%^&*|{}[];'
    ,'for(i=0;i<128;i++)'
    ,'(1lI||Il1)'
    ,'this.level=new level(this.display,this.keys,this.words)'
    ,'Once more unto the breach, dear friends, once more;\nOr close the wall up with our English dead.'
  ]
  this._words_descriptions=[
     'Hello world...'
    ,'this.level=...'
    ,'var http = ...'
    ,'&lt;?&gt;\'"\\~!@...'
    ,'for(i=0;i<1...'
    ,'(1lI||Il1)'
    ,'this.level=...'
    ,'Once more u...'
  ]
}

