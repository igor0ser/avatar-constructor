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

		var animation = {
			rotate: function(obj){
				obj.animate('angle', '=+1', {
					onChange: canvas.renderAll.bind(canvas),
					duration: 5,
					onComplete: function(){
						requestAnimationFrame(animation.rotate.bind(null, obj));
					}
				});
			},
			scale: function(obj, coef){
				coef = coef || 1.01;
				if (obj.width * obj.scaleX > canvas.width || obj.width * obj.scaleX < 50){
					coef = 1 / coef;
				} 
				obj.scaleX *= coef;
				obj.scaleY *= coef;
				canvas.renderAll();
				requestAnimationFrame(animation.scale.bind(null, obj, coef));
			},
			translate: function(obj, top, left){
				left = left || 2;
				top = top || 3;
				obj.left += left;
				obj.top += top;
				if (obj.left > canvas.width || obj.left < 0){
					left = -left;
				}
				if (obj.top > canvas.height || obj.top < 0){
					top = -top;
				}
				canvas.renderAll();
				requestAnimationFrame(animation.translate.bind(null, obj, top, left));

			}
		};

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

		function addText(text, fontSize, animationObj) {
			var t = new fabric.Text(text, {
				fontSize: +fontSize,
				fontFamily: 'Calibri',
				stroke: '#fff',
				fill: 'red',
				originX: 'center',
				originY: 'center'
			});
			canvas.centerObject(t);
			canvas.add(t);
			for (var key in animationObj){
				if (animationObj[key]){
					animation[key](t);
				}
			}
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