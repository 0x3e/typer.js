"use strict";
/**
 * @constructor
*/
/*global Store:true,localStorage,document */
Store=function(){};
Store.prototype.set=function(key,value)
{
  localStorage.setItem(key, value);
};
Store.prototype.set_cookie=function(key,value)
{
  var expires,d;
  d = new Date();
  d.setTime(d.getTime()+(365*24*60*60*1000));
  expires = "; expires="+d.toGMTString();
  document.cookie = key+'='+value+'; expires='+expires+' path=/';
};
Store.prototype.get=function(key)
{
  return localStorage.getItem(key);
};
Store.prototype.get_cookie_value=function(name)
{
  var i,split_keys,cookie,split_values,length;
  cookie=document.cookie;
  split_values=cookie.split(";");
  length=split_values.length;
  for(i=0;i<length;i+=1)
  {
    split_keys=split_values[i].split("=");
    split_keys[0]=split_keys[0].replace(/^ /,"");
    if(split_keys[0]===name){return split_keys[1];}
  }
  return "";
};
