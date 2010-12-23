require('./ttester/ttester.js')
require('./mocks/keys.mock.js')
require('./mocks/words_database.mock.js')
require('./mocks/display.mock.js')
require('./mocks/menu.mock.js')
require('./mocks/level.mock.js')
require('../controller/typer.js')

if(process.argv[2]==='die')
  t=new Ttester('die')
else
  t=new Ttester()

a={}

t.test("new typer be"
, function(){a=new Typer('nowhere')}
)
