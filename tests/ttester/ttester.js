var window={}
var document={}
var localStorage={}

ttester=function(){}
ttester.prototype.test=function(desc,fun,expected_res)
{
  try
  {
    res=fun()
    if(expected_res==undefined||expected_res==res)
      console.log("PASS: "+desc)
    else
      console.log("FAIL: "+desc)
  }
  catch(err)
  {
    console.log("FAIL: "+desc)
  }
}
