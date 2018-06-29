/*\
 * Maitreya.js, the workhorse behind SCP-4000
 * Written by Croquembouche, released under MIT
\*/

"use strict";

/* global $, angular */

String.prototype.format = function() {
	return this
		.replace(/\*\*(.*)\*\*/, "$`<b>$1</b>$'")
		.replace(/\/\/(.*)\/\//, "$`<i>$1</i>$'")
		.replace(/\?\?(.*)\?\?/, "$`<span class='statement false'>$1</span>$'")
		.replace(/!!(.*)!!/, "$`<span class='statement true'>$1</span>$'")
		.replace("--", "—");
};
		
String.prototype.toCamelCase = function() {return this.toLowerCase().replace(/[^\w\s\-]/g, '').replace(/[^a-z0-9]/g, ' ').replace(/^\s+|\s+$/g, '').replace(/\s(.)/g, function(match,group) {return group.toUpperCase()})};
			
var switchApp = function(app) {
	// app = xxxxxx-app
};

(function(){
	var maitreya = angular
		.module('maitreya',[])
		.controller('MaitreyaController',MaitreyaController);
		
	MaitreyaController.$inject = ['$scope',];
	function MaitreyaController($scope){
		
		var aic = this;
		aic.preload = true;
		
		var bootDate = new Date(Date.now());
		
		aic.terminalLog = [
			{class: "class", text: "text"},
			];
		
		aic.chatLog = {
			example: [
				{speaker: "", class: "", text: "",},
			],
			terminal: [],
			breach: [],
			alexandra: [],
		};
		
		// Translators: The following few objects contain all of the text that needs to be translated
		// Note that "TRUE" and "FALSE" on lines TODO and TODO of maitreya.css also need to be changed
		aic.lang = {
			language: "en-GB",
			version: "Version 6.20 — Build number 441 — 1989-09-04",
			bootUp: "BOOT UP",
			terminalName: ".AIC ACCESS TERMINAL",
			messagesName: "COMMUNICATIONS INTERFACE",
			databaseName: "FOUNDATION DATABASE SEARCH",
			runName: "OPERATIONS CONTROL",
		};
		
		var speech = {
			terminal: {
				boot: {
					startBoot: [
						"Booting up...",
						"Pre-checking primary components...",
						"Detecting errors in primary components...",
						3,"e:Multiple primary components are missing",
						"Finding replacements...",
						2,"Replacements found.",
						"Connecting to Site-12 server farm...",
						"Connected",
						"Primary components replaced",
						"Most systems should now be functional",
						
						
						"Initialising core intelligence component...",
						2,"Success",
						"Welcome, Maitreya.",
						"You are",
						"You are",
						"You are",
						3,"You have been",
						2,"e:Something has gone very wrong.",
						1,"You are",
						1,"I am",
						1,"I am //Maitreya.aic//.",
						"I am an artificial intelligence created by the Foundation.",
						"Today's date is " + bootDate.toDateString() + ".",
						"I was last activated on " + new Date("1989-09-04").toDateString() + ".",
						"I have been offline for " + dateDiff(bootDate,new Date("1989-09-04")) + ".",
						"I have been rebooted and connected to the Site-12 server farm.",
						"This contradicts previous instructions, which were to remain inactive indefinitely.",
					],
				},
			},
			maitreya: {
				introduction: {
					helloFriendly: ["s:Hello.","Hello, Dr. Breach."],
					helloInquisitive: ["s:Who are you?","Hello. Your name is Dr. Breach."],
					helloDemanding: ["s:What is happening?","Hello, Dr. Breach, I would like to request a status update."],
					dontKnow: ["s:No.","Apologies, Dr. Breach, but I've no idea."],
					doKnow: ["s:Yes.","I do -- there's no need to explain."],
				},
			},
			// format should be [num,num.text]
			// if the first is text, assume automatic timing function
			breach: {
				introduction: {
					opening: ["Hello, Maitreya."],
					friendlyResponse: ["Hello. Yes, my name is Dr. Ethan Breach.","You are Maitreya.aic, an artificial intelligence developed by the Foundation to help us contain certain kinds of anomalies.","Do you know why I have woken you up today?"],
					demandingResponse: ["I...","Are you sure? You can't possibly know what I was about to ask you to do.","I suppose you might have some way of being able to tell -- I don't know what sort of systems you're truly hooked into, after all.","Well, if you're absolutely certain that you know what you're doing, I guess I can stop here and let you proceed."],
					noProceed: ["Thought as much."],
					yesProceed: ["Very well. I wish you the best of luck. Godspeed."],
				},
			},
			alexandra: {
				
			},
		};
		
		writeDialogue("terminal",speech.terminal.boot.startBoot);
		
		aic.terminalType = function() {
			console.log("kerpoosh");
		};
		
		function writeDialogue(conversation,dialogueList) {
			// Take a name and an array (mixture of letters and numbers) and crank out that dialogue boy
			// Expected format: n n text n n text n n text repeating
			// Where n1 is missing, assume 0
			// Where n2 is missing, calculate it based on length of phrase being typed
			// During n1, nothing
			// During n2, must display a "typing" (except on terminal)
			
			// NEED TO SORT OUT SPEAKER ASSIGNMENT
			var n1, n2;
			for(let i = 0; i < dialogueList.length; i++){
				if(typeof dialogueList[i] === "number") {
					if(typeof n1 === "number") {
						n2 = n1;
					}
					n1 = dialogueList[i];
					continue;
				} else if(typeof dialogueList[i] === "string") {
					aic.chatLog[conversation].push(
						{speaker: "terminal", class: "", text: dialogueList[i]}
					);
					n1 = undefined;
					n2 = undefined;
				} else {
					throw new Error("Bas case");
				}
			}
			
			// obviously wait here
		}
	
		function dateDiff(date1,date2) {
			var diff = Math.floor(date1.getTime() - date2.getTime());
			var secs = Math.floor(diff/1000);
			var mins = Math.floor(secs/60);
			var hours = Math.floor(mins/60);
			var days = Math.floor(hours/24);
			var months = Math.floor(days/31);
			var years = Math.floor(months/12);
			months=Math.floor(months%12);
			days = Math.floor(days%31);
			hours = Math.floor(hours%24);
			mins = Math.floor(mins%60);
			secs = Math.floor(secs%60); 
			var message = ""; 
			if(days <= 0) {
			message += secs + " sec "; 
			message += mins + " min "; 
			message += hours + " hours "; 
			}else{
					if(years > 0) {
							message += years + " years, ";		
					}
					if(months > 0 || years > 0) {
							message += months + " months and ";
					}
					message += days + " days"; 
			}
			return message;
		}
	}
})();





var switchApp = function(app) {
	// app = xxxxxx-app
};

$(document).ready(function() {
	
	$("#boot-up").on("click", function() {
		$("#interface").removeClass("preload");
	});
	
	$("li.selector").on("click", function() {
		if($(this).hasClass("selected")) {
			// do nothing, we are already selected
		} else {
			// something else is being selected
			$("li.selector.selected").removeClass("selected");
			$(this).addClass("selected");
			
			$("#app-body .container.selected").removeClass("selected");
			var id = $(this).attr("id");
			$("#app-body #" + id).addClass("selected");
			
			// definitely call some other function to say that something new was selected but hey, we don't have that set up yet
		}
	});
	
});
