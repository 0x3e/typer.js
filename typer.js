function typer(){
  this.display=new display()
  this.keys=new keys()
  //this.test_words='Hello world how are you today.'
  this.words='this.level=new level(this.display,this.keys,this.words)'
  this.level=new level(this.display,this.keys,this.words)
	this.update_display=function()
  {
    this.level.update_display()
  }
  this.key_action=function(key_code)
  {
    this.level.key_action(key_code)
  }
  this.update_display=function()
  {
    this.level.update_display()
  }
  this.init=function()
  {
    this.level.init()
  }
}
