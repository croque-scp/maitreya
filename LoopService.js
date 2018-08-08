"use strict";

/* global $, angular */

(function(){
	angular
		.module('maitreya')
		.service('LoopService',LoopService);
	
	function LoopService() {
		var aic = {}, $scope = {};
		this.use = function(scope) {
			$scope = scope;
			aic = scope.aic;
		};
		const loop = this;
		
		loop.breachLoop = function(bigSection, smallSection,msg) {
			// smallSection may have trailing underscores - clean these up
			smallSection = smallSection.replace(/_/g,"");
			
			console.log("Breach - " + bigSection + " - " + smallSection);
			
			var delay = 0;
			switch(bigSection) {
				case "INTRODUCTION":
					switch(smallSection) {
/*###########################################################*/
						
						case "start":
							aic.ready.messages = true;
							aic.ready.breach = true;
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.presentOptions("breach",bigSection,["helloNormal","helloInquisitive","helloDiagnostic"]); console.log("options'd!");
								aic.vars.chatEmphasis = true;
							},delay*1000 + aic.maitreyaDelay*1000);
							break;
						case "helloInquisitive":
							aic.vars.chatEmphasis = false;
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay,delay*1000 + aic.maitreyaDelay*1000);
							setTimeout(function() {
								aic.presentOptions("breach",bigSection,["knowNormal","knowPatronising","knowNot"]); console.log("options'd!");
							},delay*1000 + aic.maitreyaDelay*1000);
							break;
						case "knowPatronising":
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.breachLoop(bigSection,"knowNormal"); console.log("breachLoop'd!");
							},delay*1000);
							break;
						case "knowNormal":
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.breachLoop(bigSection,"knowNot"); console.log("breachLoop'd!");
							},delay*1000);
							break;
						case "knowNot":
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.presentOptions("breach",bigSection,["knowActually","knowNotNot"]); console.log("options'd!");
							},delay*1000 + aic.maitreyaDelay*1000);
							break;
						case "knowActually":
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.breachLoop(bigSection,"explain1__"); console.log("breachLoop'd!");
							},delay*1000);
							break;
						case "knowNotNot":
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.presentOptions("breach",bigSection,["knowNormal_","knowNotNotNot"]); console.log("options'd!");
							},delay*1000 + aic.maitreyaDelay*1000);
							break;
						case "knowNotNotNot":
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.presentOptions("breach",bigSection,["knowNormal__","pissOff"]); console.log("options'd!");
							},delay*1000 + aic.maitreyaDelay*1000);
							break;
						case "pissOff":
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								endingLoop("ENDING",smallSection);
							},delay*1000);
							break;
						case "helloNormal":
							aic.vars.chatEmphasis = false;
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.breachLoop(bigSection,"explain1___"); console.log("breachLoop'd!");
							},delay*1000);
							break;
						case "helloDiagnostic":
							aic.vars.chatEmphasis = false;
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.presentOptions("breach",bigSection,["helloNotYet"]); console.log("options'd!");
							},delay*1000 + aic.maitreyaDelay*1000);
							break;
						case "helloNotYet":
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.breachLoop(bigSection,"explain1____"); console.log("breachLoop'd!");
							},delay*1000);
							break;
						case "explain1":
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.presentOptions("breach",bigSection,["explainApo","doKnow"]); console.log("options'd!");
							},delay*1000 + aic.maitreyaDelay*1000);
							break;
						case "doKnow":
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.presentOptions("breach",bigSection,["yesSkip","noSkip"]); console.log("options'd!");
							},delay*1000 + aic.maitreyaDelay*1000);
							break;
						case "yesSkip":
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.breachLoop(bigSection,"PROCEED"); console.log("breachLoop'd!");
							},delay*1000);
							break;
						case "noSkip":
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.breachLoop(bigSection,"explain2"); console.log("breachLoop'd!");
							},delay*1000);
							break;
						case "explain2":
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.presentOptions("breach",bigSection,["pInitiative","pIncredulous",(aic.vars.breach.opinion>0?"pIncredulous_":undefined),(aic.vars.breach.opinion<0?"pIncredulous__":undefined)]); console.log("options'd!");
							},delay*1000 + aic.maitreyaDelay*1000);
							break;
						case "pIncredulous":
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.breachLoop(bigSection,"explain3"); console.log("breachLoop'd!");
							},delay*1000);
							break;
						case "pInitiative":
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.breachLoop(bigSection,"explain3_"); console.log("breachLoop'd!");
							},delay*1000);
							break;
						case "explain3":
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.presentOptions("breach",bigSection,["goNoAsk","goAsk","goNo"]); console.log("options'd!");
							},delay*1000 + aic.maitreyaDelay*1000);
							break;
						case "goNo":
							aic.vars.breachExplainedVoice = true;
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.presentOptions("breach",bigSection,["comply","pissOff_"]); console.log("options'd!");
							},delay*1000 + aic.maitreyaDelay*1000);
							break;
						case "explainApo":
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.breachLoop(bigSection,"explain2_"); console.log("breachLoop'd!");
							},delay*1000);
							break;
						case "goNoAsk":
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
							},delay*1000);
							break;
						case "goAsk":
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.presentOptions("breach",bigSection,["ask1","ask2","ask3","askName"]); console.log("options'd!");
							},delay*1000 + aic.maitreyaDelay*1000);
							break;
						case "askName":
							delay = aic.writeDialogue("breach",msg,"breach"); console.log(delay);
							setTimeout(function() {
								aic.presentOptions("breach",bigSection,["ask1_","ask2_","ask3_"]); console.log("options'd!");
							},delay*1000 + aic.maitreyaDelay*1000);
							break;

/*###########################################################*/
						default:
							throw new Error(smallSection + " is not an event in " + bigSection);
					}
					break;
				
				default:
					throw new Error(bigSection + " is not an event");
			}
		};
		
		loop.alexandraLoop = function() {};
	}
	
})();