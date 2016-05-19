(function(){
	'use strict';

	var app = angular.module('avatar');
	app.controller('AvatarController', function(imgLib, canvas){

		this.imgLib = imgLib;
		this.addImg = function(url, key){
			console.log(key);
			console.log(url);
			if (key === 'faces'){
				canvas.setBgImg(url);
			} else {
				canvas.addImg(url);
			}
		};
		


	});
	console.log(123);
})();
/*
var canvas = new fabric.Canvas('c');
var canvas2 = new fabric.StaticCanvas('bg');

setBackgroundImage2(canvas2, 'img/faces/0.jpg');

function addImgToCanvas(canvas, imgUrl) {
	fabric.Image.fromURL(imgUrl, function (oImg) {
		var ratio = oImg.width / oImg.height;
		oImg.width = canvas.getWidth() / 5;
		oImg.height = oImg.width / ratio;
		canvas.centerObject(oImg);
		canvas.add(oImg);
	});
}

function setBackgroundImage(canvas, base64Image) {
	fabric.util.loadImage(base64Image, function (img) {
		var padding = 20;
		var oImg = new fabric.Image(img);
		var ratio = oImg.width / oImg.height; 
		if (oImg.width > 500) {
			oImg.width = 500;
			oImg.height = oImg.width / ratio;
		} else if (oImg.height > 500) {
			oImg.height = 500;
			oImg.width = oImg.height * ratio;
		}
		canvas.setHeight(oImg.height + 2 * padding);
		canvas.setWidth(oImg.width + 2 * padding);
		canvas.setBackgroundImage(oImg, canvas.renderAll.bind(canvas), {left:padding, top:padding});
	});
}

function setBackgroundImage2(canvas, imgUrl) {
	fabric.Image.fromURL(imgUrl, function (oImg) {
		var ratio = oImg.width / oImg.height;
		oImg.width = canvas.getWidth();
		oImg.height = canvas.getHeight();
		canvas.centerObject(oImg);
		canvas.setBackgroundImage(oImg, canvas.renderAll.bind(canvas));
	});
}*/