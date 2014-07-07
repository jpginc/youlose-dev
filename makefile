all:ios android win
ios:common
	cat > /home/jpginc/YouLose-iphone/www/config.xml i-config.xml
	make ios -C	js/
	make ios -C	css/
	make ios -C	html/
android:common
	cat > /home/jpginc/YouLose-android/www/config.xml a-config.xml
	make android -C	js/
	make android -C	css/
	make android -C	html/
win:common
	cat > /home/jpginc/YouLose-win/www/config.xml w-config.xml
	make win -C	js/
	make win -C	css/
	make win -C	html/
common:
	echo nothing yet

pushall:pushios pushandroid pushwin
pushios:common ios 
	cd /home/jpginc/YouLose-iphone && git add -A && git commit -m "dev update" && git push origin
pushandroid:common android 
	cd /home/jpginc/YouLose-android && git add -A && git commit -m "dev update" && git push origin
pushwin:common win 
	cd /home/jpginc/YouLose-win && git add -A && git commit -m "dev update" && git push origin
