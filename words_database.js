function words_database(){
  this._selection='a'
  this.init=function()
  {
    cookie_selection=get_cookie_value('word_database_selected')
    if(cookie_selection)
      this.set_selection(cookie_selection)
  }
  this.set_selection=function(sel)
  {
    d = new Date();
    d.setTime(d.getTime()+(24*60*60*1000));
    expires = "; expires="+d.toGMTString();
    document.cookie = 'word_database_selected='+sel+'; expires='+expires+' path=/'
    this._selection=sel
  }
  this.get_selected=function()
  {
    return this._words[this._selection]
  }
  this._words={
     a:'Hello world how are you today.'
    ,b:'this.level=new level(this.display,this.keys,this.words)'
    ,c:'var http = require(\'http\');\nhttp.createServer(function (req, res) {\n  res.writeHead(200, {\'Content-Type\': \'text/plain\'});\n  res.end(\'Hello World\\n\');\n}).listen(8124, "127.0.0.1");\nconsole.log(\'Server running at http://127.0.0.1:8124/\');'
    ,d:'<?>\'"\\~!@#$%^&*|{}[];'
    ,e:'for(i=0;i<100;i++)'
    ,f:'(1lI||Il1)'
    ,g:'ci\'this.level=new level(this.display,this.keys,this.words)'
    ,h:'Once more unto the breach, dear friends, once more;\nOr close the wall up with our English dead.'
  }
}

