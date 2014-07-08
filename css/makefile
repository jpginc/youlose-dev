commonFiles = main.css
androidFiles = ${commonFiles}\
			   android.css
iosFiles = ${commonFiles}\
		   ios.css
winFiles = ${commonFiles}\
		   win.css
standardFiles = ${commonFiles}\
		   		standard.css
		   
all:ios android win standard
ios:${iosFiles} 
	cat ${iosFiles} > /home/jpginc/YouLose-iphone/www/css/style.css
android:${androidFiles} 
	cat ${androidFiles} > /home/jpginc/YouLose-android/www/css/style.css
win:${winFiles} 
	cat ${winFiles} > /home/jpginc/YouLose-android/www/css/style.css
standard:${standardFiles} 
	cat ${standardFiles} > /home/jpginc/YouLose-standard/css/style.css
