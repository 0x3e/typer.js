require('./ttester/ttester.js')
require('./mocks/words_list.mock.js')
require('./mocks/store.mock.js')
require('../words_database.js')
store=new store
a=new words_database
t=new ttester
//console.log(words_list)

t.test("init ehh"
  ,function(){a.init()}
)
t.test("A selection can be set"
  ,function(){a.set_selection('c')}
)
t.test("A selection cannot be set incorrectly"
  ,function(){return a.set_selection('zzzzz')}
  ,false
)
t.test("A selection can be set correctly"
  ,function(){return a.set_selection('a')}
  ,true
)

