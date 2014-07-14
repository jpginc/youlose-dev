// will only work on mobile devices
controller.log("mobile startup", 1);
document.addEventListener("deviceready", controller.initialize, false);
document.addEventListener("resume", controller.resume, false);

