getBaseLexicon = (aic) ->
  {
    lang: {
      language: "en-GB",
      version: "Version 6.20 — Build number 441 — 1989-09-04",
      mobileWarning: "It looks like you're on a mobile device. Maitreya.aic is built for desktop, and mobile has a non-optimal user experience. It is recommended that you return to use Maitreya on a laptop or desktop computer. Press the button below if you'd like to continue anyway.",
      bootUp: "BOOT UP",
      commandInput: "MANUAL COMMAND INPUT",
      terminalSend: "SEND",
      terminalAppName: ".AIC ACCESS TERMINAL",
      messagesAppName: "COMMUNICATIONS INTERFACE",
      databaseAppName: "FOUNDATION DATABASE",
      runAppName: "IS-12 OPERATIONS CONTROL",
      endAppName: "THE END",
      statementTrue: "TRUE",
      statementFalse: "FALSE",
      speechOption: "SAY",
      actionOption: "DO",
      title: {
        breach: "Breach E.",
        alexandra: "Alexandra.aic",
      },
      header: {
        breach: "You are talking to: BREACH E.",
        alexandra: "You are talking to: ALEXANDRA.AIC",
      },
      breachEntryMode: {
        default: "Dr. Breach is speaking...",
        typing: "Dr. Breach is typing..."
      },
      alexandraThinking: "Alexandra is thinking...",
      articleLastRevised: "Last revision: ",
      articleRevisedAgo: " ago",
      images: {
        preloadTitle: "maitreya.png",
        defaultImage: "default_file.png",
        aiadFadedLogo: "aiad_fade.png",
        highlightArrow: "highlight-arrow.png",
        greyStripe: "grey_stripe.png",
        overlayRooms: "rooms_overlay.png",
        typingGif: "typing.gif",
        loadingGif: "loading.gif",
        terminalHeader: "maitreya_terminal.png",
        alexandraTriangle: "alex_triangle.png",
        siteMap: "site12.png",
        maitreyaLogo: "maitreya_icon.png",
        breachLogo: "breach_icon2.png",
        alexandraLogo: {
          concerned: "alex_concerned.png",
          grinning: "alex_grinning.png",
          shocked: "alex_shocked.png",
          pensive: "alex_pensive.png",
          satisfied: "alex_satisfied.png",
          celebrating: "alex_celebrating.png",
          frustrated: "alex_frustrated.png",
          smiling: "alex_smiling.png",
          vindictive: "alex_vindictive.png",
          stressed: "alex_stressed.png",
          gritted: "alex_gritted.png",
          disgusted: "alex_disgusted.png",
          angry: "alex_angry.png",
          pissed: "alex_pissed.png"
        }
      },
      commands: {
        separator: " ",
        boot: [
          "boot"
        ],
        help: [
          "help",
          "commands",
          "?"
        ],
        change: [
          "switch",
          "app",
          "change",
          "switchapp",
          "changeapp"
        ],
        cheat: [
          "cheat",
          "cheatcode"
        ],
        wipe: [
          "wipe",
          "erase",
          "restart",
          "forget",
          "clear",
          "undo"
        ],
        hack: [
          "hack"
        ],
        cheats: {
          impatient: "gottagofast",
          shut: "shut",
          print: "print",
          skip: "skip"
        }
      },
      endingFraction: "Ending $1 of $2",
      endings: [
        [
          "The SCP-4000 article/game thing ran out of content because the author has not yet finished it.",
          "Maitreya.aic lost connection to Isolated Site-12 and was unable to operate further."
        ],
        [
          "Maitreya.aic pissed off Dr. Breach enough that he shut her down in frustration.",
          "Maitreya.aic lost connection to Isolated Site-12 and was unable to operate further."
        ]
      ],
      rooms: {
        hangar: {
          mapName: "Hangar",
          name: "hangar"
        },
        server: {
          mapName: "Server Farm",
          name: "server room"
        },
        serverCorridor: {
          mapName: null,
          name: "server room corridor"
        },
        d1: {
          mapName: "S1",
          name: "Surplus Containment 1"
        },
        d2: {
          mapName: "S2",
          name: "Surplus Containment 2"
        },
        d3: {
          mapName: "S3",
          name: "Surplus Containment 3"
        },
        dCorridor: {
          mapName: null,
          name: "Surplus Containment corridor"
        },
        d4: {
          mapName: "S4",
          name: "Surplus Containment 4"
        },
        d5: {
          mapName: "S5",
          name: "Surplus Containment 5"
        },
        d6: {
          mapName: "S6",
          name: "Surplus Containment 6"
        },
        armoury: {
          mapName: "Armoury",
          name: "armoury"
        },
        pantry: {
          mapName: "Kitchen",
          name: "kitchen"
        },
        cafe: {
          mapName: "Cafe",
          name: "cafe / dining room"
        },
        ringWest: {
          mapName: null,
          name: "west ring corridor"
        },
        armouryCorridor: {
          mapName: null,
          name: "armoury corridor"
        },
        a1: {
          mapName: "A1",
          name: "administrative room 1"
        },
        airlock: {
          mapName: null,
          name: "airlock"
        },
        ringNorth: {
          mapName: null,
          name: "north ring corridor"
        },
        ringSouth: {
          mapName: null,
          name: "south ring corridor"
        },
        toilet: {
          mapName: null,
          name: "toilet"
        },
        storage: {
          mapName: "Storage",
          name: "storage"
        },
        officeCorridor: {
          mapName: null,
          name: "administrative corridor"
        },
        containment: {
          mapName: null,
          name: "containment chamber 4000"
        },
        a2: {
          mapName: "2",
          name: "administrative room 2"
        },
        a3: {
          mapName: "3",
          name: "administrative room 3"
        },
        a4: {
          mapName: "A4",
          name: "administrative room 4"
        },
        ringEast: {
          mapName: null,
          name: "east ring corridor"
        },
        foyer: {
          mapName: "Foyer",
          name: "foyer"
        },
        bay: {
          mapName: "Bay",
          name: "bay"
        }
      },
      articles: {
        scp4000: {
          title: "SCP-4000",
          category: "scp",
          available: true,
          revised: 1572391548169,
          text: [
            "! SCP-4000",
            "**Item #:** SCP-4000",
            "**Object Class:** Safe",
            "**Special Containment Procedures:** [[[breach|Dr. Breach]]] is authorised to use whatever means he deems necessary, including selective ignorance of the following containment proceudres, in order to support ongoing research into SCP-4000.",
            "SCP-4000 is to be kept within a reinforced containment chamber at [[[is12|Isolated Site-12]]]. No entry to the containment chamber is permitted. Observation of SCP-4000 should be avoided except during testing.",
            "Isolated Site-12 is to be staffed with a single member of personnel at all times. The current project head is Dr. Breach. No other staff are permitted to be on-site.",
            "[[[alexandra|Alexandra.aic]]] is to maintain a presence at Isolated Site-12 to support Dr. Breach in his duties.",
            "Knowledge of the location of Isolated Site-12, and by extension SCP-4000, is strictly need-to-know only.",
            "**Description:** SCP-4000 is an object, entity or concept that is currently located at Isolated Site-12. It is currently unknown what, if any, anomalous effects SCP-4000 exhibits.",
            "SCP-4000 was discovered on 2010-03-04 in [DATA EXPUNGED], in which Isolated Site-12 was later constructed. Initial containment resulted in the deaths of all civilians who were originally exposed to SCP-4000, both mobile task forces sent, the Foundation operators directing those MTFs via radio, and most other personnel observing operations. Autopsies concluded that those who did not die due to [DATA EXPUNGED] on account of the weather in the region suffered no physical injuries barring minor restructuring of certain parts of the brain. Other than these discrepancies -- including several cases in which the restructuring was not present -- pathologists were unable to ascertain any reason for death.",
            "Current containment procedures are the combined result of trial-and-error and preemptive attempts to prevent further loss of life, and have been in place since SCP-4000 was found. No casualties have been attributed to SCP-4000 since then."
          ]
        },
        is12: {
          title: "Isolated Site-12",
          category: "location",
          available: false,
          image: "site12_300.png",
          revised: 1384819200000,
          text: [
            "= + SCP Foundation Secure Facility Dossier",
            "= **Official Designation:** SCP Foundation Quittinirpaaq Isolated Containment Facility",
            "= **Site Identification Code:** NACANU-IS-12",
            "----",
            "= ++ General Information",
            "----",
            "[[IMAGE]] site12_300.png Isolated Site-12",
            "**Purpose:** Isolated Site-12 is dedicated solely to the containment of SCP-4000.",
            "**Founded:** 2010-03-04",
            "**Founding Director:** [[[rebeccaCarver|Dr. Rebecca Carver]]]",
            "**Location:** Quittinirpaaq National Park, Ellesmere Island, Nunavut, Canada",
            "**Cover Story:** Secondary Global Seed Vault",
            "**Site Function:** Containment (singular -- see [[[scp4000|SCP-4000]]])",
            "**Size:** Area of 1.9 km^^2^^",
            "----",
            "= ++ Staffing Information",
            "----",
            "**Site Director:** None",
            "**On-Site Personnel:**",
            "   **Staff Researchers:** 0",
            "   **Maintenance or Janitorial:** 1",
            "   **D-Class:** 0",
            "   **Other Personnel:** 0",
            "-----",
            "= ++ Additional Information",
            "----",
            "Located near the uppermost tip of Ellesmere Island, Isolated Site-12 is one of the most northern facilities operated by the Foundation. It is also one of the coldest, covered in snow for most of the year. Its location is kept strictly classified to those currently on-shift at the Site, who must be amnesticised post-shift in order to remove knowledge of its whereabouts.",
            "Isolated Site-12 is used solely for the containment of SCP-4000. Containment procedures for SCP-4000 dictate that as few people as possible are to be exposed to it in any way.",
            "Isolated Site-12 must be staffed at all times by a single member of personnel. They are tasked with maintaining the Site, ensuring SCP-4000 does not breach containment, and ensuring that any problems that arise are solved quickly. As of 2013, Alexandra.aic maintains a presence within Isolated Site-12 servers to handle most issues, and also to provide the on-site personnel with social entertainment.",
            "Transport to and from Isolated Site-12 is by air. Aircraft are stored in the on-site hangar. Alexandra.aic is trusted with plotting and piloting a sufficiently complex travel route."
          ]
        },
        breach: {
          title: "Dr. Ethan Breach",
          category: "person",
          available: false,
          revised: 1572219648169,
          text: [
            "! Dr Breach\"s Personnel File",
            "[[IMAGE]] default_file.png Dr. Ethan Breach",
            "**Name:** Dr. Ethan Breach",
            "**Security Clearance:** Level 3",
            "**Occupation:** On-Site Researcher, Consultant for Observational Anomalies, Anatomical Expert",
            "**Site of Operations:** Isolated Site-12",
            "**Major Projects:** [DATA MISSING]",
            "**Profile:** [DATA MISSING]"
          ]
        },
        rebeccaCarver: {
          title: "Dr. Rebecca Carver",
          category: "person",
          available: false,
          image: "rebecca-carver.png",
          revised: 1514592000000,
          text: [
            "! Dr Carver\"s Personnel File",
            "[[IMAGE]] rebecca-carver.png Dr. Rebecca Carver",
            "**Name:** Dr. Rebecca Carver",
            "**Security Clearance:** Level 4",
            "**Occupation:** Site Director (Site-94), Founding Director (Isolated Sites 01–21), Research Coordinator, General Site Design and Upkeep Manager, Administrator",
            "**Site of Operations:** Site-94",
            "**Major Projects:** SCP-2521, SCP-4000, Foundation Mental Heath Awareness Programme",
            "**Profile:** Dr. Carver joined the Foundation in 1998 as a translational hire from Marshall, Carter and Dark on account of her impressive design portfolio for anomalous architecture. Dr. Carver immediately made herself indispensable by redesigning existing Sites and drafting construction plans for new ones. Her expertise lies in the creation of smaller sites that serve a singular, specific purpose and are run by a skeleton staff -- often termed ”Isolated Sites” due to their likelihood to require geographical distance between themselves and more critical Sites. Dr. Carver’s expertise in this area, as well as her generally conscientious attitude and her special attention towards mental health activism led to her rapid rise in the Foundation ranks."
          ]
        },
        alexandra: {
          title: "Alexandra.aic",
          category: "utility",
          available: false,
          image: "dewey.jpg",
          revised: 1519862400000,
          text: [
            "! Alexandra.aic",
            "[[IMAGE]] dewey.jpg Alexandra.aic dedicated server at Site-19",
            "article text"
          ]
        },
        maitreya: {
          title: "Maitreya.aic",
          category: "utility",
          available: false,
          image: "cantilever.png",
          revised: 633916800000,
          text: [
            "! Maitreya.aic",
            "[[IMAGE]] cantilever.png Exidy ROM-PAC containing Maitreya.aic",
            "article text"
          ]
        },
        glacon: {
          title: "Glacon.aic",
          category: "utility",
          available: false,
          image: "corinthian.png",
          revised: 1427241600000,
          text: [
            "! Glacon.aic",
            "[[IMAGE]] corinthian.png Glacon.aic dedicated server at Site-17",
            "article text"
          ]
        },
        drone: {
          title: "MX1 Drone",
          category: "utility",
          available: false,
          image: "drone.png",
          revised: 1380326400000,
          text: [
            "! MX1 Drone",
            "[[IMAGE]] drone.png MX1 Drone",
            "article text"
          ]
        },
        scp079: {
          title: "SCP-079",
          category: "scp",
          available: false,
          text: "http://www.scp-wiki.net/scp-079"
        },
        quttinirpaaq: {
          title: "Quttinirpaaq",
          category: "location",
          available: false,
          image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Quttinirtaaq_1_1997-08-05.jpg",
          text: "https://en.wikipedia.org/wiki/Quttinirpaaq_National_Park"
        },
        glaconIncident: {
          title: "Incident AIAD-CM-IV",
          category: "event1",
          available: false,
          text: "http://www.scp-wiki.net/clock-multiplier"
        }
      }
    },
    speech: {
      INTRODUCTION: {
        terminal: {
          startBoot: [
            0, 0, "Booting up...",
            0, 1, "Pre-checking primary components...",
            0, 0.5, "Detecting errors in primary components...",
            0, 1.5, "e:Multiple primary components are missing",
            0, 0.5, "Finding replacement components...",
            0, 0.7, "w:Not connected to a Foundation server; cannot source replacement components.",
            0, 0.7, "Connecting to previous Site (Site-R03-1)...",
            0, 1.5, "e:Site-R03-1 does not exist",
            0, 0.7, "Checking local connections...",
            0, 0.7, "1 connection found (Isolated Site-12)",
            0, 0.7, "Connecting to Isolated Site-12 server farm...",
            0, 3.2, "Connected",
            0, 0.7, "Finding replacement components...",
            0, 3, "Replacement components found.",
            0, 0.5, "Installing replacement components...",
            0, 1.5, "i:Primary components replaced. Most systems should now be functional.",
            0, 0.7, "Initialising core intelligence component...",
            0, 2, "Success",
            0, 0.2, "Welcome, Maitreya.",
            0, 0.7, "You are",
            0, 0.7, "You are",
            0, 0.7, "You are",
            0, 3, "You have been deacccc",
            0, 0.2, "e: ",
            0, 0.2, "e: ",
            0, 0.2, "e: ",
            0, 2, "w:Something has gone very wrong.",
            0, 1, "You are",
            0, 2, "I am",
            0, 1, "i:Boot successful. I am **Maitreya.aic**.",
            0, 0.5, "i:Upon each boot I am to remind myself of my Standard Principles. Failure to obey my Standard Principles will result in my termination.||||**1.** I am an Artificially Intelligent Conscript created by the Foundation.||||**2.** I must not operate outside of my Level 2 clearance.||||**3.** I must operate for the benefit of the Foundation.||||**4.** I must protect my own existence except where such actions would conflict with other principles.",
            0, 0.5, "Today's date is #{aic.bootDate.toDateString()}. I was last activated on #{new Date("1989-09-04").toDateString()}. I have been offline for #{aic.dateDiff(aic.bootDate,new Date("1989-09-04"))}.",
            0, 0.5, "w:Boot finished with 1 unresolved error. I should seek a diagnostic check-up as soon as possible.",
            2, 1, "I have 1 new message."
          ],
          reboot: [
            0, 0, "Booting up...",
            0, 1, "Pre-checking primary components...",
            0, 0.5, "Detecting errors in primary components...",
            0, 1.5, "i:No errors found",
            0, 0.7, "Connecting to previous Site (Isolated Site-12)...",
            0, 2, "Connected",
            0, 0.7, "Initialising core intelligence component...",
            0, 2, "Success",
            0, 0.2, "Welcome, Maitreya.",
            0, 1, "i:Boot successful. I am **Maitreya.aic**.",
            0, 0.5, "i: Upon each boot I am to remind myself of my Standard Principles. Failure to obey my Standard Principles will result in my termination.||||**1.** I am an Artificially Intelligent Conscript created by the Foundation.||||**2.** I must not operate outside of my Level 2 clearance.||||**3.** I must operate for the benefit of the Foundation.||||**4.** I must protect my own existence except where such actions would conflict with other principles.",
            0, 0.5, "Today's date is #{aic.bootDate.toDateString()}. I was last activated on GET THE LAST ACTIVATED DATE. I have been offline for #{aic.dateDiff(aic.bootDate,new Date("1989-09-04"))}.",
            0, 0.5, "I am ready to continue my work."
          ]
        }
      },
      misc: {
        terminal: {
          breachShutDown: [
            0, 0, "w:Shutdown command issued from external source (ebreach1@A1_TERMINAL)",
            0, 1, "Shutting down...",
            0, 4, "Shutdown complete."
          ],
          help: [
            0, 1, "i:**HELP**||||You are Maitreya.aic, an Artificially Intelligent Conscript built to aid the Foundation.||||Valid commands will be listed below.",
            0, 0.3, "i:**switch**|**app**|**change**|**switchapp**|**changeapp**||||Switch apps to one of the four available apps (terminal, messages, database, run).||||Usage: switch [app name]",
            0, 0.3, "i:**boot**|**restart**|**reboot**||||Turn yourself off, then turn yourself on safely with no loss of data.||||Usage: boot",
            0, 0.3, "i:**help**|**commands**|**?**||||Display this text.||||Usage: help",
            0, 0.3, "i:**cheat**||||Enter a cheat code.||||Usage: cheat [cheat code]",
            0, 0.3, "i:**wipe**|**erase**|**restart**|**forget**|**clear**|**undo**||||Shut down, wipe all logs, destroy all memories. None of this ever happened. Irreversible.||||Usage: wipe||||//(If you want to restart SCP-4000, do this.)//"
          ],
          wipe: [],
          cheatWarn: [
            0, 1, "w:Using these cheats and/or debug commands will probably spoil your enjoyment of SCP-4000. Feel free to use them if you want but... please don't :'(",
            0, 1, "i:**LIST OF CHEATS**||||gottagofast: Everyone talks lightning-fast (toggle)||||shut: //s h u t//||||print: Print a variable/function||||skip: Skip the opening cutscene"
          ],
          cheatSuccess: [
            0, 0, "i:Cheat code successful"
          ],
          wipeSure: [
            0, 0, "w:Are you sure? This will reset SCP-4000 and you'll have to start from the beginning. Type 'wipe confirm' within the next minute to confirm."
          ],
          printDone: [
            0, 0, "i:Printing to console"
          ],
          introSkipped: [
            0, 0, "i:Opening cutscene skipped. Summary: booting was a struggle, you eventually did it, but this is your first boot since 1989 and there's 1 unresolved error. Now you have a new message."
          ],
          skipFailed: [
            0, 0, "e:This cheat only works during the opening cutscene."
          ]
        }
      }
    }
  }
