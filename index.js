"use strict";

/* global $, angular */

(function(){
	var maitreyaWrapper = angular
		.module('maitreyaWrapper',[])
		.controller('WrapController',WrapController);
	
	WrapController.$inject = ['$scope'];
	function WrapController($scope){
		
		var wrap = this;
		
		wrap.height = "700px";
		wrap.width = "360px";
		
	}
})();