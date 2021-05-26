import type { Component } from "vue"

/**
 * The interaction editor makes heavy use of dynamic components.
 *
 * Any component that can be dynamic must export a type containing its
 * props and any other attributes it might need.
 *
 * It must expose any updates to its main value on an event named
 * 'updateValue'.
 *
 * @param <ComponentAttributes> - Type of an object containing props and
 * attributes for the component element.
 * @param <UpdateEventValue> - Type of the value emitted by the component's
 * update event.
 * @param <C> - Type of the component. I don't think there are specific
 * types for individual Vue components so it defaults to Component.
 *
 * @property is - Constructor for the Vue component.
 * @property attrs - Attributes and props to be attached to the component.
 * @property update - Function that will be called when the component emits
 * an updateValue event. Should be used to update the component
 */
export type DynamicComponent<
  ComponentAttributes,
  UpdateEventValue,
  C extends Component = Component
> = {
  is: C
  attrs: ComponentAttributes
  update: (value: UpdateEventValue) => void
}
