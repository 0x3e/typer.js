var window={}
var document={}
var localStorage={}

Ttester=function(die){
  if(die==="die")
    this.fail_hard=true
  else
    this.fail_hard=false
}
Ttester.prototype.test=function(desc,fun,expected_res,detail)
{
  if(this.fail_hard)
  {
    this.run_fun(desc,fun,expected_res,detail)
  }
  else
  {
    try
    {
      this.run_fun(desc,fun,expected_res,detail)
    }
    catch(err)
    {
      console.log("FAIL: "+desc)
    }
  }
}
Ttester.prototype.run_fun=function(desc,fun,expected_res,detail)
{
  res=fun()
  if(detail)
    console.log(res)
  if(!expected_res)
  {
    console.log("PASS: "+desc)
    return true
  }
  if(expected_res.constructor===Array)
  {
    expected_res=JSON.stringify(expected_res)
    res=JSON.stringify(res)
  }
  if(expected_res===res)
    console.log("PASS: "+desc)
  else
    console.log("FAIL: "+desc)
}
