cat \
words_database.js \
display.js \
menu_display.js \
level_display.js \
score_display.js \
menu.js \
keys.js \
level.js \
store.js \
typer.js \
js.js \
> typer_all.js

java -jar compiler/compiler.jar --js typer_all.js --js_output_file typer_compiled.js --compilation_level ADVANCED_OPTIMIZATIONS # SIMPLE_OPTIMIZATIONS ADVANCED_OPTIMIZATIONS            
