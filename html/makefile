start: start.html\
	licence.html\
	com-head.html
all:ios android win
ios: ${start}
	cat start.html licence.html com-head.html ios-head.html com-body.html ios-body.html \
		> /home/jpginc/YouLose-iphone/www/index.html
android: ${start}
	cat start.html licence.html com-head.html and-head.html com-body.html and-body.html \
		> /home/jpginc/YouLose-android/www/index.html
win: ${start}
	cat start.html licence.html com-head.html win-head.html com-body.html win-body.html \
		> /home/jpginc/YouLose-win/www/index.html
