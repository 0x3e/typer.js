store=function()
{
  this.s={}
}
store.prototype.set=function(k,v){this.s[k]=v}
store.prototype.get=function(k){return this.s[k]}
