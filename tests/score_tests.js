require('./ttester/ttester.js')
require('./mocks/score_display.mock.js')
require('./mocks/store.mock.js')
require('../controller/score.js')
store=new store
if(process.argv[2]=='die')
  t=new ttester('die')
else
  t=new ttester()
a={}

t.test("new score be"
, function(){a=new score('display_parent')}
)
new_score={
  "c":'1'
, "i":'0'
, "t":'1'
, "s":'1'
}
t.test("update score"
, function(){return a.update('http://test.test/1',new_score)},true
)
new_score={
  "c":'1'
, "i":'0'
, "t":'1'
, "s":'2'
}
t.test("update score"
, function(){return a.update('http://test.test/1',new_score)},true
)
new_score={
  "c":'1'
, "i":'0'
, "t":'1'
, "s":'3'
}
t.test("update score"
, function(){return a.update('http://test.test/2',new_score)}, true
)
