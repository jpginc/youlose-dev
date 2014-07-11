SHELL := /bin/bash

baseDir = /home/jpginc/YouLose-
iosDir = ${baseDir}ios/www
winDir = ${baseDir}win/www
androidDir = ${baseDir}android/www
webDir = ${baseDir}web/www
mobDirs = ${baseDir}{ios,win,android}/www
allDirs = ${baseDir}{web,ios,win,android}/www

commonjsFiles =  js/main.js\
			  js/user.js\
			  js/time.js\
			  js/view.js\
			  js/pageLoader.js\
			  js/helperMethods.js
libraryjsFiles = js/library/jquery-1.11.1.min.js\
				 js/library/jquery.mobile-1.4.3.min.js\
				 js/library/modernizr.js
webjsFiles = ${commonjsFiles}\
			 js/web-localData.js
mobjsFiles = ${commonjsFiles}\
			 js/mob-localData.js

commoncssFiles = css/jquery.mobile-1.4.3.min.css\
				 css/main.css

#---------------------------      create/clean dirs   ----------------------------------------------------
rebuild:dirs icons all
all:common jss csss

dirs:
	mkdir -p ${allDirs}/{js,css/images,res/{icon,screen},img}
clean:
	rm ${allDirs}/* -rf
#------------------------------       git push        -------------------------------------------------
push:pushios pushandroid pushwin
pushios:
	cd /home/jpginc/YouLose-ios && git add -A && git commit -m "dev update" && git push origin
pushandroid:
	cd /home/jpginc/YouLose-android && git add -A && git commit -m "dev update" && git push origin
pushwin:
	cd /home/jpginc/YouLose-win && git add -A && git commit -m "dev update" && git push origin
#------------------------------       icons       -------------------------------------------------
icons:iosicons winicons androidicons
iconscommon:
	echo ${mobDirs} | xargs -n 1 cp icons/icon.png
	echo ${mobDirs} | xargs -n 1 cp icons/img/logo.png
iosicons:iconscommon
	mkdir -p ${iosDir}/res/{icon,screen}/ios/
	cp icons/res/icon/ios/* ${iosDir}/res/icon/ios
	cp icons/res/screen/ios/* ${iosDir}/res/screen/ios
	
winicons:iconscommon
	mkdir -p ${winDir}/res/{icon,screen}/windows-phone
	cp icons/res/icon/windows-phone/* ${winDir}/res/icon/windows-phone
	cp icons/res/screen/windows-phone/* ${winDir}/res/screen/windows-phone

androidicons:iconscommon
	mkdir -p ${androidDir}/res/{icon,screen}/android
	cp icons/res/icon/android/* ${androidDir}/res/icon/android
	cp icons/res/screen/android/* ${androidDir}/res/screen/android
#-----------------------------     needed files      ------------------------------------------------
common:
	cat i-config.xml > ${iosDir}/config.xml
	cat a-config.xml > ${androidDir}/config.xml
	cat w-config.xml > ${winDir}/config.xml
	cat html/licence html/index.html | tee ${allDirs}/index.html >/dev/null

#-----------------------------     js       --------------------------------------------------------
jss:mobjs webjs
	echo ${allDirs}/js | xargs -n 1 cp ${libraryjsFiles}
mobjs:
	cat ${mobjsFiles} | tee ${mobDirs}/js/main.js >/dev/null
webjs:
	cat ${webjsFiles} | tee ${webDir}/js/main.js >/dev/null
#---------------------------      css      --------------------------------------------------------
csss:${commoncssFiles}
	echo ${allDirs}/css | xargs -n 1 cp ${commoncssFiles}
	echo ${allDirs}/css/images/ | xargs -n 1 cp css/images/* -r
