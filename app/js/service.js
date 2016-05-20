(function(){
	'use strict';

	var app = angular.module('avatar');
	app.provider('canvas', function(){

		var canvas;
		var bg;

		var bgImg;

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
				bgImg = imgUrl;
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

		function addText(text, fontSize) {
			var t = new fabric.Text(text, {fontSize: +fontSize, fontFamily: 'Calibri', stroke: '#fff', fill: 'red'});
			canvas.centerObject(t);
			canvas.add(t);
		}

		function saveImg(callback) {
			canvas.deactivateAll().renderAll();
			fabric.Image.fromURL(bgImg, function (img) {
				var ratio = img.width / img.height;
				img.width = bg.getWidth();
				img.height = bg.getHeight();
				canvas.centerObject(img);
				canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
				var res = canvas.toDataURL();
				callback(res);
				canvas.setBackgroundColor(null, canvas.renderAll.bind(canvas));
			});
		}


		return {
			setCanvases: function(id1, id2){
				canvas = new fabric.Canvas(id1);
				bg = new fabric.StaticCanvas(id2);
			},
			$get: function(){
				return {
					setBgImg: setBgImg,
					addImg: addImg,
					addText: addText,
					saveImg: saveImg
				};
			}
		};

	});
})();