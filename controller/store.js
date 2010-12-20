/**
 * @constructor
*/
Store=function()
{}
Store.prototype.set=function(key,value)
{
  localStorage.setItem(key, value);
}
Store.prototype.set_cookie=function(key,value)
{
  var expires
  var d = new Date();
  d.setTime(d.getTime()+(365*24*60*60*1000));
  expires = "; expires="+d.toGMTString();
  document.cookie = key+'='+value+'; expires='+expires+' path=/'
}
Store.prototype.get=function(key)
{
  return localStorage.getItem(key);
}
Store.prototype.get_cookie_value=function(name)
{
  var split_keys
  var cookie=document.cookie
  var i=0
  var split_values=cookie.split(";")
  var length=split_values.length
  for(i=0;i<length;i++)
  {
    split_keys=split_values[i].split("=")
    split_keys[0]=split_keys[0].replace(/^ /,"")
    if(split_keys[0]===name) return split_keys[1]
  }
  return ""
}
