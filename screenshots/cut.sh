#!/bin/sh
# Crops screenshots from Android Studio's android emulator

for img in "$@"
do
  convert "$img" -crop 1080x1728+0+64 "$img"
  #convert "$img" -resize 50% "$img"
done
