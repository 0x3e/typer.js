require('./ttester/ttester.js')
require('./mocks/typer.mock.js')
require('./mocks/level_display.mock.js')
require('./mocks/score.mock.js')
require('./mocks/store.mock.js')
require('../level.js')
store=new store
typer=new typer
if(process.argv[2]=='die')
  t=new ttester('die')
else
  t=new ttester()
a={}
t.test("new level be"
, function(){a=new level(typer)}
)
t.test("init ehh"
, function(){return a.init()},true
)
t.test("empty key action nay"
, function(){return a.key_action()},false
)
t.test("key action a"
, function(){return a.key_action('a')},true
)
//console.log(a);
//t.test("",
//  function(){return a.complete:},true
//)
