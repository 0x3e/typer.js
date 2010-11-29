function ajax()
{
  this.get=function(url,callback,async)
  {
    xmlhttp=new XMLHttpRequest()
    xmlhttp.onreadystatechange=function()
    {
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
      {
        callback(xmlhttp.responseText)
      }
    }
    xmlhttp.open('GET',url,false)
    xmlhttp.send()
  }
}
