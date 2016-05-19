(function(){
	'use strict';

	var app = angular.module('avatar');
	app.service('canvas', function(){

		var canvas = new fabric.Canvas('c');
		var bg = new fabric.StaticCanvas('bg');
		setBgImg('img/faces/0.jpg');

		document.addEventListener('keydown', function(e){
			if (e.which === 46 && canvas.getActiveObject()){
				canvas.getActiveObject().remove();
			}
		});


		function setBgImg(imgUrl) {
			fabric.Image.fromURL(imgUrl, function (img) {
				var ratio = img.width / img.height;
				img.width = bg.getWidth();
				img.height = bg.getHeight();
				bg.centerObject(img);
				bg.setBackgroundImage(img, bg.renderAll.bind(bg));
			});
		}

		function addImg(imgUrl) {
			fabric.Image.fromURL(imgUrl, function (img) {
				var ratio = img.width / img.height;
				img.width = canvas.getWidth() / 3;
				img.height = img.width / ratio;
				canvas.centerObject(img);
				canvas.add(img);
			});
		}


		return {
			setBgImg: setBgImg,
			addImg: addImg
		};

	});
})();