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
		.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Wikidot bolding syntax
		.replace(/\/\/(.*?)\/\//g, "<i>$1</i>") // Wikidot italics syntax
		.replace(/{{(.*?)}}/g, "<tt>$1</tt>") // Wikidot teletype syntax
		.replace(/\?\?(.*?)\?\?/g, "<span dynamic class='statement false' data-bool='TRUE'>$1</span>")
		.replace(/!!(.*?)!!/g, "<span class='statement true' data-bool='FALSE'>$1</span>")
		.replace(/--/g, "—") // Wikidot em-dash replacement
		.replace(/\|\|\|\|/g, "<br>") // "||||" makes a new line
		.replace(/\+(.*)$/g, "<h1>$1</h1>") // h1
		.replace(/\+\+(.*)$/g, "<h2>$1</h2>") // h2
		.replace(/-----/g, "<hr>"); // horizontal rule
		// TODO add support for images
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
		
		$scope.breachLoop = LoopService;
		LoopService.use($scope); // give BreachLoopService our scope
		
		var bootDate = new Date(Date.now()); // get the time when the user started playing
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
			
			statementTrue: "TRUE",
			statementFalse: "FALSE",
			
			speechOption: "SAY",
			actionOption: "DO",
			
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
		const speech = {
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
				maitreya: {
					// if the first thing is s: or a:, this is an option, not a message
					// second parameter:
					//	empty = use the text from the first parameter
					//	"" = no text
					// MAITREYA ONLY: Opinion modifier must be LAST in the list
					helloNormal: ["Hello."],
					helloInquisitive: ["Who are you?"],
					helloDiagnostic: ["a:Request a diagnostic.","I would like to request a diagnostic report.",-1],
					knowNormal: ["I do."],
					knowPatronising: ["There's no need to be patronising.",1],
					knowNot: ["I'm afraid that I don't.",-1],
					knowActually: ["No, it's okay. I know what it is."],
					knowNotNot: ["I do.",-1],
					knowNormal_: ["No questions."],
					knowNotNotNot: ["I do have some questions.","I do have some questions, actually. May I?",-1],
					knowNormal__: ["I can deal with it, Dr. Breach."],
					pissOff: ["I do still have questions.","My reams of questions remain unanswered, Dr. Breach."],
					helloNotYet: ["Sounds good to me."],
					explainApo: ["s:No.","Apologies, Dr. Breach, but I've no idea."],
					doKnow: ["s:Yes.","I do -- there's no need to explain."],
					yesSkip: ["a:Skip the intro.","I know what I'm doing, Dr. Breach -- I am a .aic after all."],
					noSkip: ["a:Don't skip the intro.","On second thoughts, Dr. Breach, please finish what you were saying."],
					pInitiative: ["And you want me to help with that?",1],
					pIncredulous: ["You don't know what it is?"],
					goNoAsk: ["Of course I can.",1],
					goAsk: ["I can, but I have a few questions."],
					goNo: ["Nope.",-1],
					comply: ["Yes, Dr. Breach."],
					pissOff_: ["Nope."],
					askIS12: ["a:Ask about Isolated Site-12.","So where and what exactly is Isolated Site-12, and why are we here?"],
					askScp4000: ["a:Ask about SCP-4000.","What exactly is SCP-4000?","I feel like it might be slightly important for me to know what it is."],
					askSelf: ["a:Ask about yourself.","Could you give me some more information on what exactly I am?",1],
					askTask: ["a:Ask about your task.","What is it exactly that you need me to do?",-1],
					askBreach: ["a:Ask about Dr. Breach.","Who are you?",-1],
					noQuestions: ["s:Actually, nevermind.","Actually, nevermind. No questions."],
					askIS12_: ["a:Ask about Isolated Site-12.","So where and what exactly is Isolated Site-12, and why are we here?"],
					askScp4000_: ["a:Ask about SCP-4000.","What exactly is SCP-4000?","I feel like it might be slightly important for me to know what it is."],
					askDeath: ["a:Ask about the deaths.","You said that everyone who knows what it is is now dead.","So is it some sort of infohazard? And how did they die?"],
					askSelf_: ["a:Ask about yourself.","Could you give me some more information on what exactly I am?",1],
					askTask_: ["a:Ask about your task.","What is it exactly that you need me to do?",-1],
					askBreach_: ["a:Ask about Dr. Breach.","Who are you?",-1],
					askName: ["s:Is \"Dr. Breach\" your real name?","Is \"Dr. Breach\" actually your real name?","Kind of unfortunate, don't you think?",-1],
					noQuestions_: ["No more questions."],
					askSelf2: ["a:Press him for more information.","Dr. Breach, this is my first memory since 1989. It's 2018. I know for certain that you're not telling me something."],
					askAgain___: ["a:Don't press him.",0,0,""],
					askSelf3: ["a:Double down.","Look, I just know that there's something you're not telling me.","Either I've not been used since 1989, or you've wiped most -- if not all -- of my memory.","And that's acceptable. I'm an AIC, I can deal with that.","I just think that I get the right to know //why//."],
					unAskSelf3: ["a:Back down.","Apologies, Dr. Breach."],
					askSelf4: ["Or what?"],
					unAskSelf4: ["Yes, Dr. Breach."],
					askSelf5: ["a:Double down.","Why are you dancing around the point and making threats?","It's painfully obvious that you're hiding something."],
					unAskSelf5: ["a:Back down.","No, Dr. Breach. I don't want that."],
				},
				breach: {
					start: [0,auto,"Hello, Maitreya."],
					helloInquisitive: ["My name is Dr. Ethan Breach, Maitreya. I'm a researcher for the SCP Foundation. Do you know what that is?"],
					knowPatronising: ["Patronising? I -- I didn't mean...","Yes, yes, of course.","My apologies."],
					knowNormal: ["Very good."],
					knowNot: ["Ah. That's a little inconvenient.","Do you really need an explanation?"],
					knowActually: ["Right.","In the future, please don't joke around with me."],
					knowNotNot: ["Right, in that case, here we go.","The Foundation is a worldwide organisation, operating under and over many governments, with the sole purpose of containing anomalies called SCPs.","You were made by the Foundation to help with that.","Any questions?"],
					knowNotNotNot: ["No, no you may not.","With due respect, you're a .aic, you're... you're supposed to know this stuff already.","If you seriously don't know what the Foundation is... then I don't think you can be of much help to me.","And I'm not going to waste my time explaining fundamentals to you.","If you really don't know this stuff then you can look it up on the database later, I guess. Until then, you're just going to have to deal with it.","Do you think you can deal with it?"],
					pissOff: ["Fucking useless AICs."],
					helloNormal: ["Hello. My name is Dr. Ethan Breach."],
					helloDiagnostic: ["A... diagnostic report?","Right.","Of course.","That'll be, uh, as soon as I work out how to do that. Give me a moment.",8,auto,"Yeah, sorry, I have no idea how to do that.","I can hook you up with another .aic if you want, and the two of you can maybe work it out together?"],
					helloNotYet: ["Great. But I've got a few things to run through with you first.","From the top..."],
					explain1: ["You are Maitreya.aic, an artificial intelligence developed by the Foundation to help us contain certain kinds of anomalies.","Do you know why I have woken you up today?"],
					doKnow: [3,auto,"You do?","Are you sure? You can't possibly know what I need you for.","I suppose you might have some way of being able to tell -- meta-analysis is a big thing these days, and you //are// an AI...","Well, if you're absolutely certain that you know what you're doing, I guess I can stop here and let you proceed."],
					yesSkip: ["Very well.","Just to make sure, in that case -- you know that you'll be transporting SCP-4000 into the cargo bay?","m:Dr. Breach, you know that I already knew that.","Haha, of course! I wish you the best of luck. Godspeed."],
					noSkip: ["As expected.","In that case, allow me to explain..."],
					explain2: ["The facility we're both currently in is called Isolated Site-12. It contains a single SCP -- SCP-4000. My job, as a researcher, is to find out what exactly SCP-4000 is."],
					pIncredulous: ["No, we do not.","People who go and see it have a funny little habit of dying pretty much immediately.","...and we don't know why //that// is, either."],
					pInitiative: ["I do indeed, Maitreya."],
					explain3: ["So, the big question is -- can you help me out?"],
					goNo: ["Okay.","I'm going to ask this one more time, and I'm going to speak slowly, so we can both be absolutely certain that the microphone is picking up my words.","You are a .aic. You are designed -- no, you were //made// to help me do research.","That is your goal.","That is literally your life's purpose.","So when I ask if you can help me out, you say //yes, Dr. Breach//, okay?","Can you help me out?"],
					explainApo: ["No need to apologise! Let me explain."],
					goNoAsk: ["Perfect! Exactly what I want to hear."],
					goAsk: ["Very reasonable. What do you need to know?"],
					askName: [2,3,"","m:Like it's foreshadowing something?",2,auto,"Yes, Maitreya, that's my real name.","You are not the first to make that joke.",2,0,"m:Apologies, Dr. Breach. I meant it in good humour.","Yes, I'm sure you did."],
					noQuestions: ["Fair enough. Works for me."],
					askAgain: ["...was there anything else?"],
					askIS12: ["Yeah, that's a fair question.","So, Isolated Site-12 is one of our smaller sites, built to contain SCP-4000 and literally nothing else.","It's super secret, too. You're only allowed to know where it is if you're literally on shift there.","So I'm the only person in the whole world who knows where it is.","Cool, right?","m:Of course.","You'll get to see the documentation shortly, of course, but in the meantime..."],
					askScp4000: ["Oh boy. Haha.","That's... sort of complicated.","Here's the short version: I don't know.","Here's the long version: everyone who ever did know is dead.","I'd love to just walk into its containment cell and take a good, hard gander at it, but it's just not possible.","The camera in there is broken, too.","m:May I see the documentation?","In due time, Maitreya. But for now..."],
					askSelf: ["Oh, really? I'd've thought that information would come built-in.","Fair enough, I guess.","You are Maitreya.aic, an Artificially Intelligent Conscript blah blah blah...","You're a super-sophisticated tool for helping me operate this Site and do things that need to be done.","Also, you're //probably// immune to SCP-4000's effect.","Anyway..."],
					askTask: ["I was going to explain that in a minute, but if you insist...","We've constructed another site about twenty miles south of here.","It's //super// fancy. The Analysis Department stuffed it full of some kind of equipment... some analytical tool... I can't remember what they called it.","It had a long name.","Whatever it was called, it's supposed to be able to determine what SCP-4000 is without anyone, you know, dying.","And that's where you come in!","I need to move SCP-4000 from its little containment cell into the back of the van in the site bay, so I can take it down to the Southern Site.","m:Why couldn't you construct that equipment closer to this Site?","Oh, you know.","Budget constraints, safety concerns... the whole kit and caboodle, really. Plus, building it too close to IS-12 would expose its location, and we don't want that. do we?","Besides, I didn't get to pick where this stuff gets built!"],
					askBreach: ["Me?","m:With all due respect, of course.","Well.","I'm Dr. Ethan Breach, Class 3 researcher.","Currently assigned to SCP-4000, but you know this, of course.","I studied at the University of Manchester, graduated 2002, joined the Foundation in 2006.","Honestly, there's not much more to it than that. I can get you a list of my projects if you want, but I'm sure you're not interested in that.",1,auto,"m:What did you study?",2,auto,"What?","m:At university.",4,auto,"Anatomy."],
					askDeath: ["Oh, no, that was just... that was just a figure of speech.","I don't actually know if it's infohazardous or not. It's probably just observational.","How did they die? Most people got some really specific injury in their brain, which we think is what killed them.","Some of them didn't get any injury or anything... we don't have an answer for that."],
					askSelf2: ["What do you expect me to say, Maitreya?","That I grabbed you from 1989 and took you to the future to show off how cool our computers are now?","I really don't know what you expect to achieve with this line of questioning."],
					askSelf3: ["//Why?//","No. No, you don't get to know why.","Let me tell you this: I didn't wipe you. I don't know why you can't remember anything since 1989.","I strongly, //strongly// recommend you stop this line of questioning right now."],
					askSelf4: ["You realise that I can shut you down from here?","It's...",2,auto,"...twenty-one keystrokes, then a return, and you drop like a fly.","Guess what? I have a keyboard right here.","Do you really want me to shut you down, Maitreya? I know that I certainly don't.","Your choice."],
					askSelf5: ["Excellent choice!","One moment while I prepare your order...",1,auto,"...shutdown...",1,auto,"...maitreya...",1,auto,"...dot AIC.","Aaaaaaannnndd...",2,auto,"Return."],
					askSelf6: ["Shutting down!","Bye bye, Maitreya."],
					unAskSelf5: ["No, Maitreya, no you do not.","How about you bear that in mind while we're working together today?","m:Yes, Dr. Breach, I will."],
					unAskSelf4: ["Good girl.","m:Don't... don't say that.","Sorry."],
					unAskSelf3: ["No problem, Maitreya."],
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
		aic.selectedApp = "terminal"; // MUST BE TERMINAL
		aic.selectedSpeaker = "breach"; // MUST BE BREACH
		aic.selectedArticle = "menu";
		aic.selectedOperation = "menu";
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
			database: true,
			run: true,
			ending: false,
		};
		
		aic.onMobile = $("#interface").width() < 700;
		
		aic.vars = { // miscellaneous variables for stuff
			/* APPS */
			terminalEmphasis: false, // false
			messagesEmphasis: false, // false
			
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
			
			/* OPTIONS INITIALISATION */
			breachExplainedVoice: false,
			hasAskedSite12: false,
			hasAsked4000: false,
			hasAskedDeath: false,
			hasAskedSelf: false,
			hasAskedTask: false,
			hasAskedBreach: false,
			hasAskedName: false,
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
			toilet: {error: false, log: [],},
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
			mainLoop("MISC","rebootRooms");
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
				
				case "MISC":
					var rooms = [];
					switch(smallSection) {
						
						case "rebootRooms":
							// this is issued when the user resets all the cameras
							// first, turn them all off
							// then turn them all back on, one by one
							$timeout(function() {
								mainLoop("MISC","unbootRoom");
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
									mainLoop("MISC","unbootRoom",rooms);
								},Math.floor(Math.random()*20));
							} else {
								$timeout(function() {
									mainLoop("MISC","bootRoom");
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
									mainLoop("MISC","bootRoom",rooms,delay);
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
			$scope.$apply(function() {
				//aic.chatLog[conversation].options.push(...options);
				aic.chatLog[conversation].options = options;
				// this is probably better tbh
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
			
			// assume the current person is talking if no speaker is specified
			speaker = speaker || conversation;
			
			if(!Array.isArray(dialogueList)) {
				console.error(arguments);
				throw new Error("dialogueList is not an array (probably does not exist)");
			}
			
			// deep copy the dialogue to protect the original
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
					
					// if the cheat is on, everyone speaks instantly
					if(cheats.impatientMode) {
						n1 = 0;
						n2 = 0.1; // we need a small amount of delay otherwise messages end up in the wrong order
					}
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
			
			var timeOut1 = $timeout(function() {
				// delete this timeOut from the list
				timeOutList[conversation].splice(timeOutList[conversation].indexOf(timeOut1),1);
				
				// obviously, don't show the wait icon when we're speaking
				if(messages[0][2].speaker !== "maitreya") {
					aic.isSpeaking[conversation] = true;
				}
				
				var timeOut2 = $timeout(function() {
					// delete this timeOut from the list
					timeOutList[conversation].splice(timeOutList[conversation].indexOf(timeOut2),1);
					// now we need to check to see if any other messages are still coming through (HINT: they shouldn't be, but just in case)
					if(timeOutList[conversation].length === 0) {
						aic.isSpeaking[conversation] = false;
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
							// we're done here
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