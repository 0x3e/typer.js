#!/bin/bash

build_number=97
(( next=build_number+1 ))
sed -i -e "s/build_number=$build_number/build_number=$next/" "$0"

if [ ! -f compiler/compiler.jar ]
then
  echo "Closure compiler from google missing javascript will not be compiled"
# todo probably ask and download it here
fi
if [ ! -f ./csstidy/release/csstidy/csstidy ]
then
  echo "Csstidy missing css will not be compiled"
fi

echo "Build $build_number"
echo "CACHE MANIFEST
# build $build_number
"\
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
|sed -e 's/.*console.log.*//' \
> typer_all.js

if [ -f compiler/compiler.jar ]
then
  echo compressing javascript
  java -jar compiler/compiler.jar --js typer_all.js --js_output_file t.js --compilation_level ADVANCED_OPTIMIZATIONS 2>&1 |grep 'error(s)'
else
  cp typer.js t.js
fi

echo "/*$build_number*/" > /tmp/t.js && cat t.js >> /tmp/t.js && cp /tmp/t.js t.js

if [ -f ./csstidy/release/csstidy/csstidy ]
then
  echo compressing css
  ./csstidy/release/csstidy/csstidy css.css --template=highest c.css | grep Compress
else
  cp css.css c.css
fi

echo "<!DOCTYPE html><!--$build_number-->" > index.html
echo "<html lang=en manifest=c.m><head><meta charset=utf-8 /><title>0x3e</title><style>" >> index.html
cat c.css >> index.html
echo "</style></head><body><script>" >> index.html
cat t.js >> index.html
echo "</script></body></html>" >> index.html
