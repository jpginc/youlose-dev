commonFiles = main.css\
			
androidFiles = ${commonFiles}\
			   android.css
iosFiles = ${commonFiles}\
		   ios.css
winFiles = ${commonFiles}\
		   win.css
webFiles = ${commonFiles}\
		   		web.css
		   
all:ios android win web
ios:${iosFiles} 
	cat ${iosFiles} > /home/jpginc/YouLose-iphone/www/css/style.css
	cp jquery.mobile-1.4.3.min.css /home/jpginc/YouLose-iphone/www/css/
	cp images/* /home/jpginc/YouLose-iphone/www/css/images -r
android:${androidFiles} 
	cat ${androidFiles} > /home/jpginc/YouLose-android/www/css/style.css
	cp jquery.mobile-1.4.3.min.css /home/jpginc/YouLose-android/www/css/
	cp images/* /home/jpginc/YouLose-android/www/css/images -r
win:${winFiles} 
	cat ${winFiles} > /home/jpginc/YouLose-win/www/css/style.css
	cp jquery.mobile-1.4.3.min.css /home/jpginc/YouLose-win/www/css/
	cp images/* /home/jpginc/YouLose-win/www/css/images -r
web:${webFiles} 
	cat ${webFiles} > /home/jpginc/YouLose-web/css/style.css
	cp jquery.mobile-1.4.3.min.css /home/jpginc/YouLose-web/css/
	cp images/* /home/jpginc/YouLose-web/css/images -r
