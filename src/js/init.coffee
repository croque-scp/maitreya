aic_init = (aic) ->
  console.log "Initialising variables"

  # The following variables can be modified for testing, but must be reset

  aic.preload = false # MUST BE TRUE
  aic.selectedApp = 'terminal' # MUST BE TERMINAL
  aic.selectedSpeaker = 'breach' # MUST BE BREACH
  aic.selectedArticle = 'menu' # MUST BE MENU
  aic.selectedOperation = 'menu' # MUST BE MENU
  aic.ready =
    terminal: true # MUST BE TRUE
    breach: true # MUST BE FALSE
    messages: true # MUST BE FALSE
    alexandra: true # MUST BE FALSE
    dclass: false # MUST BE FALSE
    database: false # MUST BE FALSE
    run: false # MUST BE FALSE
    ending: false # MUST BE FALSE
  aic.cheats =
    impatientMode: true # MUST BE FALSE
    beingSkipped: false # MUST BE FALSE

  # The following variables can be changed to make adjustments

  aic.typingDelay = 0.3
  aic.typingSpeed = 0.04 # seconds per letter
  aic.maitreyaDelay = 0.5 # how long it takes people to respond to maitreya
  aic.endingPositions =
    example: 0
    pissOff: 1

  # The following variables will be preserved on save/load

  aic.vars =
    breachExplainedVoice: false
    breachExplainedTyping: false
    waitingForRead4000: false
    alexCanRebel: false
    terminalEmphasis: false
    messagesEmphasis: false
    breachEntryMode: 'default'
    lastSpeaker: 'breach'
    endingFractionText: "placeholder"
    hoveredRoom: 'none'
    selectedRoom: 'none'
    doingRoom: false
    minimiseMap: false
    shuttingDown: false
    availableRooms: [1, 2, 3, 4, 5, 6]
  aic.vars.people =
    breach: new aic.Actor(["Ethan", "Breach" ], {
      id: 'breach'
      status: 'ok'
      allegiance: 'scp'
      type: 'dr'
    }, 'a1')
    alexandra: new aic.Actor("Alexandra.aic", {
      id: 'alexandra'
      status: 'ok'
      allegiance: 'scp'
      type: 'aic'
    }, 'server')
    maitreya: new aic.Actor("Maitreya.aic", {
      id: 'maitreya'
      status: 'ok'
      allegiance: 'scp'
      type: 'aic'
    }, 'server')
    scp4000: new aic.Actor("SCP-4000", {
      id: 'scp4000'
      status: 'ok'
      allegiance: '4000'
      type: 'scp'
    }, 'containment')
    d95951: new aic.Actor(["Johanne", "Fughes"], {
      id: 'd95951'
      status: 'ok'
      allegiance: 'scp'
      type: 'd'
    }, aic.assignRoom())
    d68134: new aic.Actor(["Stuart", "Cruise"], {
      id: 'd68134'
      status: 'ok'
      allegiance: 'scp'
      type: 'd'
    }, aic.assignRoom())
    d1602: new aic.Actor(["Marianne", "Kettle"], {
      id: 'd1602'
      status: 'ok'
      allegiance: 'scp'
      type: 'd'
    }, aic.assignRoom())

  # The following variables should never be changed

  aic.wipeTimer = false # timer for hard wiping
  aic.timeOutList =
    terminal: []
    breach: []
    alexandra: []
  aic.commandsUsed = []
  currentlyPushing = # this isn't even used?
    breach: false
    alexandra: false
  aic.currentEnding = 0
  aic.isSpeaking =
    terminal: false
    breach: false
    alexandra: false
  aic.isProcessing =
    terminal: false
    breach: false
    alexandra: false
  aic.isSkipping =
    terminal: false
    breach: false
    messages: false
    alexandra: false
    dclass: false
  aic.notifications =
    terminal: 0
    breach: 0
    alexandra: 0
    database: 0
    run: 0
  aic.timers = {} # holds special timers for events and the like
  aic.selectedArticleData =
    type: 'url or text'
    content: []
  aic.rooms =
    hangar:
      error: false
      log: []
      connectedTo: ['serverCorridor']
    server:
      error: true
      log: []
      connectedTo: ['serverCorridor']
    serverCorridor:
      error: true
      log: []
      connectedTo: ['hangar','server','pantry','ringWest']
    d1:
      error: false
      log: []
      connectedTo: ['dCorridor']
    d4:
      error: false
      log: []
      connectedTo: ['dCorridor']
    d2:
      error: false
      log: []
      connectedTo: ['dCorridor']
    dCorridor:
      error: false
      log: []
      connectedTo: ['d1','d2','d3','d4','d5','d6','ringWest']
    d5:
      error: false
      log: []
      connectedTo: ['dCorridor']
    d3:
      error: false
      log: []
      connectedTo: ['dCorridor']
    d6:
      error: false
      log: []
      connectedTo: ['dCorridor']
    armoury:
      error: false
      log: []
      connectedTo: ['armouryCorridor']
    pantry:
      error: false
      log: []
      connectedTo: ['cafe','serverCorridor']
    cafe:
      error: false
      log: []
      connectedTo: ['pantry','ringNorth']
    ringWest:
      error: true
      log: []
      connectedTo: ['airlock','ringSouth','armouryCorridor','serverCorridor','ringNorth','dCorridor']
    armouryCorridor:
      error: false
      log: []
      connectedTo: ['armoury','storage','toilet','ringWest']
    a1:
      error: false
      log: []
      connectedTo: ['officeCorridor']
    airlock:
      error: true
      log: []
      connectedTo: ['containment','ringWest']
    ringNorth:
      error: false
      log: []
      connectedTo: ['cafe','ringWest','ringEast','officeCorridor']
    ringSouth:
      error: false
      log: []
      connectedTo: ['storage','ringEast','ringWest']
    toilet:
      error: true
      log: []
      connectedTo: ['armouryCorridor']
    storage:
      error: false
      log: []
      connectedTo: ['bay','ringSouth','armouryCorridor']
    officeCorridor:
      error: false
      log: []
      conectedTo: ['a1','a2','a3','a4','ringNorth']
    containment:
      error: true
      log: []
      connectedTo: ['airlock']
    a2:
      error: false
      log: []
      connectedTo: ['officeCorridor']
    a3:
      error: false
      log: []
      connectedTo: ['officeCorridor']
    a4:
      error: false
      log: []
      connectedTo: ['officeCorridor']
    ringEast:
      error: false
      log: []
      connectedTo: ['foyer','ringSouth','ringNorth']
    foyer:
      error: false
      log: []
      connectedTo: ['bay','ringEast']
    bay:
      error: false
      log: []
      connectedTo: ['storage','foyer']
  # logs must be added to this in reverse order
  aic.chatLog =
    example:
      log: [{
        speaker: ''
        cssClass: ''
        text: ""
      } ]
      options: [{
        id: ''
        optionType: ''
        text: ""
        dialogue: []
        bigSection: ''
      } ]
    terminal:
      log: []
      options: []
    breach:
      log: []
      options: []
    alexandra:
      log: []
      options: []
  aic.terminalInput = ""
  aic.searchInput = ""
  aic.blacklist = []
  aic.blacklist.add = (smallSection) ->
    # accepts either one smallSection or an array of multiple
    if typeof smallSection == 'string'
      smallSection = [smallSection]
    for section in smallSection
      if section in aic.blacklist
        console.log "Attempted to blacklist #{section}, but it was already blacklisted"
      else
        console.log "Blacklisting #{section} (via LoopService)"
        aic.blacklist.push section
    return null
  aic.blacklist.remove = (smallSection) ->
    # accepts either one smallSection or an array of multiple
    if typeof smallSection == 'string'
      smallSection = [smallSection]
    for section in smallSection
      index = aic.blacklist.indexOf(section)
      if index > -1
        aic.blacklist.splice index, 1
        console.log "Removed #{section} from blacklist"
      else
        console.log "Tried to remove #{section} from blacklist but it was not present"
    return null
  # list of conversation IDs that must be ignored
  aic.currentDialogue = []
  # list of conversation IDs that are currently being spoken / are queued to be spoken TODO
  aic.appList = ['terminal','messages','database','run','ending']
  aic.speakerList = ['breach','alexandra']
  aic.operationList = ['menu','d','drone','map']
  aic.alexandraEmotionList = ['smiling','concerned','grinning','shocked','pensive','satisfied','celebrating','frustrated','vindictive','stressed','gritted','disgusted','angry','pissed']
  console.log "Done initialising variables"
  return aic
