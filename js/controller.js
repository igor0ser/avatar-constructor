(function(){
	'use strict';

	var app = angular.module('avatar');
	app.controller('AvatarController', function(imgLib){

		this.imgLib = imgLib;
		console.log(imgLib);
		
	});
})();