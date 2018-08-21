"use strict";

/* global $, angular */

(function(){
	angular
		.module('maitreya')
		.service('LoopService',LoopService);
	
	function LoopService($timeout) {
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
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.presentOptions("breach",bigSection,[
									"helloNormal",
									"helloInquisitive",
									"helloDiagnostic"
								]);
								aic.vars.messagesEmphasis = true;
							},delay*1000 + aic.maitreyaDelay*1000, true);
							break;
						case "helloInquisitive":
							aic.vars.messagesEmphasis = false;
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.presentOptions("breach",bigSection,[
									"knowNormal",
									"knowPatronising",
									"knowNot"
								]);
							},delay*1000 + aic.maitreyaDelay*1000, true);
							break;
						case "knowPatronising":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"explain1");
							},delay*1000);
							break;
						case "knowNormal":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"explain1_");
							},delay*1000);
							break;
						case "knowNot":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.presentOptions("breach",bigSection,[
									"knowActually",
									"knowNotNot"
								]);
							},delay*1000 + aic.maitreyaDelay*1000, true);
							break;
						case "knowActually":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"explain1__");
							},delay*1000);
							break;
						case "knowNotNot":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.presentOptions("breach",bigSection,[
									"knowNormal_",
									"knowNotNotNot"
								]);
							},delay*1000 + aic.maitreyaDelay*1000, true);
							break;
						case "knowNotNotNot":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.presentOptions("breach",bigSection,[
									"knowNormal__",
									"pissOff"
								]);
							},delay*1000 + aic.maitreyaDelay*1000, true);
							break;
						case "pissOff":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.endingLoop("ENDING","pissOff");
							},delay*1000);
							break;
						case "helloNormal":
							aic.vars.messagesEmphasis = false;
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"explain1___");
							},delay*1000);
							break;
						case "helloDiagnostic":
							aic.vars.messagesEmphasis = false;
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.presentOptions("breach",bigSection,[
									"helloNotYet"
								]);
							},delay*1000 + aic.maitreyaDelay*1000, true);
							break;
						case "helloNotYet":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"explain1____");
							},delay*1000);
							break;
						case "explain1":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.presentOptions("breach",bigSection,[
									"explainApo",
									"doKnow"
								]);
							},delay*1000 + aic.maitreyaDelay*1000, true);
							break;
						case "doKnow":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.presentOptions("breach",bigSection,[
									"yesSkip",
									"noSkip"
								]);
							},delay*1000 + aic.maitreyaDelay*1000, true);
							break;
						case "yesSkip":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"PROCEED");
							},delay*1000);
							break;
						case "noSkip":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"explain2");
							},delay*1000);
							break;
						case "explain2":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.presentOptions("breach",bigSection,[
									"pInitiative",
									"pIncredulous"
								]);
							},delay*1000 + aic.maitreyaDelay*1000, true);
							break;
						case "pIncredulous":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"explain3");
							},delay*1000);
							break;
						case "pInitiative":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"explain3_");
							},delay*1000);
							break;
						case "explain3":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.presentOptions("breach",bigSection,[
									"goNoAsk",
									"goAsk",
									"goNo"
								]);
							},delay*1000 + aic.maitreyaDelay*1000, true);
							break;
						case "goNo":
							aic.vars.breachExplainedVoice = true;
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.presentOptions("breach",bigSection,[
									"comply",
									"pissOff_"
								]);
							},delay*1000 + aic.maitreyaDelay*1000, true);
							break;
						case "explainApo":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"explain2_");
							},delay*1000);
							break;
						case "goNoAsk":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"letsGo");
							},delay*1000);
							break;
						case "goAsk":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.presentOptions("breach",bigSection,[
									"askIS12",
									"askScp4000",
									"askSelf",
									"askTask",
									"askBreach",
									"noQuestions"
								]);
							},delay*1000 + aic.maitreyaDelay*1000, true);
							break;
						case "askName":
							aic.vars.hasAskedName = true;
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"askAgain");
							},delay*1000);
							break;
						case "noQuestions":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"letsGo_");
							},delay*1000);
							break;
						case "askAgain":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.presentOptions("breach",bigSection,[
									!aic.vars.hasAskedSite12 ? "askIS12_" : void 0,
									!aic.vars.hasAsked4000 ? "askScp4000_" : void 0,
									!aic.vars.hasAskedDeath && aic.vars.hasAsked4000 ? "askDeath" : void 0,
									!aic.vars.hasAskedSelf ? "askSelf_" : void 0,
									!aic.vars.hasAskedTask ? "askTask_" : void 0,
									!aic.vars.hasAskedBreach ? "askBreach_" : void 0,
									!aic.vars.hasAskedName && aic.vars.hasAskedSite12 && aic.vars.hasAsked4000 && aic.vars.hasAskedSelf && aic.vars.hasAskedTask && aic.vars.hasAskedBreach ? "askName" : void 0,
									"noQuestions_"
								]);
							},delay*1000 + aic.maitreyaDelay*1000, true);
							break;
						case "askIS12":
							aic.vars.hasAskedSite12 = true;
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"askAgain_");
							},delay*1000);
							break;
						case "askScp4000":
							aic.vars.hasAsked4000 = true;
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"askAgain__");
							},delay*1000);
							break;
						case "askSelf":
							aic.vars.hasAskedSelf = true;
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.presentOptions("breach",bigSection,[
									"askSelf2",
									"askAgain___"
								]);
							},delay*1000 + aic.maitreyaDelay*1000, true);
							break;
						case "askTask":
							aic.vars.hasAskedTask = true;
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"askAgain____");
							},delay*1000);
							break;
						case "askBreach":
							aic.vars.hasAskedBreach = true;
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"askAgain_____");
							},delay*1000);
							break;
						case "askDeath":
							aic.vars.hasAskedDeath = true;
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"askAgain______");
							},delay*1000);
							break;
						case "askSelf2":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.presentOptions("breach",bigSection,[
									"askSelf3",
									"unAskSelf3"
								]);
							},delay*1000 + aic.maitreyaDelay*1000, true);
							break;
						case "askSelf3":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.presentOptions("breach",bigSection,[
									"askSelf4",
									"unAskSelf4"
								]);
							},delay*1000 + aic.maitreyaDelay*1000, true);
							break;
						case "askSelf4":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.presentOptions("breach",bigSection,[
									"askSelf5",
									"unAskSelf5"
								]);
							},delay*1000 + aic.maitreyaDelay*1000, true);
							break;
						case "askSelf5":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"askSelf6");
								aic.endingLoop("ENDING","pissOff");
							},delay*1000);
							break;
						case "askSelf6":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
							},delay*1000);
							break;
						case "unAskSelf5":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
							},delay*1000);
							break;
						case "unAskSelf4":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"askAgain_______");
							},delay*1000);
							break;
						case "unAskSelf3":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"askAgain________");
							},delay*1000);
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