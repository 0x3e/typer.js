#!/bin/bash

build_number=24
(( next= build_number + 1 ))
sed -i -e "s/build_number=$build_number/build_number=$next/" "$0"

if [ ! -f compiler/compiler.jar ]
then
  echo "This quick and dirty script needs the closure compiler from google"
# todo probably ask and download it here
  exit 2
fi

echo "CACHE MANIFEST
# build $build_number
index.html
c.css
t.js"\
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

java -jar compiler/compiler.jar --js typer_all.js --js_output_file t.js --compilation_level ADVANCED_OPTIMIZATIONS # SIMPLE_OPTIMIZATIONS ADVANCED_OPTIMIZATIONS            

