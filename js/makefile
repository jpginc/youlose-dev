commonFiles = main.js\
			  user.js\
			  time.js
commonLibFiles = library/jquery-1.11.1.min.js
mobLibFiles = library/jquery.mobile-1.4.3.min.js\
			  library/jquery.mobile-1.4.3.min.css\
			  library/mobile\ images/
webLibFiles = library/jquery-ui.min.js\
			  library/jquery-ui.min.css\
			  library/ui\ images/
androidFiles = ${commonFiles}
iosFiles = ${commonFiles}
winFiles = ${commonFiles}
webFiles = ${commonFiles}\
				web-localData.js

all:ios android win web
ios:${iosFiles} 
	cat ${iosFiles} > /home/jpginc/YouLose-iphone/www/js/main.js
	cp ${commonLibFiles} /home/jpginc/YouLose-iphone/www/js/ 
	cp ${mobLibFiles} /home/jpginc/YouLose-iphone/www/js/ -r
android:${androidFiles} 
	cat ${androidFiles} > /home/jpginc/YouLose-android/www/js/main.js
	cp ${commonLibFiles} /home/jpginc/YouLose-android/www/js/
	cp ${mobLibFiles} /home/jpginc/YouLose-android/www/js/ -r
win:${winFiles} 
	cat ${winFiles} > /home/jpginc/YouLose-win/www/js/main.js
	cp ${commonLibFiles} /home/jpginc/YouLose-win/www/js/
	cp ${mobLibFiles} /home/jpginc/YouLose-win/www/js/ -r
web: ${winFiles} 
	cat ${winFiles} > /home/jpginc/YouLose-web/js/main.js
	cp ${commonLibFiles} /home/jpginc/YouLose-web/js/
	cp ${webLibFiles} /home/jpginc/YouLose-web/js/ -r
