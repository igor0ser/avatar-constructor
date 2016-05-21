(function(){
	'use strict';

	var app = angular.module('avatar');
	app.controller('AvatarController', function(imgLib, canvas, Upload, $scope, $timeout){

		this.imgLib = imgLib;
		canvas.setBgImg(imgLib.faces[0]);
		this.form = {
			text: '22',
			fontSize: 22,
			animation: {
				rotate: false,
				scale: false,
				translate: true
			}
		};

		this.addImg = function(url, key){
			console.log(key);
			console.log(url);
			if (key === 'faces'){
				canvas.setBgImg(url);
			} else {
				canvas.addImg(url);
			}
		};

		this.addText = function(text, fontSize){
			console.log(this.form);
			canvas.addText(this.form.text, +this.form.fontSize, this.form.animation);
			this.form = {
				text: '',
				fontSize: '',
				animation: {
					rotate: false,
					scale: false,
					translate: false
				}
			};
		};

		var downloadLink = document.getElementById('save-img');
		this.saveImg = function(){
			canvas.saveImg(function(res){
				downloadLink.href = res;
				downloadLink.click();
			});
		};


		this.uploadImg = function ($event) {
			console.log(12345);
			console.log($event);
			console.log($event.target.files[0]);
		};



		$scope.uploadFiles = function(file, errFiles) {
			$scope.f = file;
			$scope.errFile = errFiles && errFiles[0];
			if (file) {
				file.upload = Upload.upload({
					url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
					data: {file: file}
				});

				file.upload.then(function (response) {
					$timeout(function () {
						file.result = response.data;
						console.log(file.result);
/*						var reader = new FileReader();
						reader.onload = function (f) {
							console.log(f);
						}*/
					});
				}, function (response) {}, function (evt) {});
			}   
		};

	});

})();
/*var canvas = new fabric.Canvas('c');
document.getElementById('file').addEventListener("change", function (e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.onload = function (f) {
	var data = f.target.result;					
	fabric.Image.fromURL(data, function (img) {
	  var oImg = img.set({left: 0, top: 0, angle: 00,width:100, height:100}).scale(0.9);
	  canvas.add(oImg).renderAll();
	  var a = canvas.setActiveObject(oImg);
	  var dataURL = canvas.toDataURL({format: 'png', quality: 0.8});
	});
  };
  reader.readAsDataURL(file);
});*/
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
