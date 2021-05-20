/**
 * The interaction editor makes heavy use of dynamic components.
 *
 * Any component that can be dynamic must export a type containing its props
 * and any other attributes it might need.
 *
 * It must expose any updates to its main value on an event named
 * 'update:value'.
 */

export type DynamicComponent<Component, Attrs> = {
  is: Component
  attrs: Attrs
}

export type updateValueAttrs = {
  "update:value": "aa"
}
