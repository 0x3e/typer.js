require('./ttester/ttester.js')
require('./mocks/keys.mock.js')
require('./mocks/words_database.mock.js')
require('./mocks/display.mock.js')
require('./mocks/menu.mock.js')
require('./mocks/level.mock.js')
require('./mocks/store.mock.js')
require('../controller/typer.js')

if(process.argv[2]==='die')
  t=new Ttester('die')
else
  t=new Ttester()

a={}
doc={}
store=new Store()

t.test("new typer be"
, function(){a=new Typer(doc)}
)
t.test("typer init"
, function(){a.init()}
)
t.test("typer context is menu"
, function(){return a.context}, 'menu'
)
t.test("typer switch context"
, function(){a.switch_context()}
)
t.test("typer context is level"
, function(){return a.context}, 'level'
)
t.test("typer switch context"
, function(){a.switch_context()}
)
t.test("typer context is menu"
, function(){return a.context}, 'menu'
)
t.test("typer reset level"
, function(){a.reset_level()}
)
