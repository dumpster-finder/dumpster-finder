#!/bin/sh
#
# Downloads map marker graphics
# Usage: ./fetch_icons.sh <your api key>

size=large
scale_factor=2

fetch_icon() {
  echo "https://api.geoapify.com/v1/icon/?type=material&color=%23${2}&size=${size}&icon=${1}&iconType=awesome&scaleFactor=${scale_factor}&apiKey=${3}"
  wget "https://api.geoapify.com/v1/icon/?type=material&color=%23${2}&size=${size}&icon=${1}&iconType=awesome&scaleFactor=${scale_factor}&apiKey=${3}" -O "assets/images/${4}.png"
}

fetch_icon trash ff3d32 "$1" dumpster-marker-locked
fetch_icon trash 35c649 "$1" dumpster-marker-unlocked
fetch_icon user 3366ff "$1" user-marker
fetch_icon trash 3366ff "$1" dumpster-position-marker
