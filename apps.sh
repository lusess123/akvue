#!/bin/bash
export http_proxy=http://127.0.0.1:1087;export https_proxy=http://127.0.0.1:1087;
dire="akvue"
[ -d "$dire" ] && rm -rf  "$dire"
#mkdir "$dire" && cd "$dire"


echo   `pwd`

git clone https://github.com/lusess123/akvue.git

cd $dire/packages

dire2="apps"
[ -d "$dire2" ] && rm -rf  "$dire2"
mkdir "$dire2" && cd "$dire2"

dire1="arwen"
[ -d "$dire1" ] && rm -rf  "$dire1"
mkdir "$dire1" && cd "$dire1"


git init 
git remote add -f hello git@git.lvwan.cc:lwcloud/arwen.git
git config core.sparsecheckout true
echo arwen-base/ >> .git/info/sparse-checkout
echo ak-app-arwen-centrol/ >> .git/info/sparse-checkout

git pull  hello hello
#cd  packages/apps
code .
cd ./../../../

yarn

npm run lerna 
npm run serve-host

echo   `pwd`

#code .
