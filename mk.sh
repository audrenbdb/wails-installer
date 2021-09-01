#!/bin/sh
echo "Compiling and compressing angular folder"
rm -f -r lib/installer
mkdir -p lib/installer
(cd frontend;npx ng build --single-bundle true --output-hashing none --prod --bundle-styles false;)
find ./*.go ! -name example.go -exec cp -t lib/installer/ {} +;
cp frontend/dist/my-app/main.js lib/installer/main.js;
cp frontend/dist/my-app/styles.css lib/installer/styles.css;
cp lib/README.md lib/installer/README.md
cp demo.gif lib/installer/demo.gif
cp LICENSE lib/installer/LICENSE
find lib/installer/*.go -type f -exec sed -i "s/package main/package installer/g" {} \;
find lib/installer/gui.go -type f -exec sed -i "s,frontend/dist/my-app/main.js,main.js,g" {} \;
find lib/installer/gui.go -type f -exec sed -i "s,frontend/dist/my-app/styles.css,styles.css,g"  {} \;
(cd lib/installer;go mod init github.com/audrenbdb/installer/lib/installer;go mod tidy;)
(
cd lib/installer;
git init;
git remote add origin https://github.com/audrenbdb/installer.git;
git add .;
git commit -m "last commit";
git branch -M main;
git push -u origin main;
)
