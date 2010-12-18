Store=function()
{
  this.s={}
}
Store.prototype.set=function(k,v){this.s[k]=v}
Store.prototype.get=function(k){return this.s[k]}
