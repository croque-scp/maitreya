/*\
 * Maitreya.js, the workhorse behind SCP-4000
 * Written by Croquembouche, released under MIT
 *
 * Reminder to author: replace all 4000 with whatever number this ends up with
\*/

"use strict";

/* global $, angular */

// and here begins AngularJS
(function(){
	var maitreyaWrapper = angular
		.module('maitreyaWrapper',[])
		.controller('WrapController',WrapController);
	
	WrapController.$inject = ['$scope'];
	function WrapController($scope){
		
		var wrap = this;
		
		wrap.height = "700px";
		wrap.width = "700px";
		
	}
})();