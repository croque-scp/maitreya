/**
 * An interaction is a single back-and-forth between a character and the player.
 *
 * TODO Interactions that do not involve the player.
 */

/**
 * A generic identifier.
 *
 * Is an array of strings which represent an object accessor e.g. the value
 * ["a", "b"] represents obj["a"]["b"]. This identifier will be used to
 * access values from the persistent variable storage and for accessing
 * nested interactions.
 *
 * Validation of these identifiers will be performed by the editor.
 */
type Identifier = string[]

/**
 * A unique identifier for a given interaction, which will be referred to by
 * e.g. options that initiate this interaction when selected.
 */
type InteractionId = Identifier

/**
 * An identifier that points to a string value in the persistent variables.
 */
type ValueId = Identifier

/**
 * An identifier that points to a boolean flag in the persistent variables.
 */
type FlagId = Identifier

/**
 * An identifier that points to a numeric counter in the persistent variables.
 */
type CounterId = Identifier

/**
 * Character identifiers. Sets who the message is coming from.
 */
type Speaker = "breach" | "maitreya"

/**
 * A single line of a message with manual timing control.
 */
type Message = {
  text: string
  delay?: number
  duration?: number
  durationMultiplier?: number
} & StyledMessage

/**
 * A batch of messages. Each message may either be of type Message if it
 * needs special timing, or a string if the event's default timing is
 * acceptable.
 */
type MessageGroup = {
  messages: (string | Message)[]
  speaker?: Speaker
  displayIf?: Condition[]
  onDisplay?: Action[]
} & StyledMessage

type StyledMessage = {
  mode?: "spoken" | "typed"
  class?: string[]
}

/**
 * An option that appears and will be presented to the player when the
 * interaction is finished.
 *
 * If only one option would be presented AND its text is false, the option's
 * target interaction happens immediately without any input from the player.
 *
 * Otherwise, if an option's text is false, it is not presented, regardless
 * of its displayIf property.
 */
type Option = {
  text: string | false
  targetInteraction?: InteractionId
  displayIf?: Condition[]
  onSelect?: Action[]
  messages?: Message[]
}

/**
 * A condition to be evaluated before something happens.
 *
 * Each condition contains several keys; if multiple keys are set on a
 * single condition, they are combined with OR. If multiple conditions are
 * passed to a single check, they are combined with AND.
 */
type Condition = {
  assertFlag?: FlagId
  assertNotFlag?: FlagId
  assertCounterMoreThan?: [CounterId, number]
  assertCounterLessThan?: [CounterId, number]
  assertCounterEqualTo?: [CounterId, number]
  assertValueIs?: [ValueId, string]
  assertValueIsNot?: [ValueId, string]
}

type Action = {
  executeIf?: Condition[]
  executeAfter?: Delay
  toggleFlag?: FlagId
  setFlagTo?: [FlagId, true | false]
  incrementCounter?: CounterId
  decrementCounter?: CounterId
  increaseCounterBy?: [CounterId, number]
  decreaseCounterBy?: [CounterId, number]
  setCounterTo?: [CounterId, number]
  setValueTo?: [ValueId, string]
}

/**
 * A delay after which to execute an action.
 *
 * @property time - Whether to wait in 'human' time i.e. following the
 * in-game clock and the flow of time as experienced by human characters, or
 * in 'bot' time i.e. following the real-world clock and the flow of time as
 * experienced by AI characters.
 */
type Delay = {
  seconds: number
  time: "human" | "bot"
}

/**
 * A single interaction containing messages and subsequent options to display.
 *
 * @property onStart - An action to be executed before any messages are shown.
 * @property onEnd - An action to be executed after the options are shown.
 * @property onMessagesEnd - An action to be executed after the messages are
 * shown but before the options are shown.
 */
export type Interaction = {
  id: string
  speaker: Speaker
  messages: MessageGroup[]
  options: Option[]
  onStart?: Action[]
  onMessagesEnd?: Action[]
  onEnd?: Action[]
}

/**
 * An event that contains a series of interactions.
 *
 * The interactions can be arbitrarily nested into sub-events.
 */
export type Event = {
  id: string
  interactions: (Event | Interaction)[]
}
