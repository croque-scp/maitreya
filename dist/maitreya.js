// Maitreya.js, the workhorse behind SCP-4000
// Written by Croquembouche, released under MIT
// Reminder to author: replace all 4000 with whatever number this ends up with
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") { _typeof = function (_typeof2) { function _typeof(_x) { return _typeof2.apply(this, arguments); } _typeof.toString = function () { return _typeof2.toString(); }; return _typeof; }(function (obj) { return typeof obj === "undefined" ? "undefined" : _typeof(obj); }); } else { _typeof = function (_typeof3) { function _typeof(_x2) { return _typeof3.apply(this, arguments); } _typeof.toString = function () { return _typeof3.toString(); }; return _typeof; }(function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj); }); } return _typeof(obj); }

var shuffle,
    hasProp = {}.hasOwnProperty;
/* global $, angular */
// randomise an array

shuffle = function shuffle(array) {
  var i, m, t;
  m = array.length;
  t = void 0;
  i = void 0;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

(function () {
  var EncodeURIComponentFilter, MaitreyaController, maitreya;

  MaitreyaController = function MaitreyaController($scope, $timeout, LoopService, $sce, $http) {
    var addNotification, aic, alexandraLoop, auto, breachLoop, commandsUsedIterator, dynamicLoop, _endingLoop, _mainLoop, preloadAlexandraFaces, preloadImage, presentOptions, _pushToLog, speech, writeDialogue;

    aic = this;
    LoopService.use($scope); // give BreachLoopService our scope
    // the LoopService service (from LoopService.js) contains the interactions for Breach, Alexandra and D-Class generated from the spreadsheet

    $scope.trustAsHtml = function (string) {
      return $sce.trustAsHtml(string);
    };

    aic.bootDate = new Date(new Date(Date.now()).setFullYear(2018));
    auto = 'auto';
    aic.lang = {}; // This object contains all strings that aren't dialogue

    speech = {
      // This object contains all dialogue strings
      merge: function merge(dialogue) {
        var bigSection, section, speaker; // merges dialogue from LoopService into this variable

        console.log("Merging dialogue...");

        for (bigSection in dialogue) {
          if (!hasProp.call(dialogue, bigSection)) continue;
          section = dialogue[bigSection];

          if (this.hasOwnProperty(bigSection)) {
            for (speaker in section) {
              if (!hasProp.call(section, speaker)) continue;
              console.log("..." + bigSection + " of " + speaker);
              this[bigSection][speaker] = dialogue[bigSection][speaker];
            }
          } else {
            // if speech does not have the bigSection, hell yeah let's
            // overwrite that shit
            console.log("...new " + bigSection);
            this[bigSection] = dialogue[bigSection];
          }
        }

        return null;
      }
    }; // Initial setup for once the page has loaded

    $(document).ready(function () {
      aic.onMobile = $('body').width() < 700;
      $scope.$apply(function () {
        aic = aic_init(aic);
        aic.lang = getBaseLexicon(aic)['lang'];
        speech.merge(getBaseLexicon(aic)['speech']);
        return speech.merge(LoopService.dialogue);
      });
      preloadImage(aic.lang.images.greyStripe);
      return null;
    }); // called when "BOOT UP" is clicked from preload

    aic.bootUp = function () {
      var article;
      aic.preload = false; // XXX shouldn't this use the same data picker as the first one?

      aic.bootDate = new Date(Date.now()); // TODO: save/load
      // also need to sort out the dates of the articles

      for (article in aic.lang.articles) {
        if (!!aic.lang.articles[article].revised && aic.lang.articles[article].revised < 0) {
          aic.lang.articles[article].revised = Date.now() + aic.lang.articles[article].revised;
        }
      } // Here we go boys


      _mainLoop('INTRODUCTION', 'startBoot'); //breachLoop("INTRODUCTION","askVoiceExp");
      //alexandraLoop("TUTORIAL","emotiontest");
      //alexandraLoop("TUTORIAL","tutExp");


      return null;
    };

    _mainLoop = function mainLoop(bigSection, smallSection) {
      var delay, rooms; // So this is where the magic happens
      // So here's one idea: bigSection and smallSection
      // one big switch, many little switches
      // smallSection would be the message IDs probably
      // problem: do I really want to split my entire conversational tree into sections?
      // Answer: hell yes I do
      // pass sections to the func or use variables?
      // pass to func for now

      smallSection = smallSection.replace(/_*$/g, "");
      console.log("Main - " + bigSection + " - " + smallSection); // msg syntax IS NOT SUITABLE HERE! only for breach and alexandra!

      delay = 0;

      switch (bigSection) {
        case 'INTRODUCTION':
          switch (smallSection) {
            case 'startBoot':
              delay = writeDialogue('terminal', speech[bigSection].terminal[smallSection]);
              aic.timers.terminal = $timeout(function () {
                breachLoop('INTRODUCTION', 'start');
                return null;
              }, (delay - 1.5) * 1000);
              break;

            default:
              throw new Error(smallSection + " is not an event in " + bigSection);
          }

          break;

        case 'ROOMS':
          rooms = [];

          switch (smallSection) {
            case 'rebootRooms':
              // this is issued when the user resets all the cameras
              // first, turn them all off
              // then turn them all back on, one by one
              $timeout(function () {
                _mainLoop('ROOMS', 'unbootRoom');

                return null;
              }, 200);
              break;

            case 'unbootRoom':
              // rebootRooms calls this to unboot individual rooms
              rooms = arguments[2] || Object.keys(aic.rooms);

              if (true) {
                // all rooms must be turned off at this point
                $scope.$apply(function () {
                  aic.rooms[rooms[0]].error = true;
                  return null;
                });
              } // now check the next room


              rooms.shift();

              if (rooms.length > 0) {
                $timeout(function () {
                  _mainLoop('ROOMS', 'unbootRoom', rooms);

                  return null;
                }, Math.floor(Math.random() * 20));
              } else {
                $timeout(function () {
                  _mainLoop('ROOMS', 'bootRoom');

                  return null;
                }, 2000);
              }

              break;

            case 'bootRoom':
              // rebootRooms calls this to reboot individual rooms
              // arguments[2] is a random list of rooms
              // arguments[3] is the delay
              // only check the first room in the list
              rooms = arguments[2] || shuffle(Object.keys(aic.rooms));
              delay = arguments[3] - 20 || 600;

              if (aic.rooms[rooms[0]].error === true && aic.vars.scp4000.location !== rooms[0] && rooms[0] !== 'toilet') {
                $scope.$apply(function () {
                  aic.rooms[rooms[0]].error = false;
                  return null;
                });
              } // now check the next room


              rooms.shift();

              if (rooms.length > 0) {
                $timeout(function () {
                  _mainLoop('ROOMS', 'bootRoom', rooms, delay);

                  return null;
                }, Math.floor(Math.random() * delay));
              }

              break;

            default:
              throw new Error(smallSection + " is not an event in " + bigSection);
          }

          break;

        case 'misc':
          switch (smallSection) {
            // pretty sure this only happens when skipping the intro, but whatever
            case 'introSkipped':
              delay = writeDialogue("terminal", speech[bigSection].terminal[smallSection]);
              break;

            default:
              throw new Error(smallSection + " is not an event in " + bigSection);
          }

          break;

        default:
          throw new Error(bigSection + " is not an event");
      }

      return null;
    };

    breachLoop = function breachLoop(bigSection, smallSection) {
      var error, msg; // smallSection may have trailing underscores - clean these up

      smallSection = smallSection.replace(/_*$/g, '');
      console.log("Breach - " + bigSection + " - " + smallSection);
      msg = void 0;

      try {
        msg = speech[bigSection].breach[smallSection];
      } catch (error1) {
        error = error1;
        throw new Error(smallSection + " doesn't exist in Breach's " + bigSection);
      }

      aic.ready.messages = true;
      aic.ready.breach = true; // breachLoop has been exported to LoopService
      // check for events that we want to handle manually

      switch (bigSection) {
        case 'MISC':
          switch (smallSection) {
            case 'fillerQuestion':
              break;

            default:
              //do stuff
              throw new Error("Breach " + smallSection + " is not an event in " + bigSection);
          }

          break;

        default:
          // this event is not declared, so defer to LoopService
          LoopService.breachLoop(bigSection, smallSection, msg);
      }

      return null;
    };

    alexandraLoop = function alexandraLoop(bigSection, smallSection) {
      var msg; // smallSection may have trailing underscores - clean these up

      smallSection = smallSection.replace(/_*$/g, '');
      console.log("Alexandra - " + bigSection + " - " + smallSection);
      msg = void 0; // try

      msg = speech[bigSection].alexandra[smallSection]; // catch error
      // throw new Error("#{smallSection} doesn\'t exist in Alexandra\'s #{bigSection}")

      aic.ready.messages = true;
      aic.ready.alexandra = true; // breachLoop has been exported to LoopService

      LoopService.alexandraLoop(bigSection, smallSection, msg);
      return null;
    };

    _endingLoop = function endingLoop(bigSection, smallSection, delay) {
      // smallSection may have trailing underscores - clean these up
      if (typeof smallSection === 'string') {
        // endingLoop"s smallSection is optional
        smallSection = smallSection.replace(/_*$/g, "");
      }

      console.log("Ending - " + bigSection + " - " + smallSection);
      delay = delay || 0;

      switch (bigSection) {
        case 'PUSHENDING':
          $timeout(function () {
            aic.currentEnding = aic.endingPositions[smallSection];
            aic.vars.endingFractionText = aic.lang.endingFraction.replace('$1', aic.currentEnding + 1).replace('$2', aic.lang.endings.length);
            aic.ready.ending = true;
            aic.vars.terminalEmphasis = false;
            aic.switchApp('ending');
            return null;
          }, delay * 1000, true);
          break;

        case 'ENDING':
          switch (smallSection) {
            case 'pissOff':
              aic.vars.terminalEmphasis = true;
              delay = writeDialogue('terminal', speech.misc.terminal.breachShutDown);
              $timeout(function () {
                _endingLoop('PUSHENDING', smallSection, 2);

                return null;
              }, delay * 1000);
              break;

            case 'example':
              $timeout(function () {
                _endingLoop('PUSHENDING', smallSection, 2);

                return null;
              }, delay * 1000);
              break;

            default:
              throw new Error(smallSection + " is not an ending");
          }

          break;

        default:
          throw new Error(bigSection + " is not an event");
      }

      return null;
    };

    dynamicLoop = function dynamicLoop(character, bigSection, smallSection) {
      // this only gets called when a conversation is skipped, so we can probably unmark the skippo here
      aic.isSkipping[character] = false;

      switch (character) {
        case 'breach':
          breachLoop(bigSection, smallSection);
          break;

        case 'alexandra':
          alexandraLoop(bigSection, smallSection);
          break;

        case 'terminal':
          _mainLoop(bigSection, smallSection);

          break;

        default:
          console.log(character, bigSection, smallSection);
          throw new Error("Unexpected dynamic character: " + character);
      }

      return null;
    };
    /* PROCESSING FUNCTIONS */
    // pass options to chatLog for presentation to the user


    presentOptions = function presentOptions(conversation, bigSection, ids) {
      var dialogueList, error, i, j, opinion, optionType, options;

      if (!aic.speakerList.includes(conversation)) {
        throw new Error(conversation + " is not a conversation");
      }

      if (!Array.isArray(ids) && ids !== 'CLEAR') {
        throw new Error("options is not an array");
      } // this function needs to put stuff into aic.chatLog[conversation].options
      // options list may not be empty:


      aic.chatLog[conversation].options = []; // if ids is "CLEAR", stop here, we only want to clear the array

      if (ids === 'CLEAR') {
        return null;
      } // clear undefined from list of options (in case of false-less ifs)


      ids = ids.filter(Boolean); // is is very possible that certain actions will need to do things other than output text. we'll cross that bridge when we come to it

      options = [];
      i = 0;

      while (i < ids.length) {
        try {
          // we're now looking at individual options.
          // deep copy the speech into the option
          options[i] = speech[bigSection].maitreya[ids[i]].slice();
        } catch (error1) {
          error = error1; // this can only fail if the option doesn't exist

          throw new Error("Option " + ids[i] + " doesn't exist");
        }

        if (!Array.isArray(options[i])) {
          console.log("ids: ", ids);
          console.log("i: ", i);
          throw new Error("option " + options[i] + " is not an array");
        } // first we work out what sort of action this is


        optionType = void 0;

        if (options[i][0].charAt(1) === ":") {
          switch (options[i][0].charAt(0)) {
            case 's':
              optionType = 'speech';
              break;

            case 'a':
              optionType = 'action';
              break;

            default:
              throw new Error("Unknown option type");
          }

          options[i][0] = options[i][0].substring(2);
        } else {
          // no option type was declared, assume speech
          optionType = 'speech';
        } // we have the option type and the option text
        // next job is to get the dialogue text
        // we can probably let the event handler deal with that?
        // still need to actually get that info to the handler tho


        dialogueList = [];
        opinion = 0;
        j = 0;

        while (j < options[i].length) {
          // we need to skip over [0]
          // this is because we've already handled the control statement
          if (j === 0) {
            // two possibilities: this is the only parameter, or there is also an opinion modifier
            if (typeof options[i][1] === 'undefined') {
              // this is the only parameter
              // set the first dialogue to the option text
              dialogueList[0] = options[i][0];
            } else if (typeof options[i][1] === 'number' && typeof options[i][2] === 'undefined') {
              // of course, if the 2nd value is a number, then it won't return undefined
              // but if that number is also the LAST value, then it's an opinion, and doesn't count as dialogue
              // so we need to detect this scenario and do the same as above
              dialogueList[0] = options[i][0];
              opinion = options[i][1];
            } // we're not skipping the loop, so the opinion will be set again, but who cares lmao

          } else if (j + 1 === options[i].length) {
            // check the last value - if it's a number, this is an opinion
            if (typeof options[i][j] === 'number') {
              // it's an opinion modifier
              opinion = options[i][j];
            } else {
              // if it's not an opinion, it must be text, so treat it as text (see below)
              dialogueList[j - 1] = options[i][j];
            }
          } else {
            // all other values must be text (hopefully)
            dialogueList[j - 1] = options[i][j];
          }

          j++;
        } // dialogueList now contains the list of dialogue to output FOR THIS ONE OPTION


        options[i] = {
          id: ids[i],
          optionType: optionType,
          text: options[i][0].format(),
          opinion: opinion,
          dialogue: dialogueList,
          bigSection: bigSection
        }; // ok cool
        // move onto the next option?

        i++;
      }
      /*$scope.$apply(function() {*/
      //aic.chatLog[conversation].options.push(...options);


      aic.chatLog[conversation].options = options; // this is probably better tbh

      /*});*/

      return null;
    }; // structure dialogue and calculate timing


    writeDialogue = function writeDialogue(conversation, dialogueList, speaker, smallSection) {
      var cssClass, emote, force, i, j, maitreyaMessages, messages, mode, n1, n2, text, totalDelay; // Take a name and an array (mixture of letters and numbers) and crank out that dialogue boy
      // Expected format: n n text n n text n n text repeating
      // Where n1 is missing, assume 0
      // Where n2 is missing, calculate it based on length of phrase being typed
      // During n1, nothing
      // During n2, must display a "typing" (except on terminal)
      // assume the current person is talking if no speaker is specified

      speaker = speaker || conversation;

      if (!Array.isArray(dialogueList)) {
        console.error(arguments);
        throw new Error("dialogueList is not an array (probably does not exist)");
      } // deep copy the dialogue to protect the original


      dialogueList = dialogueList.slice();
      n1 = void 0;
      n2 = void 0;
      messages = [];
      totalDelay = 0;
      force = void 0;
      emote = void 0;
      i = 0;

      while (i < dialogueList.length) {
        if (typeof dialogueList[i] === 'number') {
          if (typeof n1 === 'number') {
            n2 = dialogueList[i];
          } else {
            n1 = dialogueList[i];
          } // if the number is the last item, it's the opinion modifier


          if (i + 1 === dialogueList.length) {
            aic.vars.people[conversation].opinion += dialogueList[i];
          }

          i++;
          continue;
        } else if (typeof dialogueList[i] === 'string') {
          if (dialogueList[i] === 'auto') {
            if (typeof n1 === 'number') {
              n2 = dialogueList[i];
            } else {
              n1 = dialogueList[i];
            }

            i++;
            continue;
          } // the final piece in the n n text triplet
          // we have n1 and n2 to assign
          // if only one number is present, it is n1, there is no n2
          // default n1 is 0
          // default n2 is calculated based on string length


          if (typeof n1 !== 'number') {
            n1 = aic.typingDelay;
          }

          if (typeof n2 !== 'number') {
            n2 = aic.typingSpeed * dialogueList[i].length;
          } // obviously maitreya also always speaks instantly
          // correction: maitreya does not speak instantly, because that fucking sucks


          if (speaker === 'maitreya') {
            // but we want the first message to be instant
            if (i === 0) {
              n2 = 0;
            } else if (n2 > 1) {
              // and then make her speak a little bit faster anyway
              n2 *= 0.5;
            }
          } else {
            /*n2 = 0;*/
            if (aic.vars.lastSpeaker === 'maitreya' && n1 < 1) {
              // if maitreya was last to speak, we want to make it look like the other person is reading our message for a moment
              // but if it's a really short message, then it doesn't matter too much
              // so what we'll do is delay the next message by 0.5s for each message that maitreya sent
              // so we need to query the number of messages sent by maitreya and multiply it by 0.5 and make n1 that
              maitreyaMessages = 0;
              j = 0;

              while (j < aic.chatLog[conversation].log.length) {
                if (aic.chatLog[conversation].log[j].speaker === 'maitreya') {
                  maitreyaMessages++;
                } else {
                  break;
                }

                j++;
              } // we already know that the last speaker is maitreya, so it is impossible for this value to be 0


              if (maitreyaMessages === 0) {
                /*throw new Error("maitreyaMessages is 0");*/
                // except sometimes we reach this point anyway, and I have no idea why, so there"s no point breaking the flow lmao
                console.error("maitreyaMessages is 0");
              }

              n1 = maitreyaMessages * 0.5;
            }
          } // if the cheat is on, everyone speaks instantly


          if (aic.cheats.impatientMode) {
            n1 = 0;
            n2 = 0.1;
          } // we need a small amount of delay otherwise messages end up in the wrong order


          cssClass = '';
          mode = void 0;
          text = dialogueList[i];

          if (text.charAt(1) === ':') {
            switch (text.charAt(0)) {
              case 'e':
                // terminal error
                cssClass = 'error';
                break;

              case 'w':
                // terminal warning
                cssClass = 'warning';
                break;

              case 'i':
                // terminal info
                cssClass = 'info';
                break;

              case 'm':
                // make maitreya talk
                force = 'maitreya';
                break;

              case 'c':
                // make the current speaker talk
                force = conversation;
                break;

              case 'n':
                // 592 narration
                force = 'narrator';
                break;
              // quiet, but might not implement this

              case 't':
                // message is typed, not spoken
                n2 *= 2;
                mode = 'typing';
                cssClass = 'typed';
                break;

              default:
                throw new Error("Unknown dialogue type: " + text.charAt(0));
            }

            text = text.substring(2);
          }

          if (speaker === 'alexandra' && text.length > 0) {
            if (!!/(^\w*?):/.exec(text)) {
              emote = /(^\w*?):/.exec(text)[1];

              if (!aic.alexandraEmotionList.includes(emote)) {
                throw new Error("Alexandra is experiencing an invalid emotion: " + emote);
              }

              text = text.substring(emote.length + 1);
            } else {
              // if no emotion is specified, maintain the last one
              emote = emote != null ? emote : aic.alexandraEmotionList[0];
            }
          }

          messages.push([n1, n2, {
            speaker: force != null ? force : speaker,
            cssClass: cssClass,
            text: text.format(),
            mode: mode != null ? mode : 'default',
            emote: emote
          }]);
          totalDelay += n1 + n2; // record the previous speaker, but only if there was actually a message

          if (text.length > 0) {
            aic.vars.lastSpeaker = force || speaker;
          } // reset everything for the next iteration


          n1 = void 0;
          n2 = void 0;
          force = void 0;
          mode = 'default';
        } else {
          throw new Error("Dialogue not number or string");
        }

        i++;
      }

      _pushToLog(conversation, messages, smallSection); // the total length of all messages gets passed back to the mainloop


      return totalDelay;
    }; // push dialogue to chatLog for presentation to the user


    _pushToLog = function pushToLog(conversation, messages, ID, thread) {
      var n1, n2, timeOut1; // check the dialogue's ID (ie smallSection)

      /*if(!ID && conversation !== "terminal") {
      throw new Error("ID was not passed to pushToLog");
      }
      */
      // next check if this iteration of pushToLog actually has permission to push To Log

      /*var hasControl = false;
      thread = thread || Math.floor(100000 + Math.random() * 900000); // give this thread a random identifiable ID
      // currentlyPushing must be set to this unique value so that other instances know that we have control
      if(currentlyPushing[conversation] !== false && currentlyPushing[conversation] !== thread) {
      // another instance is using this thread
      // ...but we don't care. newer threads get priority, for now
      // take control anyway. the other thread will be notified passively
      currentlyPushing[conversation] = thread;
      hasControl = true;
      } else if(currentlyPushing[conversation] === false) {
      // no one is using this thread, we're good to go
      // take control of the thread
      currentlyPushing[conversation] = thread;
      hasControl = true;
      } else if(currentlyPushing[conversation] === thread) {
      // this thread still has control
      // no need to do anything
      hasControl = true;
      } else {
      throw new Error("Unknown pushToLog thread ownership situation in #{conversation} - new " + thread + " vs old " + currentlyPushing[conversation]);
      }
      */
      // we should only be handling one ID per character at any given time.
      // if the redundancies are set up correctly, ID should be unique for every interaction.
      // what we are going to do:
      //   check if the queue (per character) is empty
      //   if it it, great, carry on as normal.
      //   if it's not, add the ID to the queue.
      //     will need to find a way to pass the time delay back up to the loop function, but shouldn't be necessary for now
      //   if we added the ID to the queue, abort.
      //   if we didn't, then at the end of the function, get the next item in the queue and pushToLog it
      //     make sure to splice the queue
      // goal of this is to allow for cancelling messages in the future more easily as well as making sure that pushToLog is not running more than once per character
      // TODO: reconfigure writeDialogue so that it also passes the ID
      // conversation: terminal, breach, etc
      // messages: [n1, n2, message]
      // message: {speaker:; cssClass:; text:}

      n1 = messages[0][0];
      n2 = messages[0][1]; // this is a recursive function
      // the messages[0] is deleted at the end of the operation, moving the rest of the array down, so we only ever need to access messages[0]
      // check for control. will need to do this when doing anything after a timer

      /*if(!stillHasControl(0)) return;*/

      timeOut1 = $timeout(function () {
        var timeOut2; // delete this timeOut from the list

        aic.timeOutList[conversation].splice(aic.timeOutList[conversation].indexOf([timeOut1, conversation]), 1);
        /*if(!stillHasControl(1)) return;*/
        // obviously, don't show the wait icon when we're speaking

        /*
        if(messages[0][2].speaker === "maitreya") {
        // this shows the marker for maitreya, but we only want this if we aren't the *only* maitreya message in the chain
        // 1st check: if the next speaker is maitreya, then obviously the chain is longer than 1
        // 2nd check: if we're already showing the marker, then the chain is definitely longer than 1
        if((messages.length > 1 && messages[1][2].speaker === "maitreya") || aic.isProcessing[conversation]) {
        aic.isProcessing[conversation] = true;
          }
        } else if(n2 > 0) { // we only want to trigger the wait at all if n2 > 0
        aic.isSpeaking[conversation] = true;
        aic.isProcessing[conversation] = false;
        // check to see whether breach is speaking or typing
        if(messages[0][2].speaker === "breach") {
        aic.vars.breachEntryMode = messages[0][2].mode || "speaking";
          }
        }
        */

        if (n2 > 0) {
          // we only want to trigger the wait at all if n2 > 0
          if (messages[0][2].speaker === 'maitreya' && messages.length > 0) {
            aic.isProcessing[conversation] = true;
          } else {
            aic.isSpeaking[conversation] = true;
            aic.isProcessing[conversation] = false; // check to see whether breach is speaking or typing

            if (messages[0][2].speaker === 'breach') {
              aic.vars.breachEntryMode = messages[0][2].mode || 'speaking';
            }
          }
        }

        timeOut2 = $timeout(function () {
          var e, timeout; // delete this timeOut from the list

          aic.timeOutList[conversation].splice(aic.timeOutList[conversation].indexOf([timeOut2, conversation]), 1);
          /*if(!stillHasControl(2)) return;*/
          // now we need to check to see if any other messages are still coming through (HINT: they shouldn't be, but just in case)

          if (aic.timeOutList[conversation].length === 0) {
            aic.isSpeaking[conversation] = false; // check if the next message is ours for marker smoothness

            if (messages.length > 1) {
              if (messages[1][2].speaker !== 'maitreya') {
                aic.isProcessing[conversation] = false;
              }
            } else {
              // XXX so this is making the processing icon hang for a moment after maitreya's last message
              // I have no clue why it's doing this
              // correction: it actually hangs until the next message comes through. this is a problem
              // this would be because we don't force terminate it at the end of the dialogue?
              aic.isProcessing[conversation] = false;
            }
          }

          if (!!aic.isSkipping[conversation]) {
            // check to see if we're being interrupted
            // the value of isSkipping[c] is either false or a character-bigSection-smallSection array indicating where to go afterwards
            console.log("Now interrupting: " + conversation); // loop through timeoutlist and kill all timeouts?
            // maybe associate each timeout with its conversation in the list so we can selectively kill them

            timeout = 0;

            while (timeout < aic.timeOutList[conversation].length) {
              $timeout.cancel(aic.timeOutList[conversation][timeout][0]);
              aic.timeOutList[conversation].splice(aic.timeOutList[conversation].indexOf(timeout), 1); // cancel the timer associated with the messages itself
              //$timeout.cancel(aic.timers[conversation]); // commented because not sure why this is needed
              // skip ahead to the requested conversation section
              //TODO: if the (dialogue that's being interrupted) has already queued the next line (ie loopThrough==true), then the current dialogue will be cancelled but the upcoming dialogue will not

              if (ID !== void 0) {
                aic.blacklist.push(ID);
                console.log("Blacklisting " + ID + " (via pushToLog)");
              } else {
                console.log("Did not blacklist \'undefined\' (via pushToLog)");
              }

              try {
                aic.dynamicLoop(aic.isSkipping[conversation][0], aic.isSkipping[conversation][1], aic.isSkipping[conversation][2]);
              } catch (error1) {
                // aic.isSkipping gets cleared in dynamicLoop
                e = error1;
                console.error(e);
                throw new Error("Unexpected interruption");
              }

              timeout++;
            } // this entire interruption check may be bypassed by currentlyPushing, actually
            // ...which is itself bypassed by the blacklist?
            // honestly have no idea what's going on
            // TODO clean up obsolete comments


            aic.isSkipping[conversation] = false;
          } else {
            if (aic.blacklist.includes(ID)) {
              console.error("WARNING: Tried to push " + ID + " but it was blacklisted (via pushToLog)");
            } else {
              // don't push the message if it's empty
              // should never actually reach this point, but we do sometimes. final check.
              if (messages[0][2].text.length > 0) {
                // also don't push it if we don't have control

                /*if(hasControl) {*/
                aic.chatLog[conversation].log.unshift(messages[0][2]);
                addNotification(conversation);
              }
              /*}*/


              messages.shift();

              if (messages.length > 0) {
                // send the next message
                _pushToLog(conversation, messages, ID);
              } else {}
            }
          } // no more messages. we're done here
          // if we have control, declare that we're releasing it

          /*if(hasControl) {
          currentlyPushing[conversation] = false;
          }
          */


          return null;
        }, n2 * 1000, true);
        aic.timeOutList[conversation].push([timeOut2, conversation]);
        return null;
      }, n1 * 1000, true);
      aic.timeOutList[conversation].push([timeOut1, conversation]);
      /*function stillHasControl(timeout) {
      // check whether or not the current thread has control
      console.log(currentlyPushing[conversation] + " has control");
      if(currentlyPushing[conversation] === false) {
      throw new Error("currentlyPushing is false but a pushToLog thread (#{thread}) is running");
        } else if(currentlyPushing[conversation] === thread) {
        // this thread still has control
        console.log(thread + " still has control");
        hasControl = true;
        return true;
        } else {
        // this thread no longer has control
        hasControl = false;
        console.log("pushToLog thread #{thread} interrupted by " + currentlyPushing[conversation] + " at " + timeout);
        return false;
        }
      }
      */

      return null;
    }; // add notifications to apps/speakers


    addNotification = function addNotification(target) {
      // accepts apps as well as conversations as targets
      if (aic.speakerList.includes(target)) {
        if (aic.selectedApp !== 'messages' || aic.selectedSpeaker !== target) {
          aic.notifications[target]++;
        }
      } else {
        if (aic.selectedApp !== target) {
          aic.notifications[target]++;
        }
      }

      return null;
    }; // calculate the difference between two dates


    aic.dateDiff = function (date1, date2) {
      var days, diff, hours, message, mins, months, secs, years;
      diff = Math.floor(date1.getTime() - date2.getTime());
      secs = Math.floor(diff / 1000);
      mins = Math.floor(secs / 60);
      hours = Math.floor(mins / 60);
      days = Math.floor(hours / 24);
      months = Math.floor(days / 31);
      years = Math.floor(months / 12);
      months = Math.floor(months % 12);
      days = Math.floor(days % 31);
      hours = Math.floor(hours % 24);
      mins = Math.floor(mins % 60);
      secs = Math.floor(secs % 60);
      message = "";

      if (days <= 0) {
        if (hours > 0) {
          message += hours + " hours ";
        }

        if (mins > 0) {
          message += mins + " min ";
        }

        if (hours < 1) {
          message += secs + " sec ";
        }
      } else {
        if (years > 0) {
          message += years + " years, ";
        }

        if (months > 0 || years > 0) {
          message += months + " months and ";
        }

        message += days + " days";
      }

      return message;
    }; // assign a room to a d-class


    aic.assignRoom = function () {
      var index, room;
      room = aic.vars.availableRooms[Math.floor(Math.random() * aic.vars.availableRooms.length)];
      index = aic.vars.availableRooms.indexOf(room);

      if (index > -1) {
        aic.vars.availableRooms.splice(index, 1);
      } else {
        throw new Error("Bad room");
      }

      room = "s" + room; // TODO tell the room which d class is now in it

      return room;
    }; // constructor function for characters


    aic.Actor = function (name, role, location) {
      var me;
      me = this;

      if (Array.isArray(name)) {
        me.firstName = name[0];
        me.lastName = name[1];
        me.name = me.firstName + " " + me.lastName;
      } else {
        me.name = name;
      }

      me.location = location;

      if (!role.id || !role.status || !role.allegiance || !role.type) {
        throw new Error(me.name + " is missing role info");
      }

      me.id = role.id;

      if (['ok', 'dead'].includes(role.status)) {
        me.status = role.status;
      } else {
        throw new Error(me.name + " has an invalid role status");
      }

      if (['scp', '4000', 'ci'].includes(role.allegiance)) {
        me.allegiance = role.allegiance;
      } else {
        throw new Error(me.name + " has an invalid role allegiance");
      }

      if (['dr', 'aic', 'scp', 'd'].includes(role.type)) {
        me.type = role.type;
      } else {
        throw new Error(me.name + " has an invalid role type");
      }

      switch (me.type) {
        case 'aic':
          me.opinion = 5;
          break;

        case 'd':
          me.opinion = -5;
          break;

        default:
          me.opinion = 0;
      }

      return null;
    };

    preloadAlexandraFaces = function preloadAlexandraFaces() {
      var _, ref, source;

      ref = aic.lang.images.alexandraLogo;

      for (_ in ref) {
        source = ref[_];
        preloadImage(source);
      }

      return null;
    };

    preloadImage = function preloadImage(source) {
      var image;
      image = new Image();
      image.src = source;
      return null;
    }; // called when user switches app via buttons or terminal


    aic.switchApp = function (app) {
      if (app === aic.selectedApp) {// this is already the selected app, do nothing
      } else if (aic.ready[app] === false) {// this app is disabled, do nothing
      } else if (aic.appList.includes(app)) {
        // also need to clear this app's notifications
        if (app === 'messages') {
          aic.notifications[aic.selectedSpeaker] = 0;
        } else {
          aic.notifications[app] = 0;
        }

        aic.vars[app + "Emphasis"] = false;
        aic.selectedApp = app; // then, if the app is terminal, focus the input

        if (app === 'terminal') {
          $timeout(function () {
            $('#terminal-input')[0].focus();
            return null;
          }, 100);
        }
      } else {
        // Why does this need to be in a timeout? No clue.
        throw new Error("Invalid app specified -- terminal / messages / database / run");
      }

      return null;
    }; // called when the user switches speaker in the messages app


    aic.switchSpeaker = function (speaker) {
      if (speaker === aic.selectedSpeaker) {// this is already the selected speaker, do nothing
      } else if (aic.ready[speaker] === false) {} else {
        // this speaker is disabled, do nothing
        aic.selectedSpeaker = speaker; // also need to clear this speaker's notifications

        aic.notifications[speaker] = 0;
      }

      return null;
    }; // called when the user switches operations in the run app


    aic.switchOperation = function (operation) {
      if (operation === aic.selectedOperation) {// this is already the selected operation, do nothing
      } else if (aic.ready[operation] === false) {} else {
        // this operation is disabled, do nothing
        aic.selectedOperation = operation;
      }

      return null;
    }; // called when the user switches articles in the database app


    aic.switchArticle = function (article) {
      var i;
      console.log("Switching to article: " + article); // specific exception for tutorial

      if (aic.vars.waitingForRead4000 === true && article === 'scp4000') {
        aic.vars.waitingForRead4000 = false;
        alexandraLoop('TUTORIAL', 'tut5');
      }

      if (article === aic.selectedArticle) {// this is already the selected article, do nothing
      } else if (article === 'menu') {
        // we're selecting the menu, which is always enabled
        aic.selectedArticle = 'menu'; // however, because we're only using 1 section for all articles, we need to force a 0.6s delay so the css can catch up

        $timeout(function () {
          aic.selectedArticleData = {};
          return null;
        }, 600, true);
      } else if (aic.lang.articles[article].available === false) {} else {
        // take all of the data from the articles db and wham that shit into selectedArticleData
        // this article is disabled, do nothing
        aic.selectedArticleData.type = Array.isArray(aic.lang.articles[article].text) ? 'text' : 'url';

        if (aic.selectedArticleData.type === 'text') {
          // clear previous article's content, if any
          aic.selectedArticleData.content = []; // set the Last Revised date

          aic.selectedArticleData.time = new Date(aic.lang.articles[article].revised);

          if (aic.selectedArticleData.time.toDateString() === new Date().toDateString()) {
            // if the date is today
            aic.selectedArticleData.time = aic.dateDiff(new Date(Date.now()), aic.selectedArticleData.time) + aic.lang.articleRevisedAgo;
          } else {
            aic.selectedArticleData.time = aic.selectedArticleData.time.toLocaleDateString(aic.lang.language, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
          } // add each line of content to the article


          i = 0;

          while (i < aic.lang.articles[article].text.length) {
            aic.selectedArticleData.content.push(aic.lang.articles[article].text[i].format());
            i++;
          }
        } else {
          // TODO: create redirection page
          aic.selectedArticleData.content = aic.lang.defaultArticle;
        }

        aic.selectedArticle = article;
      }

      return null;
    }; // Called when the user submits text via the terminal
    // Effectively terminalLoop() except it always shows the input


    aic.processTerminalInput = function () {
      var error, m, phrases;

      if (aic.terminalInput.length > 0) {
        writeDialogue('terminal', [0, 0, aic.terminalInput], 'input');
        phrases = aic.terminalInput.split(aic.lang.commands.separator);

        try {
          // Add the used command to a list of previous commands
          aic.commandsUsed.unshift(phrases.join(aic.lang.commands.separator));

          switch (true) {
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
              writeDialogue('terminal', speech.misc.terminal.help);
              break;

            case aic.lang.commands.wipe.includes(phrases[0].toLowerCase()):
              // WIPE
              if (aic.wipeTimer) {
                if (typeof phrases[1] === 'string') {
                  if (phrases[1].toLowerCase() === 'confirm') {
                    // TODO reset everything then refresh
                    // same function that will be called at the end of the game
                    writeDialogue('terminal', ["I haven\'t implemented wipe yet"]);
                  }
                }

                console.log('wiping');
              } else {
                writeDialogue('terminal', speech.misc.terminal.wipeSure);
                aic.wipeTimer = true;
                $timeout(function () {
                  aic.wipeTimer = false;
                  return null;
                }, 60000);
              }

              break;

            case aic.lang.commands.cheat.includes(phrases[0].toLowerCase()):
              // CHEAT
              if (typeof phrases[1] === 'string') {
                switch (phrases[1].toLowerCase()) {
                  case aic.lang.commands.cheats.impatient:
                    aic.cheats.impatientMode = !aic.cheats.impatientMode;
                    writeDialogue('terminal', speech.misc.terminal.cheatSuccess);
                    break;

                  case aic.lang.commands.cheats.shut:
                    aic.preload = true;
                    writeDialogue('terminal', speech.misc.terminal.cheatSuccess);
                    break;

                  case aic.lang.commands.cheats.print:
                    m = eval(phrases[2]);
                    console.log(m);

                    switch (typeof m === "undefined" ? "undefined" : _typeof(m)) {
                      case 'number':
                        m = m.toString();
                        writeDialogue('terminal', [0, 0, phrases[2] + ": " + m]);
                        break;

                      case 'string':
                        writeDialogue('terminal', [0, 0, phrases[2] + ": " + m]);
                        break;

                      default:
                        writeDialogue('terminal', speech.misc.terminal.printDone);
                    }

                    break;

                  case aic.lang.commands.cheats.skip:
                    if (aic.chatLog.breach.log.length === 0) {
                      writeDialogue('terminal', speech.misc.terminal.introSkipped);
                      aic.isSkipping.terminal = true;
                      breachLoop('INTRODUCTION', 'start');
                    } else {
                      writeDialogue('terminal', speech.misc.terminal.skipFailed);
                    }

                    break;

                  default:
                    throw new Error("Unknown cheat code: " + phrases[1]);
                }
              } else {
                writeDialogue('terminal', speech.misc.terminal.cheatWarn);
              }

              break;

            case aic.lang.commands.cheats.skip.includes(phrases[0].toLowerCase()):
              if (aic.chatLog.breach.log.length === 0) {
                writeDialogue('terminal', speech.misc.terminal.introSkipped, 'terminal', 'introSkipped');
                aic.isSkipping.terminal = ['breach', 'INTRODUCTION', 'startSkipped'];
                aic.blacklist.add('start');
              } else {
                writeDialogue('terminal', speech.misc.terminal.skipFailed);
              }

              break;

            default:
              throw new Error("Unknown command: " + phrases[0]);
          }
        } catch (error1) {
          error = error1; // TODO add to terminal conversation

          console.error(error.message);
          error.name = '';
          writeDialogue('terminal', [0, 0.3, "e:" + error.message]);
        }

        aic.terminalInput = '';
      }

      return null;
    }; // When the user presses UP in the terminal, give them the last command that they used


    commandsUsedIterator = -1;

    aic.previousCommand = function (event) {
      if (event.key === 'ArrowUp' || event.keyCode === 38 || event.which === 38) {
        // Iterate through the previous commands to check which one to give them
        if (commandsUsedIterator < aic.commandsUsed.length - 1) {
          commandsUsedIterator++;
        }

        if (aic.terminalInput !== aic.commandsUsed[commandsUsedIterator]) {
          aic.terminalInput = aic.commandsUsed[commandsUsedIterator];
        }
      } else if (event.key === 'ArrowDown' || event.keyCode === 40 || event.which === 40) {
        if (commandsUsedIterator > 0) {
          commandsUsedIterator--;
        }

        if (aic.terminalInput !== aic.commandsUsed[commandsUsedIterator]) {
          aic.terminalInput = aic.commandsUsed[commandsUsedIterator];
        }
      } else {
        // If it wasn't UP or DOWN, clear the iterator
        commandsUsedIterator = -1;
      }

      return null;
    }; // hover/unhover rooms - had to use jQuery for this and I despise it


    $('.sitemap').on('mouseenter', '.room', function () {
      var room;
      room = this.getAttribute('data-room-name');
      $scope.$apply(function () {
        aic.vars.hoveredRoom = room;
        return null;
      });
      aic.vars.doingRoom = true;
      return null;
    });
    $('.sitemap').on('mouseleave', '.room', function () {
      if (aic.vars.doingRoom) {
        $scope.$apply(function () {
          aic.vars.hoveredRoom = 'none';
          return null;
        });
        aic.vars.doingRoom = false;
      }

      return null;
    }); // make the bouncy effect on the article selectors persist when the mouse is moved off them too quickly

    $('.articles-list').on('mouseenter', '.article-selector', function () {
      var article; // this event only fires when the mouse is moved onto a selector.

      article = this.getAttribute('data-article');

      if (!Number.isInteger(aic.lang.articles[article].cantUnhoverUntil)) {
        $timeout.cancel(aic.lang.articles[article].cantUnhoverUntil);
      } // mark this selector as HOVERED


      $scope.$apply(function () {
        aic.lang.articles[article].hovered = true;
        return null;
      }); // set the time at which this article can be safely unhovered

      aic.lang.articles[article].cantUnhoverUntil = Date.now() + 675;
      return null;
    });
    $('.articles-list').on('mouseleave', '.article-selector', function () {
      var article, timeRemaining; // this event only fires when the mouse is moved off a selector.

      article = this.getAttribute('data-article'); // work out how much time is left before this article can be safely unhovered

      timeRemaining = aic.lang.articles[article].cantUnhoverUntil - Date.now();

      if (timeRemaining < 0) {
        // if we're out of time, mark as UNHOVERED, no questions asked
        $scope.$apply(function () {
          aic.lang.articles[article].hovered = false;
          return null;
        });
      } else {
        // if there's still time remaining, set a timer to mark it as UNHOVERED once the timer has expired
        aic.lang.articles[article].cantUnhoverUntil = $timeout(function () {
          aic.lang.articles[article].hovered = false;

          if (!Number.isInteger(aic.lang.articles[article].cantUnhoverUntil)) {
            aic.lang.articles[article].cantUnhoverUntil = void 0;
          }

          return null;
        }, timeRemaining, true);
      }

      $scope.$apply(function () {
        if (Date.now() - aic.lang.articles[article].hoveredAt > 675) {
          aic.lang.articles[article].hovered = false;
        }

        return null;
      });
      return null;
    }); // event handler for clicking rooms

    aic.selectRoom = function (room) {
      if (room === 'back') {} else {
        // minimise the map, display room info
        aic.vars.minimiseMap = true;
        $timeout(function () {
          aic.vars.selectedRoom = room;
          return null;
        }, aic.vars.selectedRoom === 'none' ? 1000 : 0, true);
      }

      return null;
    }; // modify room settings/options


    aic.adjustRoom = function () {}; // turn all the rooms off then on


    aic.rebootRooms = function () {
      _mainLoop('ROOMS', 'rebootRooms');

      return null;
    };
    /* PLOT FUNCTIONS */
    // event handler for option selection - effectively maitreyaLoop()


    aic.maitreyaLoop = function (conversation, option) {
      var delay; // takes the id of the selected option

      console.log("Maitreya - " + option.bigSection + " - " + option.id);
      delay = 0;

      switch (conversation) {
        case 'terminal':
          // this shouldn't happen
          _mainLoop(option.bigSection, option.id);

          break;
        // I guess?

        case 'breach':
          delay = writeDialogue(conversation, option.dialogue, 'maitreya', option.id);
          $timeout(function () {
            breachLoop(option.bigSection, option.id);
            return null;
          }, delay * 1000 + aic.maitreyaDelay * 1000);
          aic.vars.people[conversation].opinion += option.opinion;
          break;

        case 'alexandra':
          delay = writeDialogue(conversation, option.dialogue, 'maitreya', option.id);
          $timeout(function () {
            alexandraLoop(option.bigSection, option.id);
            return null;
          }, delay * 1000 + aic.maitreyaDelay * 1000);
          aic.vars.people[conversation].opinion += option.opinion;
          break;

        default:
          throw new Error("Conversation " + conversation + " does not exist");
      } // obviously we don't need the old options anymore


      aic.chatLog[conversation].options = []; // save to cookie?

      return null;
    };

    aic.Actor.prototype.move = function (destination, continuous) {
      var me, validRooms; // called when an actor moves from one room to another. they can only move to adjacent rooms

      me = this;

      if (destination === 'random') {
        validRooms = aic.rooms[me.location].connectedTo;
        destination = validRooms[Math.floor(Math.random() * validRooms.length)];
      }

      if (aic.rooms[me.location].connectedTo.includes(destination)) {
        me.location = destination;
      } else {
        // we're moving to an invalid room?
        throw new Error(me.name + " tried to move from " + me.location + " to " + destination);
      }

      return me.location;
    }; // alias functions so LoopService can access them


    aic.writeDialogue = writeDialogue;
    aic.presentOptions = presentOptions;
    aic.breachLoop = breachLoop;
    aic.alexandraLoop = alexandraLoop;
    aic.endingLoop = _endingLoop;
    aic.dynamicLoop = dynamicLoop;
    aic.preloadAlexandraFaces = preloadAlexandraFaces;

    aic.unlock = function (target) {
      if (aic.appList.includes(target)) {
        aic.ready[target] = true;
      } else if (aic.speakerList.includes(target)) {
        aic.ready[target] = true;
      } else if (target in aic.lang.articles) {
        aic.lang.articles.target.available = true;
      } else {
        throw new Error("Tried to unlock " + target + " which does not exist");
      }

      return null;
    };

    aic.lock = function (target) {
      if (aic.appList.includes(target)) {
        aic.ready[target] = false;
      } else if (aic.speakerList.includes(target)) {
        aic.ready[target] = false;
      } else if (target in aic.lang.articles) {
        aic.lang.articles.target.available = false;
      } else {
        throw new Error("Tried to lock " + target + " which does not exist");
      }

      return null;
    };

    aic.eval = eval;
    return null;
  };

  EncodeURIComponentFilter = function EncodeURIComponentFilter() {
    return window.encodeURIComponent;
  };

  maitreya = angular.module("maitreya", ['ngSanitize', 'ngAnimate']).controller("MaitreyaController", ['$scope', '$timeout', 'LoopService', '$sce', '$http', MaitreyaController]).filter("encode", [EncodeURIComponentFilter]);
  return null;
})(); // prototype functuon to turn kebab-case to camelCase


String.prototype.toCamelCase = function () {
  return this.toLowerCase().replace(/[^\w\s\-]/g, "").replace(/[^a-z0-9]/g, " ").replace(/^\s+|\s+$/g, "").replace(/\s(.)/g, function (match, group) {
    return group.toUpperCase();
  });
}; // prototype function to format dialogue strings from wikidot format to HTML


String.prototype.format = function () {
  // pass article argument only if this is an article
  return this.replace(/\|\|\|\|/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/\/\/(.*?)\/\//g, "<i>$1</i>").replace(/{{(.*?)}}/g, "<tt>$1</tt>").replace(/\^\^(.*?)\^\^/g, "<sup>$1</sup>").replace(/\?\?(.*?)\?\?/g, "<span dynamic class=\'statement false\' data-bool=\'TRUE\'>$1</span>").replace(/!!(.*?)!!/g, "<span class=\'statement true\' data-bool=\'FALSE\'>$1</span>").replace(/^-{3,}$/g, "<hr>").replace(/--/g, "—").replace(/^=\s(.*)$/g, "<div style=\'text-align: center;\'>$1</div>").replace(/(^|>)\!\s([^<]*)/g, "$1<div class=\'fake-title\'>$2</div>").replace(/(^|>)\+{3}\s([^<]*)/g, "$1<h3>$2</h3>").replace(/(^|>)\+{2}\s([^<]*)/g, "$1<h2>$2</h2>").replace(/(^|>)\+{1}\s([^<]*)/g, "$1<h1>$2</h1>").replace(/^\[\[IMAGE\]\]\s([^\s]*)\s(.*)$/g, "<div class=\'scp-image-block block-right\'><img src=\'$1\'><div class=\'scp-image-caption\'><p>$2</p></div></div>").replace(/\[{3}(.*?)\|(.*?)\]{3}/, function (match, article, text) {
    // please ready your butts for the single worst line of code I have ever written
    angular.element(document.documentElement).scope().aic.lang.articles[article].available = true;
    return "<span class='article-link'>" + text + "</span>";
  });
}; //#endregion