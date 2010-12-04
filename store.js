function store()
{
  this.set=function(key,value)
  {
    localStorage.setItem(key, value);
  }
  this.set_cookie=function(key,value)
  {
    d = new Date();
    d.setTime(d.getTime()+(365*24*60*60*1000));
    expires = "; expires="+d.toGMTString();
    document.cookie = key+'='+value+'; expires='+expires+' path=/'
  }
  this.get=function(key)
  {
    return localStorage.getItem(key);
  }
  this.get_cookie_value=function(name)
  {
    cookie=document.cookie
    i=0
    split_values=cookie.split(";")
    length=split_values.length
    for(i=0;i<length;i++)
    {
      split_keys=split_values[i].split("=")
      split_keys[0]=split_keys[0].replace(/^ /,"")
      if(split_keys[0]==name) return split_keys[1]
    }
    return ""
  }
}
