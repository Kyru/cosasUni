#!/bin/bash

quiver_to_markdown /Users/ferranius/Desktop/uniArchives/Scripts/Quiver.qvlibrary /Users/ferranius/Desktop/uniArchives/UNI/mdFiles
echo "Transformacion completa"
cd /Users/ferranius/Desktop/uniArchives
git init
git add .
git commit -m "Autosave"
git push origin master
echo "Actualizado"
