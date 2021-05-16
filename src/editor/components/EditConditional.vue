<template>
  <FieldGroup name="Conditional">
    <FieldGroup name="if">
      <!-- TODO Condition -->
      <component :is="component"></component>
    </FieldGroup>
    <FieldGroup
      v-for="(elif, index) in conditional.elif"
      :key="index"
      name="elif"
    >
      <!-- TODO Condition -->
      <component :is="component" v-bind="elifAttrs(elif, index)"></component>
    </FieldGroup>
    <FieldGroup name="else">
      <component :is="component"></component>
    </FieldGroup>
  </FieldGroup>
</template>

<!--
TODO How am I going to type the Conditional?
 How am I going to pass the correct properties to each dynamic component?
 How am I going to correctly pass the data back to the parent component?
-->

<!--
I could have a function that provides the attributes for each component,
provided by the parent component, that takes the context of this component
as arguments.

E.g. for elif, assuming the requested component is uuhhhh idk FieldText
because it's an easy example:
    (conditional, index) => ({
      label: "Field text",
      value: condition.elif[index].value (idk lmao)
      "@update:value": (value) => ...
    })
-->

<script lang="ts">
import { defineComponent, PropType, Component } from "vue"
import FieldGroup from "./FieldGroup.vue"
import { Conditional, CanBeConditional } from "../types"

export default defineComponent({
  name: "EditConditional",
  components: { FieldGroup },
  props: {
    /**
     * Object containing the Conditional data structure.
     */
    conditional: {
      type: Object as PropType<Conditional<CanBeConditional>>,
      required: true,
    },
    /**
     * The Vue component to be used as the object handler for the objects
     * that this Conditional object handles.
     */
    component: {
      type: Object as PropType<Component>,
      required: true,
    },
    /**
     * Function to generate attributes to apply to the 'if' component.
     */
    ifAttrs: {
      type: Function as PropType<() => void>,
      required: true,
    },
    /**
     * Function to generate attributes to apply to an 'elif' component.
     */
    elifAttrs: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    /**
     * Function to generate attributes to apply to the 'else' component.
     */
    elseAttrs: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
})
</script>

<style lang="scss"></style>
