(function(){
	'use strict';

	var app = angular.module('avatar', ['ngFileUpload']);

	app.factory('imgLib', function(){
		var lib = [
			{
				name: 'faces',
				quantity: 9,
				type: '.jpg'
			},{
				name: 'mask',
				quantity: 4
			},{
				name: 'glasses',
				quantity: 5
			},{
				name: 'hair',
				quantity: 9
			},{
				name: 'beards',
				quantity: 8
			},{
				name: 'lips',
				quantity: 6
			}
		];

		var imgLib = {};
		var type;

		for (var i = 0; i < lib.length; i++) {
			imgLib[lib[i].name] = [];
			type = (lib[i].type) ? lib[i].type : '.png';
			for (var j = 0; j < lib[i].quantity; j++) {
				imgLib[lib[i].name].push('img/' + lib[i].name + '/' + j + type);
			}
		}
		return imgLib;
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

	app.config(function(canvasProvider){
		console.log(canvasProvider);
		canvasProvider.setCanvas('c');
	});

	
	
})();