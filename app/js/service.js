(function(){
	'use strict';

	var app = angular.module('avatar');
	app.provider('canvas', function(){

		var canvas;

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
				if (obj.left > canvas.width || obj.left < 0){ left = -left; }
				if (obj.top > canvas.height || obj.top < 0){ top = -top; }
				obj.left += left;
				obj.top += top;
				canvas.renderAll();
				requestAnimationFrame(animation.translate.bind(null, obj, top, left));

			}
		};

		function setBgImg(imgUrl) {
			fabric.Image.fromURL(imgUrl, function (img) {
				var ratio = img.width / img.height;
				img.width = canvas.getWidth();
				img.height = canvas.getHeight();
				canvas.centerObject(img);
				canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
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

		function setBgImgFromFile(data){
			fabric.util.loadImage(data, function (img) {
				var oImg = new fabric.Image(img);
				var ratio = oImg.width / oImg.height; 
				oImg.width = canvas.width;
				oImg.height = oImg.width / ratio;
				canvas.centerObject(oImg);
				canvas.setBackgroundImage(oImg, canvas.renderAll.bind(canvas));
			});
		}

		function addImgFromFile(data){
			fabric.util.loadImage(data, function (img) {
				var oImg = new fabric.Image(img);
				var ratio = img.width / img.height;
				oImg.width = canvas.getWidth() / 3;
				oImg.height = oImg.width / ratio;
				canvas.centerObject(oImg);
				canvas.add(oImg);
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
			var res = canvas.toDataURL();
			callback(res);
		}




		return {
			setCanvas: function(id){
				canvas = new fabric.Canvas(id);
			},
			$get: function(){
				return {
					setBgImg: setBgImg,
					addImg: addImg,
					setBgImgFromFile: setBgImgFromFile,
					addImgFromFile: addImgFromFile,
					addText: addText,
					saveImg: saveImg
				};
			}
		};

	});


	app.directive('customOnChange', function() {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				var onChangeHandler = scope.$eval(attrs.customOnChange);
				element.bind('change', onChangeHandler);
			}
		};
	});
})();