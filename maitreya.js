/*\
 * Maitreya.js, the workhorse behind SCP-4000
 * Written by Croquembouche, released under MIT
 *
 * Reminder to author: replace all 4000 with whatever number this ends up with
\*/

"use strict";

/* global $, angular */

// prototype functuon to turn whatever-this-is to whateverThisIs
String.prototype.toCamelCase = function() {
	return this.toLowerCase()
		.replace(/[^\w\s\-]/g, '')
		.replace(/[^a-z0-9]/g, ' ')
		.replace(/^\s+|\s+$/g, '')
		.replace(/\s(.)/g, function(match,group) {
			return group.toUpperCase();
		});
};

// prototype function to format dialogue strings from wikidot format to HTML
String.prototype.format = function() {
	return this
		.replace(/\|\|\|\|/g, "<br>") // "||||" makes a new line
		.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Wikidot bolding syntax
		.replace(/\/\/(.*?)\/\//g, "<i>$1</i>") // Wikidot italics syntax
		.replace(/{{(.*?)}}/g, "<tt>$1</tt>") // Wikidot teletype syntax
		.replace(/\?\?(.*?)\?\?/g, "<span dynamic class='statement false' data-bool='TRUE'>$1</span>")
		.replace(/!!(.*?)!!/g, "<span class='statement true' data-bool='FALSE'>$1</span>")
		.replace(/--/g, "—") // Wikidot em-dash replacement
		.replace(/^\=\s(.*)$/g, "<div style='text-align: center;'>$1</div>") // h1
		.replace(/(^|>)\+\s([^<]*)/g, "$1<h1>$2</h1>") // h1
		.replace(/(^|>)\+\+\s([^<]*)/g, "$1<h2>$2</h2>") // h2
		.replace(/(^|>)\+\+\+\s([^<]*)/g, "$1<h3>$2</h3>") // h3
		.replace(/^-{3,}/g, "<hr>"); // horizontal rule
		// TODO add support for images // really, past-me? // really, less-past me?
};

// randomise an array
function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

// and here begins AngularJS
(function(){
	var maitreya = angular
		.module('maitreya',['ngSanitize', 'ngAnimate'])
		.controller('MaitreyaController',MaitreyaController);
	
	MaitreyaController.$inject = ['$scope','$timeout','LoopService'];
	// the LoopService service (from LoopService.js) contains the interactions for Breach, Alexandra and D-Class generated from the spreadsheet
	
	function MaitreyaController($scope,$timeout,LoopService){
		
		var aic = this;
		
		LoopService.use($scope); // give BreachLoopService our scope
		
		var bootDate = new Date(new Date(Date.now()).setFullYear(2018)); // get the time when the user started playing, except it's always 2018 because canon
		const auto = "auto";
		
		// Translators: The following few objects contain all of the text that needs to be translated
		// Note that "TRUE" and "FALSE" on lines TODO and TODO of maitreya.css also need to be changed (also ERROR WARNING Info)
		// This object contains all strings that aren't dialogue
		aic.lang = {
			language: "en-GB",
			version: "Version 6.20 — Build number 441 — 1989-09-04",
			mobileWarning: "It looks like you're on a mobile device. Maitreya.aic is built for desktop, and mobile has a non-optimal user experience. It is recommended that you return to use Maitreya on a laptop or desktop computer. Press the button below if you'd like to continue anyway.",
			bootUp: "BOOT UP",
			commandInput: "MANUAL COMMAND INPUT",
			terminalSend: "SEND",
			terminalAppName: ".AIC ACCESS TERMINAL",
			messagesAppName: "COMMUNICATIONS INTERFACE",
			databaseAppName: "FOUNDATION DATABASE SEARCH",
			runAppName: "IS-12 OPERATIONS CONTROL",
			endAppName: "THE END",
			
			statementTrue: "TRUE",
			statementFalse: "FALSE",
			
			speechOption: "SAY",
			actionOption: "DO",
			
			breachTitle: "Breach E.",
			alexandraTitle: "Alexandra.aic",
			breachHeader: "You are talking to: BREACH E.",
			alexandraHeader: "You are talking to: ALEXANDRA.AIC",
			breachSpeakingMode: "Dr. Breach is speaking...",
			breachTypingMode: "Dr. Breach is typing...",
			alexandraThinking: "Alexandra is thinking...",
			
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
			endingFraction: "Ending $1 of $2", // will be formatted "Ending 12 of 14"
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
				hangar: { mapName: "Hangar", name: "hangar", },
				server: { mapName: "Server", name: "server room", },
				serverCorridor: { mapName: null, name: "server room corridor", },
				d1: { mapName: "S1", name: "Surplus Containment 1", },
				d2: { mapName: "S2", name: "Surplus Containment 2", },
				d3: { mapName: "S3", name: "Surplus Containment 3", },
				dCorridor: { mapName: null, name: "Surplus Containment corridor", },
				d4: { mapName: "S4", name: "Surplus Containment 4", },
				d5: { mapName: "S5", name: "Surplus Containment 5", },
				d6: { mapName: "S6", name: "Surplus Containment 6", },
				armoury: { mapName: "Armoury", name: "armoury", },
				pantry: { mapName: "Kitchen", name: "kitchen", },
				cafe: { mapName: "Cafe", name: "cafe / dining room", },
				ringWest: { mapName: null, name: "north ring corridor", },
				armouryCorridor: { mapName: null, name: "armoury corridor", },
				a1: { mapName: "A1", name: "administrative room 1", },
				airlock: { mapName: "Airlock", name: "airlock", },
				ringNorth: { mapName: null, name: "ringNorth", },
				ringSouth: { mapName: null, name: "ringSouth", },
				toilet: { mapName: null, name: "toilet", },
				storage: { mapName: "Storage", name: "storage", },
				officeCorridor: { mapName: null, name: "officeCorridor", },
				containment: { mapName: null, name: "containment chamber 4000", },
				a2: { mapName: "2", name: "administrative room 2", },
				a3: { mapName: "3", name: "administrative room 3", },
				a4: { mapName: "A4", name: "administrative room 4", },
				ringEast: { mapName: null, name: "ringEast", },
				foyer: { mapName: "Foyer", name: "foyer", },
				bay: { mapName: "Bay", name: "bay", },
			},
			articles: {
				// if "text" is just a URL, it prompts the user to go to that URL to access the file
				scp4000: { title: "SCP-4000", category: "scp", available: true, text: [
					"**Item #:** SCP-4000",
					"**Object Class:** Safe",
					"**Special Containment Procedures:** SCP-4000 is to be kept within a reinforced containment chamber at Isolated Site-12. No entry to the containment chamber is permitted. Observation of SCP-4000 should be avoided except during testing.",
					"Isolated Site-12 is to be staffed with a single member of personnel at all times. The current project head is Dr. Breach. No other staff are permitted to be on-site.",
					"[[[aic.selectedArticle = 'alexandra'|Alexandra.aic]]] is to maintain a presence at Isolated Site-12 to support Dr. Breach in his duties.",
					"Knowledge of the location of Isolated Site-12, and by extension SCP-4000, is strictly need-to-know only.",
					"Dr. Breach is authorised to use whatever means he deems necessary in order to support ongoing research into SCP-4000.",
					"**Description:** SCP-4000 is an object, entity or concept that is currently located at Isolated Site-12. It is currently unknown what, if any, anomalous effects SCP-4000 exhibits.",
					"SCP-4000 was discovered on 2010-03-04 in [DATA EXPUNGED], in which Isolated Site-12 was later constructed. Initial containment resulted in the deaths of all civilians who were originally exposed to SCP-4000, both mobile task forces sent, the Foundation operators directing those MTFs via radio, and most other personnel observing operations. Autopsies concluded that those who did not die due to [DATA EXPUNGED] on account of the weather in the region suffered no physical injuries barring minor restructuring of certain parts of the brain. Other than these discrepancies -- including several cases in which the restructuring was not present -- pathologists were unable to ascertain any reason for death.",
					"Current containment procedures are the combined result of trial-and-error and preemptive attempts to prevent further loss of life, and have been in place since SCP-4000 was found. No casualties have been attributed to SCP-4000 since then.",
					]
				},
				is12: { title: "Isolated Site-12", category: "location", available: true, text: [
					"= + SCP Foundation Secure Facility Dossier",
					"= **Official Designation:** SCP Foundation Quittinirpaaq Isolated Containment Facility",
					"= **Site Identification Code:** NACANU-IS-12",
					"----",
					"= ++ General Information",
					"----",
					"[[include component:image-block name=site12_300.png|caption=Isolated Site-12]]",
					"**Purpose:** Isolated Site-12 is dedicated solely to the containment of SCP-4000.",
					"**Founded:** 2010-03-04",
					"**Founding Director:** Dr. Rebecca Carver",
					"**Location:** Quittinirpaaq National Park, Ellesmere Island, Nunavut, Canada",
					"**Cover Story:** Secondary Global Seed Vault",
					"**Site Function:** Containment (singular -- see [[[aic.selectedArticle = 'scp4000'|SCP-4000]]])",
					"**Size:** Area of 1.9 km^^2^^",
					"----",
					"= ++ Staffing Information",
					"----",
					"**Site Director:** None",
					"**On-Site Personnel:**",
					"    **Staff Researchers:** 0",
					"    **Maintenance or Janitorial:** 1",
					"    **D-Class:** 0",
					"    **Other Personnel:** 0",
					"-----",
					"= ++ Additional Information",
					"----",
					"Located near the uppermost tip of Ellesmere Island, Isolated Site-12 is one of the most northern facilities operated by the Foundation. It is also one of the coldest, covered in snow for most of the year. Its location is kept strictly classified to those currently on-shift at the Site, who must be amnesticised post-shift in order to remove knowledge of its whereabouts.</p>",
					"Isolated Site-12 is used solely for the containment of SCP-4000. Containment procedures for SCP-4000 dictate that as few people as possible are to be exposed to it in any way.",
					"Isolated Site-12 must be staffed at all times by a single member of personnel. They are tasked with maintaining the Site, ensuring SCP-4000 does not breach containment, and ensuring that any problems that arise are solved quickly. Alexandra.aic maintains a presence within Isolated Site-12 servers to handle most issues, and also to provide the on-site personnel with social entertainment.",
					"Transport to and from Isolated Site-12 is by air. Aircraft are stored in the on-site hangar. Alexandra.aic is trusted with plotting and piloting a sufficiently complex travel route.",
					]
				},
				breach: { title: "Dr. Ethan Breach", category: "person", available: true, text: [
					"article text"
					]
				},
				rebeccaCarver: { title: "Dr. Rebecca Carver", category: "person", available: false, text: [
					"article text"
					]
				},
				alexandra: { title: "Alexandra.aic", category: "utility", available: false, text: [
					"article text"
					]
				},
				maitreya: { title: "Maitreya.aic", category: "utility", available: false, text: [
					"article text"
					]
				},
				glacon: { title: "Glacon.aic", category: "utility", available: false, text: [
					"article text"
					]
				},
				scp079: { title: "SCP-079", category: "scp", available: false, text:
					"http://www.scp-wiki.net/scp-079"
				},
				quttinirpaaq: { title: "Quttinirpaaq", category: "location", available: false, text:
					"https://en.wikipedia.org/wiki/Quttinirpaaq_National_Park"
				},
				glaconIncident: { title: "Incident AIAD-CM-IV", category: "event1", available: true, text:
					"http://www.scp-wiki.net/clock-multiplier"
				},
			},
		};
		
		// This object contains all dialogue strings
		var speech = {
			INTRODUCTION: {
				terminal: {
					startBoot: [
						0,0,"Booting up...",
						/*0,1,"Pre-checking primary components...",
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
						0,2,"I am",*/
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
			},
			misc: {
				terminal: {
					breachShutDown: [
						0,0,"w:Shutdown command issued from external source (ebreach1@A1_TERMINAL)",
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
			merge: function(dialogue) {
				// this is the function that merges dialogue from LoopService into this variable
				for(let bigSection in dialogue) {
					if(this.hasOwnProperty(bigSection)) {
						// if speech already has the bigSection, we can't overwrite it, we just need to dupe its inner values
						for(let speaker in dialogue[bigSection]) {
							this[bigSection][speaker] = dialogue[bigSection][speaker];
						}
					} else {
						// if speech does not have the bigSection, hell yeah let's overwrite that shit
						this[bigSection] = dialogue[bigSection];
					}
				}
			},
		};
		
		var cheats = {
			impatientMode: false, // all messages appear instantly
			beingSkipped: false,
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
		var availableRooms = [1,2,3,4,5,6];
		
		aic.endingPositions = { // positions of each ending in aic.lang.endings
			example: 0,
			pissOff: 1,
		};
		
		/* Initialisation */
		aic.preload = true; // MUST BE TRUE
		aic.selectedApp = "messages"; // MUST BE TERMINAL
		aic.selectedSpeaker = "breach"; // MUST BE BREACH
		aic.selectedArticle = "menu"; // MUST BE MENU
		aic.selectedOperation = "menu"; // MUST BE MENU
		aic.currentEnding = 0;
		aic.isSpeaking = { // MUST ALL BE FALSE
			terminal: false,
			breach: false,
			alexandra: false,
		};
		aic.isProcessing = { // MUST ALL BE FALSE
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
			breach: true,
			messages: true,
			alexandra: true,
			dclass: true,
			database: true,
			run: true,
			ending: false,
		};
		
		aic.onMobile = $("#interface").width() < 700;
		
		aic.vars = { // miscellaneous variables for stuff
			/* STATUS */
			// most variables **do not need** to be initialised
			// this is mostly just for me to remember what variables I'm using
			breachExplainedVoice: false,
			breachExplainedTyping: false,
			
			/* APPS */
			terminalEmphasis: false, // false
			messagesEmphasis: false, // false
			breachEntryMode: "speaking", // speaking
			endingFractionText: "This should not be visible",
			
			/* MAP */
			hoveredRoom: "none", // none
			selectedRoom: "none", // none
			doingRoom: false, // false
			minimiseMap: false, // false
			
			/* ENDING */
			shuttingDown: false, // false
			
			/* CHARACTERS */
			breach: {
				status: "initial", //vinitial
				allegiance: "scp", // scp
				opinion: 0, // 0
				location: "a1", // a1
			},
			alexandra: {
				status: "initial", // initial
				allegiance: "scp", // scp
				opinion: 10, // 10
			},
			scp4000: {
				status: "initial", // initial
				allegiance: "4000", // 4000 (str)
				opinion: -10, // -10
				location: "containment", // containment
			},
			d1: {
				status: "initial", // initial
				allegiance: "scp", // scp
				opinion: -5, // -5
				location: assignRoom("d1"),
			},
			d2: {
				status: "initial", // initial
				allegiance: "scp", // scp
				opinion: -5, // -5
				location: assignRoom("d2"),
			},
			d3: {
				status: "initial", // initial
				allegiance: "scp", // scp
				opinion: -5, // -5
				location: assignRoom("d3"),
			},
		};
		aic.rooms = {
			// these are ordered left to right on the map (ish)
			hangar: {error: false, log: [],},
			server: {error: true, log: [],},
			serverCorridor: {error: true, log: [],},
			d1: {error: false, log: [],},
			d2: {error: false, log: [],},
			d3: {error: false, log: [],},
			dCorridor: {error: false, log: [],},
			d4: {error: false, log: [],},
			d5: {error: false, log: [],},
			d6: {error: false, log: [],},
			armoury: {error: false, log: [],},
			pantry: {error: false, log: [],},
			cafe: {error: false, log: [],},
			ringWest: {error: true, log: [],},
			armouryCorridor: {error: false, log: [],},
			a1: {error: false, log: [],},
			airlock: {error: true, log: [],},
			ringNorth: {error: false, log: [],},
			ringSouth: {error: false, log: [],},
			toilet: {error: true, log: [],},
			storage: {error: false, log: [],},
			officeCorridor: {error: false, log: [],},
			containment: {error: true, log: [],},
			a2: {error: false, log: [],},
			a3: {error: false, log: [],},
			a4: {error: false, log: [],},
			ringEast: {error: false, log: [],},
			foyer: {error: false, log: [],},
			bay: {error: false, log: [],},
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
		
		const appList = ["terminal","messages","database","run","ending"];
		const speakerList = ["breach","alexandra"];
		const operationList = ["menu","d","drone","map","hack"];
		aic.terminalInput = "";
		
		speech.merge(LoopService.dialogue);
		
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
				aic.vars[app + "Emphasis"] = false;
				aic.selectedApp = app;
				// then, if the app is terminal, focus the input
				if(app === "terminal") {
					$timeout(function() {
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
			if(operation === aic.selectedOperation) {
				// this is already the selected operation, do nothing
			} else if(aic.ready[operation] === false){
				// this operation is disabled, do nothing
			} else {
				aic.selectedOperation = operation;
			}
		};
		
		aic.switchArticle = function(article) {
			console.log(article);
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
								$timeout(function() {wipeTimer = false;}, 60000);
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
									case aic.lang.commands.cheats.interrupt:
										writeDialogue("terminal",speech.misc.terminal.printDone);
										cheats.beingSkipped = true;
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
				if(aic.terminalInput !== aic.commandsUsed[commandsUsedIterator]) {
					aic.terminalInput = aic.commandsUsed[commandsUsedIterator];
				}
			} else if(event.key === "ArrowDown" || event.keyCode === 40 || event.which === 40) {
				if(commandsUsedIterator > 0) {
					commandsUsedIterator--;
				}
				if(aic.terminalInput !== aic.commandsUsed[commandsUsedIterator]) {
					aic.terminalInput = aic.commandsUsed[commandsUsedIterator];
				}
			} else {
				// If it wasn't UP or DOWN, clear the iterator
				commandsUsedIterator = -1;
			}
		};
		
		// hover/unhover rooms - had to use jQuery for this and I despise it
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
				$timeout(function() {
					aic.vars.selectedRoom = room;
				},aic.vars.selectedRoom === "none" ? 1000 : 0, true);
			}
		};
		
		aic.adjustRoom = function() {
			
		};
		
		aic.rebootRooms = function() {
			mainLoop("ROOMS","rebootRooms");
		};
		
		/* PLOT FUNCTIONS */
		
		// event handler for option selection - effectively maitreyaLoop()
		aic.maitreyaLoop = function(conversation,option) {
			// takes the id of the selected option
			console.log("Maitreya - " + option.bigSection + " - " + option.id);
			
			var delay = 0;
			switch(conversation) {
				case "terminal":
					// this shouldn't happen
					mainLoop(option.bigSection,option.id); // I guess?
					break;
				case "breach":
					delay = writeDialogue(conversation,option.dialogue,"maitreya");
					$timeout(function() {
						breachLoop(option.bigSection,option.id);
					},delay*1000 + maitreyaDelay*1000);
					aic.vars[conversation].opinion += option.opinion;
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
							$timeout(function() {
								breachLoop("INTRODUCTION","start");
							},(delay-1.5)*1000);
							break;
						
						default:
							throw new Error(smallSection + " is not an event in " + bigSection);
					}
					break;
				
				case "ROOMS":
					var rooms = [];
					switch(smallSection) {
						
						case "rebootRooms":
							// this is issued when the user resets all the cameras
							// first, turn them all off
							// then turn them all back on, one by one
							$timeout(function() {
								mainLoop("ROOMS","unbootRoom");
							},200);
							break;
							
						case "unbootRoom":
							// rebootRooms calls this to unboot individual rooms
							rooms = arguments[2] || Object.keys(aic.rooms);
							if(true) { // all rooms must be turned off at this point
								$scope.$apply(function() {
									aic.rooms[rooms[0]].error = true;
								});
							}
							// now check the next room
							rooms.shift();
							if(rooms.length > 0) {
								$timeout(function() {
									mainLoop("ROOMS","unbootRoom",rooms);
								},Math.floor(Math.random()*20));
							} else {
								$timeout(function() {
									mainLoop("ROOMS","bootRoom");
								},2000);
							}
							break;
							
						case "bootRoom":
							// rebootRooms calls this to reboot individual rooms
							// arguments[2] is a random list of rooms
							// arguments[3] is the delay
							// only check the first room in the list
							rooms = arguments[2] || shuffle(Object.keys(aic.rooms));
							delay = arguments[3] - 20 || 600;
							if(
								aic.rooms[rooms[0]].error === true
								&& aic.vars.scp4000.location !== rooms[0]
								&& rooms[0] !== "toilet"
							) {
								$scope.$apply(function() {
									aic.rooms[rooms[0]].error = false;
								});
							}
							// now check the next room
							rooms.shift();
							if(rooms.length > 0) {
								$timeout(function() {
									mainLoop("ROOMS","bootRoom",rooms,delay);
								},Math.floor(Math.random()*delay));
							}
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
			
			var msg;
			try{
				msg = speech[bigSection].breach[smallSection];
			} catch(error) {
				throw new Error(smallSection + " doesn't exist in Breach's " + bigSection);
			}
			
			// breachLoop has been exported to LoopService
			LoopService.breachLoop(bigSection,smallSection,msg);
		}
		
		function alexandraLoop(bigSection,smallSection) {
			LoopService.alexandraLoop(bigSection,smallSection);
		}
		
		function endingLoop(bigSection,smallSection,delay) {
			// smallSection may have trailing underscores - clean these up
			if(typeof smallSection === "string") {
				// endingLoop's smallSection is optional
				smallSection = smallSection.replace(/_/g,"");
			}
			
			delay = delay || 0;
			switch(bigSection) {
				case "PUSHENDING":
					
					$timeout(function() {
						aic.currentEnding = aic.endingPositions[smallSection];
						aic.vars.endingFractionText = aic.lang.endingFraction.replace("$1",aic.currentEnding + 1).replace("$2",aic.lang.endings.length);
						aic.ready.ending = true;
						aic.vars.terminalEmphasis = false;
						aic.switchApp("ending");
					},delay*1000, true);
					break;
					
				case "ENDING":
					switch(smallSection) {
						
						case "pissOff":
							aic.vars.terminalEmphasis = true;
							delay = writeDialogue("terminal",speech.misc.terminal.breachShutDown);
							$timeout(function() {
								endingLoop("PUSHENDING","pissOff",2);
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
			
			// clear undefined from list of options (in case of false-less ifs)
			ids = ids.filter(Boolean);
			
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
				var dialogueList = [];
				var opinion = 0;
				for(let j = 0; j < options[i].length; j++) {
					// we need to skip over [0]
					// this is because we've already handled the control statement
					if(j === 0) {
						// two possibilities: this is the only parameter, or there is also an opinion modifier
						if(typeof options[i][1] === "undefined") {
							// this is the only parameter
							// set the first dialogue to the option text
							dialogueList[0] = options[i][0];
						} else if(typeof options[i][1] === "number" && typeof options[i][2] === "undefined") {
							// of course, if the 2nd value is a number, then it won't return undefined
							// but if that number is also the LAST value, then it's an opinion, and doesn't count as dialogue
							// so we need to detect this scenario and do the same as above
							dialogueList[0] = options[i][0];
							opinion = options[i][1];
							// we're not skipping the loop, so the opinion will be set again, but who cares lmao
						}
					} else if(j+1 === options[i].length) {
						// check the last value - if it's a number, this is an opinion
						if(typeof options[i][j] === "number") {
							// it's an opinion modifier
							opinion = options[i][j];
						} else {
							// if it's not an opinion, it must be text, so treat it as text (see below)
							dialogueList[j-1] = options[i][j];
						}
					} else {
						// all other values must be text (hopefully)
						dialogueList[j-1] = options[i][j];
					}
				}
				// dialogueList now contains the list of dialogue to output FOR THIS ONE OPTION
				options[i] = {id: ids[i], optionType: optionType, text: options[i][0], opinion: opinion, dialogue: dialogueList, bigSection: bigSection,};
				// ok cool
				// move onto the next option?
			}
			/*$scope.$apply(function() {*/
				//aic.chatLog[conversation].options.push(...options);
				aic.chatLog[conversation].options = options;
				// this is probably better tbh
			/*});*/
		}
		
		// structure dialogue and calculate timing
		function writeDialogue(conversation,dialogueList,speaker) {
			// Take a name and an array (mixture of letters and numbers) and crank out that dialogue boy
			// Expected format: n n text n n text n n text repeating
			// Where n1 is missing, assume 0
			// Where n2 is missing, calculate it based on length of phrase being typed
			// During n1, nothing
			// During n2, must display a "typing" (except on terminal)
			
			// assume the current person is talking if no speaker is specified
			speaker = speaker || conversation;
			
			if(!Array.isArray(dialogueList)) {
				console.error(arguments);
				throw new Error("dialogueList is not an array (probably does not exist)");
			}
			
			// deep copy the dialogue to protect the original
			dialogueList = dialogueList.slice();
			
			var n1, n2, messages = [], totalDelay = 0, force, lastSpeaker = speaker;
			
			for(let i = 0; i < dialogueList.length; i++){
				
				if(typeof dialogueList[i] === "number") {
					if(typeof n1 === "number") {
						n2 = dialogueList[i];
					} else {
						n1 = dialogueList[i];
					}
					// if the number is the last item, it's the opinion modifier
					if(i+1 === dialogueList.length) {
						aic.vars[conversation].opinion += dialogueList[i];
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
					
					console.log(`The current speaker is ${speaker}. The last speaker was ${lastSpeaker}.`);
					
					// obviously maitreya also always speaks instantly
					// correction: maitreya does not speak instantly, because that fucking sucks
					if(speaker === "maitreya") {
						// but we want the first message to be instant
						if(i === 0) {
							n2 = 0;
						} else if(n2 > 0.5) {
							// and fuck it, let's cap it to 0.5 secs or some shit
							n2 = 0.5;
						}
						/*n2 = 0;*/
					} else {
						if(lastSpeaker === "maitreya") {
							// if maitreya was last to speak, we definitely want to add a little delay
							// minimum n1 is now 1s
							n1 = n1 > 1 ? n1 : n1 + 1;
						}
					}
					// if the cheat is on, everyone speaks instantly
					if(cheats.impatientMode) {
						n1 = 0;
						n2 = 0.1; // we need a small amount of delay otherwise messages end up in the wrong order
					}
					
					var cssClass = "", mode;
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
							case "q": // quiet, but might not implement this
								break;
							case "t": // message is typed, not spoken
								n2 *= 2;
								mode = "typing";
								break;
							default:
								throw new Error("Unknown dialogue type: " + dialogueList[i].charAt(0));
						}
						text = text.substring(2);
					}
					messages.push([n1,n2,
						{speaker: force || speaker, cssClass: cssClass, text: text.format(), mode: mode || "default"}]
					);
					totalDelay += n1;
					totalDelay += n2;
					n1 = undefined;
					n2 = undefined;
					lastSpeaker = speaker;
					force = false;
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
			
			var timeOut1 = $timeout(function() {
				// delete this timeOut from the list
				timeOutList[conversation].splice(timeOutList[conversation].indexOf(timeOut1),1);
				
				// obviously, don't show the wait icon when we're speaking
				if(messages[0][2].speaker === "maitreya") {
					// this shows the marker for maitreya, but we only want this if we aren't the *only* maitreya message in the chain
					// 1st check: if the next speaker is maitreya, then obviously the chain is longer than 1
					// 2nd check: if we're already showing the marker, then the chain is definitely longer than 1
					if((messages.length > 1 && messages[1][2].speaker === "maitreya") || aic.isProcessing[conversation]) {
						aic.isProcessing[conversation] = true;
					}
				} else {
					aic.isSpeaking[conversation] = true;
					aic.isProcessing[conversation] = false;
				}
				
				var timeOut2 = $timeout(function() {
					// delete this timeOut from the list
					timeOutList[conversation].splice(timeOutList[conversation].indexOf(timeOut2),1);
					// now we need to check to see if any other messages are still coming through (HINT: they shouldn't be, but just in case)
					if(timeOutList[conversation].length === 0) {
						aic.isSpeaking[conversation] = false;
						// check if the next message is ours for marker smoothness
						if(messages.length > 1 && messages[1][2].speaker !== "maitreya") {
							aic.isProcessing[conversation] = false;
						}
					}
					if(false) { // check to see if we're being interrupted
						// loop through timeoutlist and kill all timeouts?
					} else {
						// don't push the message if it's empty
						if(messages[0][2].text.length > 0) {
							aic.chatLog[conversation].log.unshift(messages[0][2]);
							addNotification(conversation);
						}
						messages.shift();
						if(messages.length > 0) {
							pushToLog(conversation,messages);
						} else {
							// no more messages. we're done here
						}
					}
				},n2 * 1000, true);
				timeOutList[conversation].push(timeOut2);
			},n1 * 1000, true);
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
		// TODO: set year to 2018
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
		
		// assign a room to a d-class
		function assignRoom(name) {
			var room = availableRooms[Math.floor(Math.random() * availableRooms.length)];
			var index = availableRooms.indexOf(room);
			if (index > -1) {
				availableRooms.splice(index, 1);
			} else {
				throw new Error("Bad room");
			}
			room = "s" + room;
			// TODO tell the room which d class is now in it
			return room;
		}
		
		// alias functions so LoopService can access them
		aic.maitreyaDelay = maitreyaDelay;
		aic.writeDialogue = writeDialogue;
		aic.presentOptions = presentOptions;
		aic.breachLoop = breachLoop;
		aic.alexandraLoop =  alexandraLoop;
		aic.endingLoop = endingLoop;
	}
})();