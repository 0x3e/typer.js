var window={}
var document={}
var localStorage={}

ttester=function(die){
  if(die=="die")
    this.fail_hard=true
  else
    this.fail_hard=false
}
ttester.prototype.test=function(desc,fun,expected_res)
{
  if(this.fail_hard)
  {
    this.run_fun(desc,fun,expected_res)
  }
  else
  {
    try
    {
      this.run_fun(desc,fun,expected_res)
    }
    catch(err)
    {
      console.log("FAIL: "+desc)
    }
  }
}
ttester.prototype.run_fun=function(desc,fun,expected_res)
{
  res=fun()
  if(expected_res===res)
    console.log("PASS: "+desc)
  else
    console.log("FAIL: "+desc)
}
