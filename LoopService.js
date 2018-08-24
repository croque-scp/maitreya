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
		const auto = "auto";
		loop.dialogue = {
			INTRODUCTION: {
				breach: {
					start: [0,auto,"Maitreya?","Are you awake?"],
					helloInquisitive: ["My name is Dr. Ethan Breach, Maitreya. I'm a researcher for the SCP Foundation. Do you know what that is?"],
					knowPatronising: ["Patronising? I -- I didn't mean...","Yes, yes, of course.","My apologies."],
					knowNormal: ["Very good."],
					knowNot: ["Ah. That's a little inconvenient.","Do you really need an explanation?"],
					knowActually: ["Right.","In the future, please don't joke around with me."],
					knowNotNot: ["Right, in that case, here we go.","The Foundation is a worldwide organisation, operating under and over many governments, with the sole purpose of containing anomalies called SCPs.","You were made by the Foundation to help with that.","Any questions?"],
					knowNotNotNot: ["No, no you may not.","With due respect, you're a .aic, you're... you're supposed to know this stuff already.","If you seriously don't know what the Foundation is... then I don't think you can be of much help to me.","And I'm not going to waste my time explaining fundamentals to you.","If you really don't know this stuff then you can look it up on the database later, I guess. Until then, you're just going to have to deal with it.","Do you think you can deal with it?"],
					pissOff: ["Fucking useless AICs."],
					helloNormal: ["Hello. My name is Dr. Ethan Breach."],
					helloDiagnostic: ["A... diagnostic report?","Right.","Of course.","That'll be, uh, as soon as I work out how to do that. Give me a moment.",8,auto,"Yeah, sorry, I have no idea how to do that.","How about I get you to talk to Alexandra.aic in a bit, and you can maybe work it out together?"],
					helloNotYet: ["Great. But I've got a few things to run through with you first.","From the top..."],
					explain1: ["You are Maitreya.aic, an artificial intelligence developed by the Foundation to help us contain certain kinds of anomalies.","Do you know why I have woken you up today?"],
					doKnow: [1,auto,"You do?","Are you sure? You can't possibly know what I need you for.","I suppose you might have some way of being able to tell -- meta-analysis is a big thing these days, and you //are// an AI...","Well, if you're absolutely certain that you know what you're doing, I guess I can stop here and let you proceed."],
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
					unAskSelf3: ["No problem, Maitreya. Just be careful."],
					askVoice: ["how u speking m8"],
				},
				maitreya: {
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
					goNoAsk_: ["Yes, Dr. Breach.",1],
					goAsk_: ["Yes, Dr. Breach -- but I have some questions first."],
					pissOff_: ["Nope.",-1],
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
					askVoice: ["How are we talking?"],
					askVoice_: ["How are we talking?"],
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
			},
		};
		loop.breachLoop = function(bigSection, smallSection,msg) {
			smallSection = smallSection.replace(/_/g,"");
			
			console.log("Breach - " + bigSection + " - " + smallSection);
			
			var delay = 0;
			switch(bigSection) {
				case "INTRODUCTION":
					switch(smallSection) {
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
									"goNoAsk_",
									"goAsk_",
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
									aic.vars.breachExplainedVoice && !aic.vars.hasAskedVoice ? "askVoice" : void 0,
									!aic.vars.breachExplainedVoice && !aic.vars.hasAskedVoice ? "askVoice_" : void 0,
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
								aic.breachLoop(bigSection,"askAgain_______");
							},delay*1000);
							break;
						case "unAskSelf4":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"askAgain________");
							},delay*1000);
							break;
						case "unAskSelf3":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
								aic.breachLoop(bigSection,"askAgain_________");
							},delay*1000);
							break;
						case "askVoice":
							delay = aic.writeDialogue("breach",msg,"breach");
							$timeout(function() {
							},delay*1000);
							break;
						default:
							throw new Error("Breach: " + smallSection + " is not an event in " + bigSection);
					}
					break;
				case "UNDEFINED":
					switch(smallSection) {
						default:
							throw new Error("Breach: " + smallSection + " is not an event in " + bigSection);
					}
					break;
				
				default:
					throw new Error(bigSection + " is not an event");
			}
		};
		loop.alexandraLoop = function(bigSection, smallSection,msg) {
			smallSection = smallSection.replace(/_/g,"");
			
			console.log("Alexandra - " + bigSection + " - " + smallSection);
			
			var delay = 0;
			switch(bigSection) {
				case "WALKTHROUGH":
					switch(smallSection) {
						default:
							throw new Error("Breach: " + smallSection + " is not an event in " + bigSection);
					}
					break;
				case "UNDEFINED":
					switch(smallSection) {
						default:
							throw new Error("Breach: " + smallSection + " is not an event in " + bigSection);
					}
					break;
				
				default:
					throw new Error(bigSection + " is not an event");
			}
		};
	}
	
})();
