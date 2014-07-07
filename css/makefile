commonFiles = main.css
androidFiles = android.css
iosFiles = ios.css
winFiles = win.css

all:ios android win
ios:${commonFiles} ${iosFiles} 
	cat $^ > /home/jpginc/YouLose-iphone/www/css/style.css
android:${commonFiles} ${androidFiles} 
	cat $^ > /home/jpginc/YouLose-android/www/css/style.css
win:${commonFiles} ${winFiles} 
	cat $^ > /home/jpginc/YouLose-android/www/css/style.css
