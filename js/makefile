commonFiles = main.js\
			  user.js\
			  time.js
androidFiles = ${commonFiles}
iosFiles = ${commonFiles}
winFiles = ${commonFiles}
standardFiles = ${commonFiles}\
				web-localData.js

all:ios android win standard
ios:${iosFiles} 
	cat ${iosFiles} > /home/jpginc/YouLose-iphone/www/js/main.js
android:${androidFiles} 
	cat ${androidFiles} > /home/jpginc/YouLose-android/www/js/main.js
win:${winFiles} 
	cat ${winFiles} > /home/jpginc/YouLose-win/www/js/main.js
standard: ${winFiles} 
	cat ${winFiles} > /home/jpginc/YouLose-standard/js/main.js
