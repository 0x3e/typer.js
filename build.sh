#!/bin/bash
# lib/json2.js

js_files="controller/score.js
model/words_classic_texts.js
controller/words_database.js
view/display.js
view/menu_display.js
view/level_display.js
view/score_display.js
controller/menu.js
model/keys.js
controller/level.js
controller/typer.js
controller/store.js
js.js"

if [ -f jsl/jsl ]
then
  echo "jsl Linting .."
  for js_file in $js_files
  do
    jsl/jsl -nologo -nosummary -nofilelisting -conf conf/jsl.conf -process $js_file
    if [ $? -ne 0 ]
    then
      fails_occured=true
    fi
  done
  if [ $fails_occured ]
  then
    exit 1
  fi
  echo "jsl Linted"
fi
if [ -f jslint/bin/jslint.js ]
then
  echo "jslint Linting .."
  for js_file in $js_files
  do
    out=$(jslint/bin/jslint.js $js_file | grep -v '^OK$')
    if [ $? -eq 0 ]
    then
      fails_occured=true
      echo $js_file
      echo "$out"
    fi
  done
  if [ $fails_occured ]
  then
    exit 1
  fi
  echo "jslint Linted"
fi

build_number=209
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
t.js
c.css
"\
> c.m

cat $js_files \
|sed -e 's/.*console.log.*//' -e 's/^"use strict";$//'\
> typer_all.js

if [ -f compiler/compiler.jar ]
then
  echo compressing javascript
  java -jar compiler/compiler.jar --js typer_all.js --js_output_file t.js --compilation_level ADVANCED_OPTIMIZATIONS
else
  cp typer_all.js t.js
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
echo "<html lang=en manifest=c.m><head><meta charset=utf-8 /><title>0x3e</title><link href=c.css rel=stylesheet type=text/css /><body><script type=text/javascript src=t.js></script></body></html>" >> index.html
