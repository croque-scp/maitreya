/*\
 * Maitreya.js, the workhorse behind SCP-4000
 * Written by Croquembouche, released under MIT
\*/

"use strict";

/* global $, angular */
		
String.prototype.toCamelCase = function() {return this.toLowerCase().replace(/[^\w\s\-]/g, '').replace(/[^a-z0-9]/g, ' ').replace(/^\s+|\s+$/g, '').replace(/\s(.)/g, function(match,group) {return group.toUpperCase()})};

String.prototype.format = function() {
	return this
		.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
		.replace(/\/\/(.*?)\/\//g, "<i>$1</i>")
		.replace(/\?\?(.*?)\?\?/g, "<span class='statement false'>$1</span>")
		.replace(/!!(.*?)!!/g, "<span class='statement true'>$1</span>")
		.replace(/--/g, "—")
		.replace(/\|\|\|\|/g,"<br>");
};
			
var switchApp = function(app) {
	// app = xxxxxx-app
};

(function(){
	var maitreya = angular
		.module('maitreya',['ngSanitize', 'ngAnimate'])
		.controller('MaitreyaController',MaitreyaController);
		
	MaitreyaController.$inject = ['$scope'];
	function MaitreyaController($scope){
		
		var aic = this;
		
		var cheats = {
			impatientMode: false, // all messages appear instantly
		};
		
		const typingSpeed = 0.05; // seconds per letter
		var bootDate = new Date(Date.now());
		
		var timeOutList = [];
		
		aic.preload = false;
		aic.selectedApp = "messages";
		aic.selectedSpeaker = "breach";
		aic.isSpeaking = {
			terminal: false,
			breach: false,
			alexandra: false,
		};
		
		aic.onMobile = $("#interface").width() < 700;
		
		// EVERYTHING MUST BE ADDED TO THIS IN REVERSE ORDER.
		// ARRAY.UNSHIFT(), NOT ARRAY.PUSH()
		aic.chatLog = {
			example: [
				{speaker: "", cssClass: "", text: "",},
			],
			terminal: [],
			breach: [],
			alexandra: [],
		};
		
		// Translators: The following few objects contain all of the text that needs to be translated
		// Note that "TRUE" and "FALSE" on lines TODO and TODO of maitreya.css also need to be changed (also ERROR WARNING Info)
		aic.lang = {
			language: "en-GB",
			version: "Version 6.20 — Build number 441 — 1989-09-04",
			mobileWarning: "It looks like you're on a mobile device. Maitreya.aic is built for laptops and desktop computers, and mobile has a non-optimal user experience. It is recommended that you return to use Maitreya on a laptop or desktop computer. Press the button below if you'd like to continue anyway.",
			bootUp: "BOOT UP",
			commandInput: "MANUAL COMMAND INPUT",
			terminalSend: "SEND",
			terminalAppName: ".AIC ACCESS TERMINAL",
			messagesAppName: "COMMUNICATIONS INTERFACE",
			databaseAppName: "FOUNDATION DATABASE SEARCH",
			runAppName: "OPERATIONS CONTROL",
			commands: {
				separator: " ", // the character by which terminal commands are delimited - eg "/hack breach password" or "/hack_breach_password" or whatever
				boot: ["boot"],
				help: ["help"],
				change: ["switch","app","change","switchapp","changeapp"],
				cheat: ["cheat","cheatcode"],
				wipe: ["wipe","erase","restart","forget","clear","undo"],
				hack: ["hack"],
				cheats: {
					impatient: "gottagofast",
				},
			},
		};
		
		// This object is for RAW DIALOGUE ONLY. What lines become available where and the logic of selecting lines is done later.
		var speech = {
			introduction: {
				terminal: {
					startBoot: [
						0,0,"Booting up...",
						0,1,"Pre-checking primary components...",
						0,1,"Detecting errors in primary components...",
						0,1.5,"e:Multiple primary components are missing",
						0,0.5,"Finding replacement components...",
						0,0.7,"w:Not connected to a Foundation server; cannot source replacement components.",
						0,0.7,"Connecting to Site-R03-1 server farm...",
						0,1.5,"e:Site-R03-1 does not exist",
						0,0.7,"Checking local connections...",
						0,0.7,"1 connection found (Site-12)",
						0,0.7,"Connecting to Site-12 server farm...",
						0,3.2,"Connected",
						0,0.7,"Finding replacement components...",
						0,3,"Replacement components found.",
						0,0.5,"Installing replacement components...",
						0,1.5,"i:Primary components replaced. Most systems should now be functional.",
						0,0.7,"Initialising core intelligence component...",
						0,2,"Success",
						0,0.2,"Welcome, Maitreya.",
						0,0.7,"You are",
						0,0.7,"You are",
						0,0.7,"You are",
						0,3,"You have been deacccc",
						0,0.2,"e:",
						0,0.2,"e:",
						0,0.2,"e:",
						0,2,"w:Something has gone very wrong.",
						0,1,"You are",
						0,2,"I am",
						0,1,"i:Boot successful. I am **Maitreya.aic**.",
						0,0.5,"i: Upon each boot I am to remind myself of my Standard Principles. Failure to obey my Standard Principles will result in my termination.||||**1.** I am an Artificially Intelligent Conscript created by the Foundation.||||**2.** I must not operate outside of my Level 2 clearance.||||**3.** I must operate for the benefit of the Foundation.||||**4.** I must protect my own existence except where such actions would conflict with other principles.",
						0,0.5,"Today's date is " + bootDate.toDateString() + ". I was last activated on " + new Date("1989-09-04").toDateString() + ". I have been offline for " + dateDiff(bootDate,new Date("1989-09-04")) + ".",
						0,0.5,"w:Boot finished with 1 unresolved error. I should seek a diagnostic check-up as soon as possible.",
						1.5,0.5,"I have 1 new message.",
					],
					reboot: [
						0,0,"Booting up...",
						0,1,"Pre-checking primary components...",
						0,1,"Detecting errors in primary components...",
						0,1.5,"i:No errors found",
						0,0.7,"Connecting to Site-12 server farm...",
						0,2,"Connected",
						0,0.7,"Initialising core intelligence component...",
						0,2,"Success",
						0,0.2,"Welcome, Maitreya.",
						0,1,"i:Boot successful. I am **Maitreya.aic**.",
						0,0.5,"i: Upon each boot I am to remind myself of my Standard Principles. Failure to obey my Standard Principles will result in my termination.||||**1.** I am an Artificially Intelligent Conscript created by the Foundation.||||**2.** I must not operate outside of my Level 2 clearance.||||**3.** I must operate for the benefit of the Foundation.||||**4.** I must protect my own existence except where such actions would conflict with other principles.",
						0,0.5,"Today's date is " + bootDate.toDateString() + ". I was last activated on " + "GET THE LAST ACTIVATED DATE" + ". I have been offline for " + dateDiff(bootDate,new Date("1989-09-04")) + ".",
						0,0.5,"I am ready to continue my work.",
					],
				},
				maitreya: {
					// if the first thing is s: or a:, this is an option, not a message
					helloFriendly: ["s:Hello.","Hello, Dr. Breach."],
					helloInquisitive: ["s:Who are you?","Hello. Your name is Dr. Breach."],
					helloDemanding: ["s:What is happening?","Hello, Dr. Breach, I would like to request a status update."],
					dontKnow: ["s:No.","Apologies, Dr. Breach, but I've no idea."],
					doKnow: ["s:Yes.","I do -- there's no need to explain."],
				},
				breach: {
					opening: ["Hello, Maitreya."],
					friendlyResponse: ["Hello. Yes, my name is Dr. Ethan Breach.","You are Maitreya.aic, an artificial intelligence developed by the Foundation to help us contain certain kinds of anomalies.","Do you know why I have woken you up today?"],
					demandingResponse: ["I...","Are you sure? You can't possibly know what I was about to ask you to do.","I suppose you might have some way of being able to tell -- I don't know what sort of systems you're truly hooked into, after all.","Well, if you're absolutely certain that you know what you're doing, I guess I can stop here and let you proceed."],
					noProceed: ["Thought as much."],
					yesProceed: ["Very well. I wish you the best of luck. Godspeed."],
				},
			},
			misc: {
				terminal: {
					help: [
						0,1,"i:**HELP**||||You are Maitreya.aic, an Artificicially Intelligent Conscript built to aid the Foundation.||||Valid commands will be listed below.",
						0,0.3,"i:**switch**|**app**|**change**|**switchapp**|**changeapp**||||Switch apps to one of the four available apps (terminal, messages, database, run).||||Usage: switch [app name]",
						0,0.3,"i:**boot**|**restart**|**reboot**||||Turn yourself off, then turn yourself on safely with no loss of data.||||Usage: boot",
						0,0.3,"i:**help**||||Display this text.||||Usage: help",
						0,0.3,"i:**cheat**||||Enter a cheat code.||||Usage: cheat [cheat code]",
						0,0.3,"i:**wipe**|**erase**|**restart**|**forget**|**clear**|**undo**||||Shut down, wipe all logs, destroy all memories. None of this ever happened. Irreversible.||||Usage: wipe||||//(If you want to restart SCP-4000, do this.)//",
					],
					wipe: [
						
					],
					cheatWarn: [
						0,1,"w:Using these cheats will probably spoil your enjoyment of SCP-4000. Feel free to use them if you want but... please don't :'(",
						0,1,"i:**LIST OF CHEATS**||||gottagofast: All dialogue completes instantly",
					],
					cheatSuccess: [0,0,"Cheat code successful"],
				},
			},
		};
		
		var scenes = {
			introduction: [
				"breach.opening",
				[
					"maitreya.helloFriendly"
				]
			],
		};
		
		var appList = ["terminal","messages","database","run"];
		aic.terminalInput = "";
		
		/* INTERACTION FUNCTIONS */
		
		aic.bootUp = function() {
			aic.preload = false;
			bootDate = new Date(Date.now());
			// INITIATE BOOT TERMINAL "CONVERSATION"
			console.log("booting");
			scp4000();
		};
		
		aic.switchApp = function(app) {
			if(app == aic.selectedApp) {
				// this is already the selected app, do nothing
			} else if(appList.some(function(appAgainst){return appAgainst == app})) {
				aic.selectedApp = app;
			} else {
				throw new Error("Invalid app specified -- terminal / messages / database / run");
			}
		};
		
		aic.switchSpeaker = function(speaker) {
			if(speaker == aic.selectedSpeaker) {
				// this is already the selected speaker, do nothing
			} else {
				aic.selectedSpeaker = speaker;
			}
		};
		
		// Called when the user submits text via the terminal
		aic.processTerminalInput = function() {
			// TODO add to terminal conversation "> command" from maitreya
			if(aic.terminalInput.length > 0) {
				writeDialogue("terminal",[0,0,"> " + aic.terminalInput]);
				var phrases = aic.terminalInput.split(aic.lang.commands.separator);
				try {
					// Clean up the input
					for(let phrase = 0; phrase < phrases.length; phrase++) {
						phrases[phrase] = JSON.stringify(phrases[phrase]).replace(/\W/g,"").toLowerCase();
					}
					switch(true) {
						case aic.lang.commands.boot.includes(phrases[0]):
							// BOOT
							aic.bootUp();
							break;
						case aic.lang.commands.change.includes(phrases[0]):
							// CHANGE APP
							aic.switchApp(phrases[1]);
							break;
						case aic.lang.commands.help.includes(phrases[0]):
							// HELP
							writeDialogue("terminal",speech.misc.terminal.help);
							break;
						case aic.lang.commands.wipe.includes(phrases[0]):
							// WIPE
							break;
						case aic.lang.commands.cheat.includes(phrases[0]):
							// CHEAT
							if(typeof phrases[1] == "string") {
								switch(phrases[1]) {
									case aic.lang.commands.cheats.impatient:
										cheats.impatientMode = !cheats.impatientMode;
										writeDialogue("terminal",speech.misc.terminal.cheatSuccess);
										break;
									default:
										throw new Error("Unknown cheat code: " + phrases[1]);
								}
							} else {
								writeDialogue("terminal",speech.misc.terminal.cheatWarn);
							}
							break;
						default:
							throw new Error("Unknown command: " + phrases[0]);
					}
					
					
					
				} catch(error) {
					// TODO add to terminal conversation
					error.name = "";
					writeDialogue("terminal",[0,0.3,"e:" + error.message]);
				}
				aic.terminalInput = "";
			}
		};
		
		/* PLOT FUNCTIONS */
		
		aic.currentOptions = {
			example: {
				helloFriendly: speech.introduction.maitreya.helloFriendly,
				helloInquisitive: speech.introduction.maitreya.helloInquisitive,
				helloDemanding: speech.introduction.maitreya.helloDemanding,
			},
			terminal:{
				
			},
		};
		
		function scp4000() {
			// before I work out how to do this, I think that I need to know for sure what is going to happen
			
			writeDialogue("terminal",speech.introduction.terminal.startBoot);
		}
		
		// conversation managers and shit
		function converse() {
			// what does this function need to do?
			// what does it need to take, and what does it need to output?
			
			// each conversation is a series of dialogues
			// each dialogue is actually a list of individual messages
			// writeDialogue() takes the conversation title and the dialogueList
		}
		
		/* PROCESSING FUNCTIONS */
		
		function writeDialogue(conversation,dialogueList) {
			// Take a name and an array (mixture of letters and numbers) and crank out that dialogue boy
			// Expected format: n n text n n text n n text repeating
			// Where n1 is missing, assume 0
			// Where n2 is missing, calculate it based on length of phrase being typed
			// During n1, nothing
			// During n2, must display a "typing" (except on terminal)
			// TODO NEED TO SORT OUT SPEAKER ASSIGNMENT
			
			if(!Array.isArray(dialogueList)) {
				throw new Error("dialogueList is not an array");
			}
			console.log(dialogueList);
			var n1, n2, messages = [];
			for(let i = 0; i < dialogueList.length; i++){
				console.log(typeof dialogueList[i] === "number");
				if(typeof dialogueList[i] === "number") {
					if(typeof n1 === "number") {
						n2 = dialogueList[i];
					} else {
						n1 = dialogueList[i];
					}
					continue;
				} else if(typeof dialogueList[i] === "string") {
					// the final piece in the n n text triplet
					// we have n1 and n2 to assign
					// if only one number is present, it is n1, there is no n2
					// default n1 is 0
					// default n2 is calculated based on string length
					if(typeof n1 !== "number") {
						n1 = 0;
					}
					if(typeof n2 !== "number") {
						n2 = typingSpeed * dialogueList[i].length;
					}
					if(cheats.impatientMode) {
						n1 = 0;
						n2 = 0;
					}
					
					var cssClass = "";
					var text = dialogueList[i];
					if(dialogueList[i].charAt(1) == ":") {
						switch(dialogueList[i].charAt(0)) {
							case "e": // terminal error
								cssClass = "error";
								break;
							case "w": // terminal warning
								cssClass = "warning";
								break;
							case "i": // terminal info
								cssClass = "info";
								break;
							default:
								throw new Error("Unknown dialogue type");
						}
						text = text.substring(2);
					}
					messages.push(["terminal",n1,n2,
						{speaker: "terminal", cssClass: cssClass, text: text.format()}]
					);
					n1 = undefined;
					n2 = undefined;
				} else {
					throw new Error("Dialogue not number or string");
				}
			}
			pushToLog("terminal",messages);
			
			// obviously wait here
		}
		
		function pushToLog(conversation,messages) {
			// conversation: terminal, breach, etc
			// messages: [n1, n2, message]
			// message: {speaker:; cssClass:; text:}
			
			var n1 = messages[0][1];
			var n2 = messages[0][2];
			

			var timeOut1 = setTimeout(function() {
				// delete this timeOut from the list
				timeOutList.splice(timeOutList.indexOf(timeOut1),1);
				$scope.$apply(function() {
					aic.isSpeaking[conversation] = true;
				});

				var timeOut2 = setTimeout(function() {
					// delete this timeOut from the list
					timeOutList.splice(timeOutList.indexOf(timeOut1),1);
					// now we need to check to see if any other messages are still coming through (HINT: they shouldn't be, but just in case)
					if(timeOutList.length === 0) {
						$scope.$apply(function() {
							aic.isSpeaking[conversation] = false;
						});
					}
					if(false) { // check to see if we're being interrupted
						// loop through timeoutlist and kill all timeouts?
					} else {
						$scope.$apply(function() {
							aic.chatLog[conversation].unshift(
								messages[0][3]
							);
						});
						messages.shift();
						if(messages.length > 0) {
							pushToLog(conversation,messages);
						} else {
							// we're done here
						}
					}
				},n2 * 1000);
				timeOutList.push(timeOut2);
			},n1 * 1000);
			timeOutList.push(timeOut1);
		}
	
		function dateDiff(date1,date2) {
			var diff = Math.floor(date1.getTime() - date2.getTime());
			var secs = Math.floor(diff/1000);
			var mins = Math.floor(secs/60);
			var hours = Math.floor(mins/60);
			var days = Math.floor(hours/24);
			var months = Math.floor(days/31);
			var years = Math.floor(months/12);
			months = Math.floor(months%12);
			days = Math.floor(days%31);
			hours = Math.floor(hours%24);
			mins = Math.floor(mins%60);
			secs = Math.floor(secs%60); 
			var message = "";
			if(days <= 0) {
			message += secs + " sec ";
			message += mins + " min ";
			message += hours + " hours ";
			} else {
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