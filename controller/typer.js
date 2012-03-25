"use strict";
/**
 * @constructor
*/
/*global Typer:true,Keys,Words_Database,Display,Menu,Level,store */
/*global setInterval,clearInterval */
var Typer=function(parent_ob)
{
  var repeat,timers,that;
  this.repeat=250;
  repeat=this.repeat;
  this.timers=[];
  timers=this.timers;
  that=this;
  this.context='menu';
  this.keys=new Keys(timers);
  this.words_database=new Words_Database();
  this.words_database.init();
  this.display=new Display({
    menu:'menu_display_area',
    level:'level_display_area',
    score:'score_display_area'
  });
  this.menu=new Menu(this);
  this.level=new Level(this);

  parent_ob.onkeydown=function (evt)
  {
    //console.log('d'+evt.keyCode)
    //console.log('d_char'+evt.charCode)
    var key=evt.keyCode;
    if(that.typing && !timers[key]){
      that.key_action(key);
      if (repeat!==0){
        timers[key]= setInterval('typer.key_action('+key+')', repeat);}
    }
    if(key===222||key===191||key===32){return false;}
  };
  parent_ob.onkeypress=function (evt)
  {
    //console.log('press'+evt.keyCode)
    //console.log('press_char'+evt.charCode)
  };
  parent_ob.onkeyup=function (evt)
  {
    var key=evt.keyCode;
    //console.log('u'+key)
    if (timers[key]!==null){
      clearInterval(timers[key]);}
    delete timers[key];
  };
  parent_ob.onblur=function ()
  {
    for(var key in timers){if(timers.hasOwnProperty(key)){
      clearInterval(timers[key]);
      delete timers[key];
    }}
  };
  this.waited=0;
  this.wait=false;
  if(this.jsonp_twitter_call(false))
    this.wait=true;
  else if(this.jsonp_gist_call(false))
    this.wait=true;
};
Typer.prototype.jsonp_twitter_call=function(twitter)
{
  if(!twitter)
  {
    twitter = getUrlVar('tweet');
  }
  if(twitter)
  {
    if(this.words_database.load("tweet."+twitter))
      return false;
    console.log('jsonp');
    var script = document.createElement('script');
    script.src = 'http://api.twitter.com/1/statuses/show/'+twitter+'.json?callback=t'
    document.body.appendChild(script);
    return true;
  }
}
Typer.prototype.jsonp_gist_call=function(gist)
{
  if(!gist)
  {
    gist = getUrlVar('gist');
  }
  if(gist)
  {
    if(this.words_database.load("gist."+gist))
      return false;
    console.log('jsonp');
    var script = document.createElement('script');
    script.src = 'https://api.github.com/gists/'+gist+'?callback=g';
    document.body.appendChild(script);
    return true;
  }
}
Typer.prototype.key_action=function(key_code)
{
  if(this.keys.equivalent(key_code,'escape')||(this.keys.is_control()&&this.keys.equivalent(key_code,'c')))
  {
    this.switch_context();
    return;
  }
  //console.log(key_code)
  if(this.context==='menu'){
    this.menu.key_action(key_code);}
  else if(this.context==='level'){
    this.level.key_action(key_code);}
  else{
    this.switch_context('menu');}
};
Typer.prototype.reset_level=function()
{
  delete(this.level);
  this.level=new Level(this);
  this.level.init();
};
Typer.prototype.switch_context=function()
{
  if (this.context==='menu')
  {
    this.context='level';
    store.set('context','level');
    this.menu.bg();
    this.level.fg();
  }
  else
  {
    this.context='menu';
    store.set('context','menu');
    this.level.bg();
    this.menu.fg();
  }
};
Typer.prototype.set_context=function(context)
{
  if (context==='level')
  {
    this.context='level';
    store.set('context','level');
    this.menu.bg();
    this.level.fg();
  }
  else
  {
    this.context='menu';
    store.set('context','menu');
    this.level.bg();
    this.menu.fg();
  }
};
Typer.prototype.new_tweet=function(ob)
{
  console.log(ob);
  this.words_database.add("tweet."+ob.id_str,{'text':ob.text,'author':ob.user.screen_name});
  this.wait=false;
}
Typer.prototype.new_gist=function(ob)
{
  var file,text,login;
  for(var files in ob.data.files)
  {
    file=files;
    break;
  } 
  text=ob.data.files[file].content;
  console.log(ob.data);
  if(ob.data.user!=null)
    login=ob.data.user.login;
  if(!login) login="anonymous";
  this.words_database.add("gist."+ob.data.id,{'text':text,'author':login});
  this.wait=false;
}
Typer.prototype.init=function()
{
  if(this.wait)
  {
    if(this.waited<20)
    {
      var that=this;
      setTimeout(function(){that.init()},100);
    }
    this.waited++;
    console.log("typer.waiting");
  }
  else
  {
    this.display.init();
    this.level.init();
    this.menu.init();
    var context=store.get('context');
    this.set_context(context);
  }
};
