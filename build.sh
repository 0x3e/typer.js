#!/bin/bash

build_number=51
(( next=build_number+1 ))
sed -i -e "s/build_number=$build_number/build_number=$next/" "$0"

if [ ! -f compiler/compiler.jar ]
then
  echo "This quick and dirty script could use the closure compiler from google"
# todo probably ask and download it here
fi

echo "CACHE MANIFEST
# build $build_number
index.html"\
> c.m

cat \
words_classic_texts.js \
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

if [ -f compiler/compiler.jar ]
then
  java -jar compiler/compiler.jar --js typer_all.js --js_output_file t.js --compilation_level ADVANCED_OPTIMIZATIONS # SIMPLE_OPTIMIZATIONS ADVANCED_OPTIMIZATIONS            
else
  cp typer.js t.js
fi

echo "/*$build_number*/" > /tmp/t.js && cat t.js >> /tmp/t.js && cp /tmp/t.js t.js
sed -i -e 's/\.ha;/.Content;/' t.js

echo "<!DOCTYPE html><!--$build_number-->" > index.html
echo "<html lang=en manifest=c.m><head><meta charset=utf-8 /><title>0x3e</title><style>" >> index.html
cat c.css >> index.html
echo "</style></head><body><script>" >> index.html
cat t.js >> index.html
echo "</script></body></html>" >> index.html
