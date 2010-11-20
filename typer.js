function typer(){
  this.keys=new keys()
  this.words='Hello world how are you today.'
  //this.words='this.level=new level(this.display,this.keys,this.words)'
  //this.words='var http = require(\'http\');\nhttp.createServer(function (req, res) {\n  res.writeHead(200, {\'Content-Type\': \'text/plain\'});\n  res.end(\'Hello World\\n\');\n}).listen(8124, "127.0.0.1");\nconsole.log(\'Server running at http://127.0.0.1:8124/\');'
  //this.words='<?>\'"\\~!@#$%^&*|{}[];'
  //this.words='for(i=0;i++;i<100)'
  //this.words='(1lI||Il1)'
  //this.words='ci\'this.level=new level(this.display,this.keys,this.words)'

  this.display=new display('level_display_area','score_display_area')
  this.level=new level(this.display,this.keys,this.words)
	this.update_display=function()
  {
    this.level.update_display()
  }
  this.key_action=function(key_code)
  {
    this.level.key_action(key_code)
  }
  this.init=function()
  {
    this.display.init()
    this.level.init()
  }
}
