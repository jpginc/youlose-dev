commonFiles = main.js
androidFiles = a-hello.js
iosFiles = i-hello.js
winFiles = w-hello.js

all:ios android win
ios:${commonFiles} ${iosFiles} 
	cat ${commonFiles} > /home/jpginc/YouLose-iphone/www/js/main.js
	cat ${iosFiles} > /home/jpginc/YouLose-iphone/www/js/platformSpecific.js
android:${commonFiles} ${androidFiles} 
	cat ${commonFiles} > /home/jpginc/YouLose-android/www/js/main.js
	cat ${androidFiles} > /home/jpginc/YouLose-android/www/js/platformSpecific.js
win:${commonFiles} ${winFiles} 
	cat ${commonFiles} > /home/jpginc/YouLose-win/www/js/main.js
	cat ${winFiles} > /home/jpginc/YouLose-win/www/js/platformSpecific.js
