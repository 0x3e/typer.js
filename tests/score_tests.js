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
  "correct_letters":'1'
, "incorrect_letters":'0'
, "total_time":'1'
, "start_time":'1'
}
t.test("update score"
, function(){return a.update('http://test.test/1',new_score)},true
)
new_score={
  "correct_letters":'1'
, "incorrect_letters":'0'
, "total_time":'1'
, "start_time":'2'
}
t.test("update score"
, function(){return a.update('http://test.test/1',new_score)},true
)
new_score={
  "correct_letters":'1'
, "incorrect_letters":'0'
, "total_time":'1'
, "start_time":'3'
}
t.test("update score"
, function(){return a.update('http://test.test/2',new_score)}, true
)
