<template>
  <FieldGroup name="Conditional">
    <FieldGroup name="if">
      <!-- TODO Condition -->
      <component :is="childComponent" v-bind="childAttrs.ifAttrs()"></component>
    </FieldGroup>
    <FieldGroup
      v-for="(elif, index) in conditional.elif"
      :key="index"
      name="elif"
    >
      <!-- TODO Condition -->
      <component
        :is="childComponent"
        v-bind="childAttrs.elifAttrs(index)"
      ></component>
    </FieldGroup>
    <FieldGroup name="else">
      <component
        :is="childComponent"
        v-bind="childAttrs.elseAttrs()"
      ></component>
    </FieldGroup>
  </FieldGroup>
</template>

<script lang="ts">
import { defineComponent, PropType, Component } from "vue"
import FieldGroup from "./FieldGroup.vue"
import { Conditional, CanBeConditional } from "../types"

/**
 * Attributes that must be applied to this component when generating it as a
 * dynamic component.
 *
 * @param <ChildAttrs> - The type of the attributes needed for instances
 * of this Conditional's child component.
 *
 * @property conditional - The Conditional node, containing several child
 * nodes that are all of the same type.
 * @property childComponent - The Vue component representing the type of
 * this Conditional's child nodes.
 * @property childAttrs - A set of functions to generate the attributes to
 * apply to each child component, depending on which kind of logic in the
 * Conditional it is located in.
 */
export type EditConditionalAttrs<Child extends Component, ChildAttrs> = {
  conditional: Conditional<CanBeConditional>
  childComponent: Child
  childAttrs: AllConditionalChildAttrGenerators<ChildAttrs>
}

/**
 * Type of functions that generate attributes for the component wrapped in
 * the EditConditional component.
 *
 * @param <Logic> - The part of the Conditional to generate the component from.
 * @param <ComponentAttrs> - The type of the attributes of the wanted kind
 * of child component.
 */
export type ConditionalChildAttrGenerator<
  Logic extends "if" | "elif" | "else",
  ComponentAttrs
> = Logic extends "elif"
  ? (index: number) => ComponentAttrs
  : () => ComponentAttrs

/**
 * Type of an object with a property for each kind of attribute generator.
 */
export type AllConditionalChildAttrGenerators<ComponentAttrs> = {
  ifAttrs: ConditionalChildAttrGenerator<"if", ComponentAttrs>
  elifAttrs: ConditionalChildAttrGenerator<"elif", ComponentAttrs>
  elseAttrs: ConditionalChildAttrGenerator<"else", ComponentAttrs>
}

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
    childComponent: {
      type: Object as PropType<Component>,
      required: true,
    },
    childAttrs: {
      type: Object as PropType<
        AllConditionalChildAttrGenerators<Record<string, unknown>>
      >,
      required: true,
    },
  },
})
</script>

<style lang="scss"></style>
