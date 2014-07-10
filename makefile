SHELL := /bin/bash
all:ios android win web
ios:common
	cat i-config.xml > /home/jpginc/YouLose-iphone/www/config.xml
	make ios -C	js/
	make ios -C	css/
	make ios -C	html/
android:common
	cat a-config.xml > /home/jpginc/YouLose-android/www/config.xml
	make android -C	js/
	make android -C	css/
	make android -C	html/
win:common
	cat w-config.xml > /home/jpginc/YouLose-win/www/config.xml
	make win -C	js/
	make win -C	css/
	make win -C	html/
common:
	mkdir -p /home/jpginc/YouLose-{iphone,win,android}/www/js/
	mkdir -p /home/jpginc/YouLose-{iphone,win,android}/www/css/images/
	mkdir -p /home/jpginc/YouLose-web/js/
	mkdir -p /home/jpginc/YouLose-web/css/images/
	#cp icons/* /home/jpginc/YouLose-{iphone,win,android}/www -r
	#cp icons/* /home/jpginc/YouLose-web -r
web:common
	make web -C html/
	make web -C css/
	make web -C js/


pushall:pushios pushandroid pushwin
pushios:common ios 
	cd /home/jpginc/YouLose-iphone && git add -A && git commit -m "dev update" && git push origin
pushandroid:common android 
	cd /home/jpginc/YouLose-android && git add -A && git commit -m "dev update" && git push origin
pushwin:common win 
	cd /home/jpginc/YouLose-win && git add -A && git commit -m "dev update" && git push origin
clean:
	rm /home/jpginc/YouLose-iphone/www/* -rf
	rm /home/jpginc/YouLose-win/www/* -rf
	rm /home/jpginc/YouLose-android/www/* -rf
	rm /home/jpginc/YouLose-web/* -rf
