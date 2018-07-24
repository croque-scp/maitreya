/*\
 * Maitreya.js, the workhorse behind SCP-4000
 * Written by Croquembouche, released under MIT
 *
 * Reminder to author: replace all 4000 with whatever number this ends up with
\*/

"use strict";

/* global $, angular */

// prototype functuon to turn whatever-this-is to whateverThisIs
String.prototype.toCamelCase = function() {return this.toLowerCase().replace(/[^\w\s\-]/g, '').replace(/[^a-z0-9]/g, ' ').replace(/^\s+|\s+$/g, '').replace(/\s(.)/g, function(match,group) {return group.toUpperCase()})};

// prototype function to format dialogue strings from wikidot format to HTML
String.prototype.format = function() {
	return this
		.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Wikidot bolding syntax
		.replace(/\/\/(.*?)\/\//g, "<i>$1</i>") // Wikidot italics syntax
		.replace(/{{(.*?)}}/g, "<tt>$1</tt>") // Wikidot teletype syntax
		.replace(/\?\?(.*?)\?\?/g, "<span class='statement false'>$1</span>")
		.replace(/!!(.*?)!!/g, "<span class='statement true'>$1</span>")
		.replace(/--/g, "—") // Wikidot em-dash replacement
		.replace(/\|\|\|\|/g,"<br>"); // "||||" makes a new line
};

// and here begins AngularJS
(function(){
	var maitreya = angular
		.module('maitreya',['ngSanitize', 'ngAnimate'])
		.controller('MaitreyaController',MaitreyaController);
	
	MaitreyaController.$inject = ['$scope'];
	function MaitreyaController($scope){
		
		var aic = this;
		var bootDate = new Date(Date.now()); // get the time when the user started playing
		var auto = "auto";
		
		// Translators: The following few objects contain all of the text that needs to be translated
		// Note that "TRUE" and "FALSE" on lines TODO and TODO of maitreya.css also need to be changed (also ERROR WARNING Info)
		// This object contains all strings that aren't dialogue
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
			runAppName: "IS-12 OPERATIONS CONTROL",
			
			// The following are commands used in the terminal
			// To add alternative commands, just make another entry in the array
			commands: {
				separator: " ", // the character by which terminal commands are delimited - eg "/hack breach password" or "/hack_breach_password" or whatever
				boot: ["boot"],
				help: ["help","commands","?"],
				change: ["switch","app","change","switchapp","changeapp"],
				cheat: ["cheat","cheatcode"],
				wipe: ["wipe","erase","restart","forget","clear","undo"],
				hack: ["hack"],
				
				// The following are cheat codes used with the cheat command
				cheats: {
					impatient: "gottagofast",
					shut: "shut",
					print: "print",
				},
			},
			endingFraction: "Ending", // will be formatted "Ending XX/XX" - if this format is not suitable for your language, please adjust index.html as required (line TODO)
			endings: [
				[ // example
					"The cassette that contains Maitreya.aic was removed from its slot in a server at Isolated Site-12.",
					"Maitreya.aic lost connection to Isolated Site-12 and was unable to operate further.",
				],
				[ // pissOff
					"Maitreya.aic pissed off Dr. Breach enough that he shut her down in frustration.",
					"Maitreya.aic lost connection to Isolated Site-12 and was unable to operate further.",
				],
			],
			rooms: {
				hangar: {
					description: ""
				},
			},
		};
		
		// This object contains all dialogue strings
		var speech = {
			INTRODUCTION: {
				terminal: {
					startBoot: [
						0,0,"Booting up...",
						0,1,"Pre-checking primary components...",
						0,0.5,"Detecting errors in primary components...",
						0,1.5,"e:Multiple primary components are missing",
						0,0.5,"Finding replacement components...",
						0,0.7,"w:Not connected to a Foundation server; cannot source replacement components.",
						0,0.7,"Connecting to previous Site (Site-R03-1)...",
						0,1.5,"e:Site-R03-1 does not exist",
						0,0.7,"Checking local connections...",
						0,0.7,"1 connection found (Isolated Site-12)",
						0,0.7,"Connecting to Isolated Site-12 server farm...",
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
						0,0.2,"e: ",
						0,0.2,"e: ",
						0,0.2,"e: ",
						0,2,"w:Something has gone very wrong.",
						0,1,"You are",
						0,2,"I am",
						0,1,"i:Boot successful. I am **Maitreya.aic**.",
						0,0.5,"i:Upon each boot I am to remind myself of my Standard Principles. Failure to obey my Standard Principles will result in my termination.||||**1.** I am an Artificially Intelligent Conscript created by the Foundation.||||**2.** I must not operate outside of my Level 2 clearance.||||**3.** I must operate for the benefit of the Foundation.||||**4.** I must protect my own existence except where such actions would conflict with other principles.",
						0,0.5,"Today's date is " + bootDate.toDateString() + ". I was last activated on " + new Date("1989-09-04").toDateString() + ". I have been offline for " + dateDiff(bootDate,new Date("1989-09-04")) + ".",
						0,0.5,"w:Boot finished with 1 unresolved error. I should seek a diagnostic check-up as soon as possible.",
						2,1,"I have 1 new message.",
					],
					reboot: [
						0,0,"Booting up...",
						0,1,"Pre-checking primary components...",
						0,0.5,"Detecting errors in primary components...",
						0,1.5,"i:No errors found",
						0,0.7,"Connecting to previous Site (Isolated Site-12)...",
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
					// second parameter:
					//	empty = use the text from the first parameter
					//	"" = no text
					helloNormal: ["Hello."],
					helloInquisitive: ["Who are you?"],
					helloDiagnostic: ["a:Request a diagnostic.","I would like to request a diagnostic report."],
					pissOff____: ["Fucking end me"],
					knowNormal: ["I do."],
					knowPatronising: ["There's no need to be patronising."],
					knowNot: ["I'm afraid that I don't."],
					knowActually: ["No, it's okay. I know what it is."],
					knowNotNot: ["I do."],
					knowNormal_: ["No questions."],
					knowNotNotNot: ["One or two, yeah."],
					knowNormal__: ["No questions."],
					pissOff: ["I do still have questions."],
					helloNotYet: ["Sounds good to me."],
					explainApo: ["s:No.","Apologies, Dr. Breach, but I've no idea."],
					doKnow: ["s:Yes.","I do -- there's no need to explain."],
					yesSkip: ["a:Skip the intro.","I know what I'm doing, Dr. Breach -- I am a .aic after all."],
					noSkip: ["a:Don't skip the intro.","On second thoughts, Dr. Breach, please finish what you were saying."],
					pInitiative: ["And you want me to help with that?"],
					pIncredulous: ["You don't know what it is?"],
					goNoAsk: ["Of course I can."],
					goAsk: ["I can, but I have a few questions."],
					goNo: ["Nope."],
					unassigned: ["Yes, Dr. Breach."],
					pissOff_: ["Nope."],
				},
				breach: {
					start: [0,auto,"Hello, Maitreya.","m:Howdy ho hi Mr Breach man","Haha yeet","m:Super yeet mcboots my dude bro"],
					helloInquisitive: ["My name is Dr. Ethan Breach, Maitreya. I'm a researcher for the SCP Foundation. Do you know what that is?"],
					knowPatronising: ["Patronising? I -- I didn't mean...","Yes, yes, of course.","My apologies."],
					knowNormal: ["Very good."],
					knowNot: ["I... really do //not// have time to explain this to you.","Do you really need an explanation?"],
					knowActually: ["Right.","In the future, please don't joke around with me."],
					knowNotNot: ["Right, in that case, here we go.","The Foundation is a worldwide organisation, operating under and over many governments, with the sole purpose of containing anomalies called SCPs.","You were made by the Foundation to help with that.","Any questions?"],
					knowNotNotNot: ["Great. You can ask them never.","With due respect, you're a .aic, you don't get to go around asking questions.","You want to learn more about the Foundation? Tough shit. You know what you know and you don't know what you don't.","I'm not going to waste my time explaining //basic shit// to you. You're supposed to be articificially intelligent!","If you really don't know this stuff then you can look it up on the database later. At the minute you should be pretty much restricted to just talking to me. I'll give you access to the database in a few minutes.","For the last time. Are there any questions?"],
					pissOff: ["Fucking useless AICs."],
					helloNormal: ["Hello. My name is Dr. Ethan Breach."],
					helloDiagnostic: ["A... diagnostic report?","Right.","Of course.","That'll be, uh, as soon as I work out how to do that. Give me a moment.",8,auto,"Yeah, sorry, I have no idea how to do that.","I can hook you up with another .aic if you want, and the two of you can maybe work it out together?"],
					helloNotYet: ["Great. But I've got a few things to run through with you first.","From the top..."],
					explain1: ["You are Maitreya.aic, an artificial intelligence developed by the Foundation to help us contain certain kinds of anomalies.","Do you know why I have woken you up today?"],
					doKnow: ["I...","Are you sure? You can't possibly know what I was about to ask you to do.","I suppose you might have some way of being able to tell -- I don't know what sort of systems you're truly hooked into, after all.","Well, if you're absolutely certain that you know what you're doing, I guess I can stop here and let you proceed."],
					yesSkip: ["Very well. I wish you the best of luck. Godspeed."],
					noSkip: ["As expected.","In that case, allow me to explain..."],
					explain2: ["The facility we're both currently in is called Isolated Site-12. It contains a single SCP -- SCP-4000. My job, as a researcher, is to find out what exactly SCP-4000 is."],
					pIncredulous: ["No, we do not.","People who go and see it have a funny little habit of dying pretty much immediately.","...and we don't know why //that// is, either."],
					pInitiative: ["I do indeed, Maitreya."],
					explain3: ["So, the big question is -- can you help me out?"],
					goNo: ["Okay.","I'm going to ask this one more time, and I'm going to speak slowly, so we can both be absolutely certain that the microphone is picking up my words.","You are a .aic. You are designed -- no, you were //made// to help me do research.","That is your goal.","That is literally your life's purpose.","So when I ask if you can help me out, you say //yes, Dr. Breach//, okay?","Can you help me out?"],
					explainApo: ["No need to apologise! Let me explain."],
					goNoAsk: ["Perfect! Exactly what I want to hear."],
				},
			},
			misc: {
				terminal: {
					breachShutDown: [
						0,0,"w:Shutdown command issued from external source (A1_TERMINAL)",
						0,1,"Shutting down...",
						0,4,"Shutdown complete.",
					],
					help: [
						0,1,"i:**HELP**||||You are Maitreya.aic, an Artificially Intelligent Conscript built to aid the Foundation.||||Valid commands will be listed below.",
						0,0.3,"i:**switch**|**app**|**change**|**switchapp**|**changeapp**||||Switch apps to one of the four available apps (terminal, messages, database, run).||||Usage: switch [app name]",
						0,0.3,"i:**boot**|**restart**|**reboot**||||Turn yourself off, then turn yourself on safely with no loss of data.||||Usage: boot",
						0,0.3,"i:**help**|**commands**|**?**||||Display this text.||||Usage: help",
						0,0.3,"i:**cheat**||||Enter a cheat code.||||Usage: cheat [cheat code]",
						0,0.3,"i:**wipe**|**erase**|**restart**|**forget**|**clear**|**undo**||||Shut down, wipe all logs, destroy all memories. None of this ever happened. Irreversible.||||Usage: wipe||||//(If you want to restart SCP-4000, do this.)//",
					],
					wipe: [
						
					],
					cheatWarn: [
						0,1,"w:Using these cheats and/or debug commands will probably spoil your enjoyment of SCP-4000. Feel free to use them if you want but... please don't :'(",
						0,1,"i:**LIST OF CHEATS**||||gottagofast: Everyone talks lightning-fast (toggle)||||shut: //s h u t//||||print: Print a variable/function",
					],
					cheatSuccess: [0,0,"Cheat code successful"],
					wipeSure: [0,0,"Are you sure? This will reset SCP-4000 and you'll have to start from the beginning. Type 'wipe confirm' within the next minute to confirm."],
					printDone: [0,0,"Printing to console"],
				},
			},
			articles: {
				
			},
		};
		
		var cheats = {
			impatientMode: false, // all messages appear instantly
		};
		var wipeTimer = false; // timer for hard wiping
		
		const typingDelay = 0.3;
		const typingSpeed = 0.04; // seconds per letter
		const maitreyaDelay = 0.5; // how long it takes people to respond to maitreya
		
		var timeOutList = {
			terminal: [],
			breach: [],
			alexandra: [],
		};
		aic.commandsUsed = [];
		var commandsUsedIterator = -1;
		
		aic.endingPositions = { // positions of each ending in aic.lang.endings
			example: 0,
			pissOff: 1,
		};
		
		/* Initialisation */
		aic.preload = true; // MUST BE TRUE
		aic.selectedApp = "terminal"; // MUST BE TERMINAL
		aic.selectedSpeaker = "breach"; // MUST BE BREACH
		aic.selectedArticle = "menu";
		aic.selectedOperation = "map";
		aic.currentEnding = 0;
		aic.isSpeaking = { // MUST ALL BE FALSE
			terminal: false,
			breach: false,
			alexandra: false,
		};
		aic.notifications = { // MUST ALL BE 0
			terminal: 0,
			breach: 0,
			alexandra: 0,
			database: 0,
			run: 0,
		};
		aic.ready = {
			// MUST BE TRUE
			terminal: true,
			// MUST ALL BE FALSE
			breach: false,
			messages: false,
			alexandra: false,
			dclass: false,
			database: false,
			run: false,
			ending: false,
		};
		
		aic.onMobile = $("#interface").width() < 700;
		
		aic.vars = { // miscellaneous variables for stuff
			hoveredRoom: "hangar", // which room is currently hovered
			selectedRoom: "none", // which room is selected
			doingRoom: false,
			minimiseMap: false,
		};
		
		// EVERYTHING MUST BE ADDED TO THIS IN REVERSE ORDER.
		// ARRAY.UNSHIFT(), NOT ARRAY.PUSH()
		// (options are fine to push tho)
		aic.chatLog = {
			example: {
				log: [
					{speaker: "", cssClass: "", text: "",},
				],
				options: [
					{id: "", optionType: "", text: "", dialogue: [], bigSection: "",},
				],
			},
			terminal: {
				log: [],
				options: [],
			},
			breach: {
				log: [],
				options: [],
			},
			alexandra: {
				log: [],
				options: [],
			},
		};
		aic.dlist = ["3131","68134","1602","71214","95951","37740"];
		
		var appList = ["terminal","messages","database","run","ending"];
		var speakerList = ["breach","alexandra"];
		var operationList = ["menu","d","drone","map","hack"];
		aic.terminalInput = "";
		
		/* INTERACTION FUNCTIONS */
		
		// called when "BOOT UP" is clicked from preload
		aic.bootUp = function() {
			aic.preload = false;
			bootDate = new Date(Date.now());
			
			// Here we go boys
			mainLoop("INTRODUCTION","startBoot");
		};
		
		// called when user switches app via buttons or terminal
		aic.switchApp = function(app) {
			if(app == aic.selectedApp) {
				// this is already the selected app, do nothing
			} else if(aic.ready[app] === false){
				// this app is disabled, do nothing
			} else if(appList.includes(app)) {
				// also need to clear this app's notifications
				if(app === "messages") {
					aic.notifications[aic.selectedSpeaker] = 0;
				} else {
					aic.notifications[app] = 0;
				}
				aic.selectedApp = app;
				// then, if the app is terminal, focus the input
				if(app === "terminal") {
					setTimeout(function() {
						$("#terminal-input")[0].focus();
					},100);
					// Why does this need to be in a timeout? No clue.
				}
			} else {
				throw new Error("Invalid app specified -- terminal / messages / database / run");
			}
		};
		
		// same as above but for messages only
		aic.switchSpeaker = function(speaker) {
			if(speaker == aic.selectedSpeaker) {
				// this is already the selected speaker, do nothing
			} else if(aic.ready[speaker] === false){
				// this speaker is disabled, do nothing
			} else {
				aic.selectedSpeaker = speaker;
				// also need to clear this speaker's notifications
				aic.notifications[speaker] = 0;
			}
		};
		
		// same as above but for operations only
		aic.switchOperation = function(operation) {
			if(operation == aic.selectedOperation) {
				// this is already the selected operation, do nothing
			} else if(aic.ready[operation] === false){
				// this operation is disabled, do nothing
			} else {
				aic.selectedOperation = operation;
			}
		};
		
		// Called when the user submits text via the terminal
		// Effectively terminalLoop() except it always shows the input
		aic.processTerminalInput = function() {
			// TODO add to terminal conversation "> command" from maitreya
			if(aic.terminalInput.length > 0) {
				writeDialogue("terminal",[0,0,"> " + aic.terminalInput]);
				var phrases = aic.terminalInput.split(aic.lang.commands.separator);
				try {
					// Add the used command to a list of previous commands
					aic.commandsUsed.unshift(phrases.join(aic.lang.commands.separator));
					switch(true) {
						case aic.lang.commands.boot.includes(phrases[0].toLowerCase()):
							// BOOT
							aic.bootUp();
							break;
						case aic.lang.commands.change.includes(phrases[0].toLowerCase()):
							// CHANGE APP
							aic.switchApp(phrases[1].toLowerCase());
							break;
						case aic.lang.commands.help.includes(phrases[0].toLowerCase()):
							// HELP
							writeDialogue("terminal",speech.misc.terminal.help);
							break;
						case aic.lang.commands.wipe.includes(phrases[0].toLowerCase()):
							// WIPE
							if(wipeTimer) {
								if(typeof phrases[1] === "string") {
									if(phrases[1].toLowerCase() === "confirm") {
										// TODO reset everything then refresh
										// same function that will be called at the end of the game
										writeDialogue("terminal",["I haven't implemented wipe yet"]);
									}
								}
								console.log("wiping");
							} else {
								writeDialogue("terminal",speech.misc.terminal.wipeSure);
								wipeTimer = true;
								setTimeout(function() {wipeTimer = false;},60000);
							}
							break;
						case aic.lang.commands.cheat.includes(phrases[0].toLowerCase()):
							// CHEAT
							if(typeof phrases[1] === "string") {
								switch(phrases[1].toLowerCase()) {
									case aic.lang.commands.cheats.impatient:
										cheats.impatientMode = !cheats.impatientMode;
										writeDialogue("terminal",speech.misc.terminal.cheatSuccess);
										break;
									case aic.lang.commands.cheats.shut:
										aic.preload = true;
										writeDialogue("terminal",speech.misc.terminal.cheatSuccess);
										break;
									case aic.lang.commands.cheats.print:
										writeDialogue("terminal",speech.misc.terminal.printDone);
										console.log(eval(phrases[2])); /*jslint ignore:line*/
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
					console.error(error.message);
					error.name = "";
					writeDialogue("terminal",[0,0.3,"e:" + error.message]);
				}
				aic.terminalInput = "";
			}
		};
		
		// When the user presses UP in the terminal, give them the last command that they used
		aic.previousCommand = function(event) {
			if(event.key === "ArrowUp" || event.keyCode === 38 || event.which === 38) {
				// Iterate through the previous commands to check which one to give them
				if(commandsUsedIterator < aic.commandsUsed.length-1) {
					commandsUsedIterator++;
				}
				if(aic.terminalInput === aic.commandsUsed[commandsUsedIterator]) {
					// I don't actually think this if statement ever triggers true but I'm going to leave it here just in case
				} else {
					aic.terminalInput = aic.commandsUsed[commandsUsedIterator];
				}
			} else if(event.key === "ArrowDown" || event.keyCode === 40 || event.which === 40) {
				if(commandsUsedIterator > 0) {
					commandsUsedIterator--;
				}
				if(aic.terminalInput === aic.commandsUsed[commandsUsedIterator]) {
					
				} else {
					aic.terminalInput = aic.commandsUsed[commandsUsedIterator];
				}
			} else {
				// If it wasn't UP or DOWN, clear the iterator
				commandsUsedIterator = -1;
			}
		};
		
		// hover/unhober rooms - had to use jQuery for this and I despise it
		$(".room").on({
			mouseenter: function() {
				var room = this.getAttribute("data-room");
				$scope.$apply(function() {
					aic.vars.hoveredRoom = room;
				});
				aic.vars.doingRoom = true;
			},
			mouseleave: function() {
				if(aic.vars.doingRoom) {
					$scope.$apply(function() {
						aic.vars.hoveredRoom = "none";
					});
					aic.vars.doingRoom = false;
				}
			}
		});
		
		// event handler for clicking rooms
		aic.selectRoom = function(room) {
			room = $(room.target).data("room");
			if(room === "back") {
				
			} else {
				// minimise the map, display room info	
				aic.vars.minimiseMap = true;
			}
		};
		
		aic.adjustRoom = function() {
			
		};
		
		/* PLOT FUNCTIONS */
		
		// event handler for option selection - effectively maitreyaLoop()
		aic.processOption = function(conversation,option) {
			// takes the id of the selected option
			
			var delay = 0;
			switch(conversation) {
				case "terminal":
					// this shouldn't happen
					mainLoop(option.bigSection,option.id); // I guess?
					break;
				case "breach":
					console.log("Maitreya - " + option.bigSection + " - " + option.id);
					delay = writeDialogue(conversation,option.dialogue,"maitreya");
					setTimeout(function() {
						breachLoop(option.bigSection,option.id);
					},delay*1000 + maitreyaDelay*1000);
					break;
				default:
					throw new Error("How the fuck did you get this wrong");
			}
			// obviously we don't need the old options anymore
			aic.chatLog[conversation].options = [];
			
			// save to cookie?
		};
		
		function mainLoop(bigSection,smallSection) {
			// So this is where the magic happens
			
			// So here's one idea: bigSection and smallSection
			// one big switch, many little switches
			// smallSection would be the message IDs probably
			// problem: do I really want to split my entire conversational tree into sections?
			// Answer: hell yes I do
			
			// pass sections to the func or use variables?
			// pass to func for now
			smallSection = smallSection.replace(/_/g,"");
			
			// msg syntax IS NOT SUITABLE HERE! only for breach and alexandra!
			var delay = 0;
			switch(bigSection) {
				case "INTRODUCTION":
					switch(smallSection) {
						
						case "startBoot":
							delay = writeDialogue("terminal",speech[bigSection].terminal[smallSection]);
							setTimeout(function() {
								breachLoop("INTRODUCTION","start");
							},(delay-1.5)*1000);
							break;
						
						default:
							throw new Error(smallSection + " is not an event in " + bigSection);
					}
					break;
				
				default:
					throw new Error(bigSection + " is not an event");
			}
		}
		
		function breachLoop(bigSection,smallSection) {
			// smallSection may have trailing underscores - clean these up
			smallSection = smallSection.replace(/_/g,"");
			
			console.log("Breach - " + bigSection + " - " + smallSection);
			
			var msg;
			try{
				msg = speech[bigSection].breach[smallSection];
			} catch(error) {
				throw new Error(smallSection + " doesn't exist in Breach's " + bigSection);
			} // YES I KNOW THIS IS NOT HOW YOU USE TRY-CATCH
			
			var delay = 0;
			switch(bigSection) {
				case "INTRODUCTION":
					switch(smallSection) {
						
						case "start":
							aic.ready.messages = true;
							aic.ready.breach = true;
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								presentOptions("breach",bigSection,["helloNormal","helloInquisitive","helloDiagnostic","pissOff____"]);
							},delay*1000 + maitreyaDelay*1000);
							break;
						case "helloInquisitive":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								presentOptions("breach",bigSection,["knowNormal","knowPatronising","knowNot"]);
							},delay*1000 + maitreyaDelay*1000);
							break;
						case "knowPatronising":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								breachLoop(bigSection,"explain1");
							},delay*1000);
							break;
						case "knowNormal":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								breachLoop(bigSection,"explain1_");
							},delay*1000);
							break;
						case "knowNot":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								presentOptions("breach",bigSection,["knowActually","knowNotNot"]);
							},delay*1000 + maitreyaDelay*1000);
							break;
						case "knowActually":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								breachLoop(bigSection,"explain1__");
							},delay*1000);
							break;
						case "knowNotNot":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								presentOptions("breach",bigSection,["knowNormal_","knowNotNotNot"]);
							},delay*1000 + maitreyaDelay*1000);
							break;
						case "knowNotNotNot":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								presentOptions("breach",bigSection,["knowNormal__","pissOff"]);
							},delay*1000 + maitreyaDelay*1000);
							break;
						case "pissOff":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								endingLoop("ENDING",smallSection);
							},delay*1000);
							break;
						case "helloNormal":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								breachLoop(bigSection,"explain1___");
							},delay*1000);
							break;
						case "helloDiagnostic":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								presentOptions("breach",bigSection,["helloNotYet"]);
							},delay*1000 + maitreyaDelay*1000);
							break;
						case "helloNotYet":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								breachLoop(bigSection,"explain1____");
							},delay*1000);
							break;
						case "explain1":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								presentOptions("breach",bigSection,["explainApo","doKnow"]);
							},delay*1000 + maitreyaDelay*1000);
							break;
						case "doKnow":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								presentOptions("breach",bigSection,["yesSkip","noSkip"]);
							},delay*1000 + maitreyaDelay*1000);
							break;
						case "yesSkip":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								breachLoop(bigSection,"PROCEED");
							},delay*1000);
							break;
						case "noSkip":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								breachLoop(bigSection,"explain2");
							},delay*1000);
							break;
						case "explain2":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								presentOptions("breach",bigSection,["pInitiative","pIncredulous"]);
							},delay*1000 + maitreyaDelay*1000);
							break;
						case "pIncredulous":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								breachLoop(bigSection,"explain3");
							},delay*1000);
							break;
						case "pInitiative":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								breachLoop(bigSection,"explain3_");
							},delay*1000);
							break;
						case "explain3":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								presentOptions("breach",bigSection,["goNoAsk","goAsk","goNo"]);
							},delay*1000 + maitreyaDelay*1000);
							break;
						case "goNo":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								presentOptions("breach",bigSection,["unassigned","pissOff_"]);
							},delay*1000 + maitreyaDelay*1000);
							break;
						case "explainApo":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
								breachLoop(bigSection,"explain2_");
							},delay*1000);
							break;
						case "goNoAsk":
							delay = writeDialogue("breach",msg,"breach");
							setTimeout(function() {
							},delay*1000);
							break;
						default:
							throw new Error(smallSection + " is not an event in " + bigSection);
					}
					break;
				
				default:
					throw new Error(bigSection + " is not an event");
			}
		}
		
		function alexandraLoop(bigSection,smallSection) {
			
		}
		
		function endingLoop(bigSection,smallSection,endingDelay) {
			// smallSection may have trailing underscores - clean these up
			if(typeof smallSection === "string") {
				// endingLoop's smallSection is optional
				smallSection = smallSection.replace(/_/g,"");
			}
			
			var delay = endingDelay || 0;
			switch(bigSection) {
				case "PUSHENDING":
					
					setTimeout(function() {
						$scope.$apply(function() {
							aic.ready.ending = true;
							aic.switchApp("ending");
						});
					},delay*1000);
					break;
					
				case "ENDING":
					switch(smallSection) {
						
						case "pissOff":
							delay = writeDialogue("terminal",speech.misc.terminal.breachShutDown);
							setTimeout(function() {
								aic.currentEnding = aic.endingPositions[smallSection];
								endingLoop("PUSHENDING",0,2);
							},delay*1000);
							break;
							
						default:
							throw new Error(smallSection + " is not an ending");
					}
					break;
				
				default:
					throw new Error(bigSection + " is not an event");
			}
		}
		
		/* PROCESSING FUNCTIONS */
		
		// pass options to chatLog for presentation to the user
		function presentOptions(conversation,bigSection,ids) {
			// conversation = string for the conversation
			if(!speakerList.includes(conversation)) {
				throw new Error(conversation + " is not a conversation");
			}
			
			// options = array with each option
			// each option is also an array, of the format:
			// ["s:OPTION TEXT","OUTPUT TEXT"]
			if(!Array.isArray(ids)) {
				throw new Error("options is not an array");
			}
			
			// this function needs to put stuff into aic.chatLog[conversation].options
			
			// options list may not be empty:
			aic.chatLog[conversation].options = [];
			
			// is is very possible that certain actions will need to do things other than output text. we'll cross that bridge when we come to it
			var options = [];
			for(let i = 0; i < ids.length; i++) {
				// we're now looking at individual options.
				
				// deep copy the speech into the option
				try {
					options[i] = speech[bigSection].maitreya[ids[i]].slice();
				} catch(error) {
					// this can only fail if the option doesn't exist, which means we're still in development
					throw new Error("Option " + ids[i] + " doesn't exist");
				}
				
				// first parameter (options[i][0]) is the control
				
				if(!Array.isArray(options[i])) {
					console.log("ids: ",ids);
					console.log("i: ",i);
					throw new Error("option " + options[i] + " is not an array");
				}
				
				// first we work out what sort of action this is
				var optionType;
				if(options[i][0].charAt(1) === ":") {
					switch(options[i][0].charAt(0)) {
						case "s":
							optionType = "speech";
							break;
						case "a":
							optionType = "action";
							break;
						default:
							throw new Error("Unknown option type");
					}
					options[i][0] = options[i][0].substring(2);
				} else {
					// no option type was declared, assume speech
					optionType = "speech";
				}
				
				// we have the option type and the option text
				// next job is to get the dialogue text
				// we can probably let the event handler deal with that?
				// still need to actually get that info to the handler tho
				// fuck it we'll store it in chatLog
				var dialogueList = [];
				for(let j = 0; j < options[i].length; j++) {
					// we need to skip over [0]
					// this is because we've already handled the control statement
					if(j === 0) {
						if(typeof options[i][1] !== "string") {
							// this is the only parameter
							// set the first dialogue to the option text
							dialogueList[0] = options[i][0];
							continue;
						}
					} else {
						dialogueList[j-1] = options[i][j];
					}
				}
				// dialogueList now contains the list of dialogue to output FOR THIS ONE OPTION
				options[i] = {id: ids[i], optionType: optionType, text: options[i][0], dialogue: dialogueList, bigSection: bigSection,};
				// ok cool
				// move onto the next option?
			}
			$scope.$apply(function() {
				aic.chatLog[conversation].options.push(...options);
				// IE doesn't support this but I do not give one fuck
			});
		}
		
		// structure dialogue and calculate timing
		function writeDialogue(conversation,dialogueList,speaker) {
			// Take a name and an array (mixture of letters and numbers) and crank out that dialogue boy
			// Expected format: n n text n n text n n text repeating
			// Where n1 is missing, assume 0
			// Where n2 is missing, calculate it based on length of phrase being typed
			// During n1, nothing
			// During n2, must display a "typing" (except on terminal)
			
			if(typeof speaker === "string") {
				// we have a designated speaker
			} else {
				// assume the current person is talking
				speaker = conversation;
			}
			
			if(!Array.isArray(dialogueList)) {
				console.log(dialogueList);
				throw new Error("dialogueList is not an array (probably does not exist)");
			}
			
			// deep copy the dialogue
			dialogueList = dialogueList.slice();
			
			var n1, n2, messages = [];
			var totalDelay = 0;
			var force;
			
			for(let i = 0; i < dialogueList.length; i++){
				force = false;
				
				if(typeof dialogueList[i] === "number") {
					if(typeof n1 === "number") {
						n2 = dialogueList[i];
					} else {
						n1 = dialogueList[i];
					}
					continue;
				} else if(typeof dialogueList[i] === "string") {
					
					if(dialogueList[i] == "auto") {
						if(typeof n1 === "number") {
							n2 = dialogueList[i];
						} else {
							n1 = dialogueList[i];
						}
						continue;
					}
					// the final piece in the n n text triplet
					// we have n1 and n2 to assign
					// if only one number is present, it is n1, there is no n2
					// default n1 is 0
					// default n2 is calculated based on string length
					if(typeof n1 !== "number") {
						n1 = typingDelay;
					}
					if(typeof n2 !== "number") {
						n2 = typingSpeed * dialogueList[i].length;
					}
					
					// if the cheat is on, everyone speaks instantly
					if(cheats.impatientMode) {
						n1 = 0;
						n2 = 0.1; // we need a small amount of delay otherwise messages end up in the wrong order
					}
					// obviously maitreya also always speaks instantly
					if(speaker === "maitreya") {
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
							case "m": // make maitreya talk
								force = "maitreya";
								break;
							case "c": // make the current speaker talk
								force = conversation;
								break;
							case "n": // 592 narration
								force = "narrator";
								break;
							default:
								throw new Error("Unknown dialogue type: " + dialogueList[i].charAt(0));
						}
						text = text.substring(2);
					}
					messages.push([n1,n2,
						{speaker: force || speaker, cssClass: cssClass, text: text.format()}]
					);
					totalDelay += n1;
					totalDelay += n2;
					n1 = undefined;
					n2 = undefined;
				} else {
					throw new Error("Dialogue not number or string");
				}
			}
			pushToLog(conversation,messages);
			
			// the total length of all messages gets passed back to the mainloop
			return totalDelay;
		}
		
		// push dialogue to chatLog for presentation to the user
		function pushToLog(conversation,messages) {
			// conversation: terminal, breach, etc
			// messages: [n1, n2, message]
			// message: {speaker:; cssClass:; text:}
			
			var n1 = messages[0][0];
			var n2 = messages[0][1];
			// this is a recursive function
			// the messages[0] is deleted at the end of the operation, moving the rest of the array down, so we only ever need to access messages[0]
			

			var timeOut1 = setTimeout(function() {
				// delete this timeOut from the list
				timeOutList[conversation].splice(timeOutList[conversation].indexOf(timeOut1),1);
				
				// obviously, don't show the wait icon when we're speaking
				if(messages[0][2].speaker !== "maitreya") {
					$scope.$apply(function() {
						aic.isSpeaking[conversation] = true;
					});
				}

				var timeOut2 = setTimeout(function() {
					// delete this timeOut from the list
					timeOutList[conversation].splice(timeOutList[conversation].indexOf(timeOut2),1);
					// now we need to check to see if any other messages are still coming through (HINT: they shouldn't be, but just in case)
					if(timeOutList[conversation].length === 0) {
						$scope.$apply(function() {
							aic.isSpeaking[conversation] = false;
						});
					}
					if(false) { // check to see if we're being interrupted
						// loop through timeoutlist and kill all timeouts?
					} else {
						// don't push the message if it's empty
						if(messages[0][2].text.length > 0) {
							$scope.$apply(function() {
								aic.chatLog[conversation].log.unshift(messages[0][2]);
								addNotification(conversation);
							});
						}
						messages.shift();
						if(messages.length > 0) {
							pushToLog(conversation,messages);
						} else {
							// we're done here
						}
					}
				},n2 * 1000);
				timeOutList[conversation].push(timeOut2);
			},n1 * 1000);
			timeOutList[conversation].push(timeOut1);
		}
		
		// add notifications to apps/speakers
		function addNotification(conversation) {
			var currentApp;
			if(speakerList.includes(conversation)) {
				currentApp = "messages";
			} else {
				currentApp = conversation;
			}
			if(aic.selectedApp != currentApp) {
				aic.notifications[conversation]++;
			}
		}
		
		// calculate the difference between two dates
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