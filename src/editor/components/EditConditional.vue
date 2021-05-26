<template>
  <FieldGroup name="Conditional">
    <FieldGroup name="if">
      <!-- TODO Condition -->
      <component
        :is="ifComponent().is"
        v-bind="ifComponent().attrs"
        @update-value="ifComponent().update($event)"
      ></component>
    </FieldGroup>
    <FieldGroup
      v-for="(elif, index) in conditional.elif"
      :key="index"
      name="elif"
    >
      <!-- TODO Condition -->
      <component
        :is="elifComponent(index).is"
        v-bind="elifComponent(index).attrs"
        @update-value="elifComponent(index).update($event)"
      ></component>
    </FieldGroup>
    <FieldGroup name="else">
      <component
        :is="elseComponent().is"
        v-bind="elseComponent().attrs"
        @update-value="elseComponent().update($event)"
      ></component>
    </FieldGroup>
  </FieldGroup>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import FieldGroup from "./FieldGroup.vue"
import { Conditional, CanBeConditional } from "../types"
import { DynamicComponent } from "./dynamicComponents"

/**
 * Type of an EditConditional component interface for use in dynamic
 * components.
 *
 * @param <C> - The type of the interactions tree node that is represented
 * by this EditConditional component.
 * @param <DynamicChild> - The Vue component that will represent this type.
 */
export type DynamicConditional<
  C extends CanBeConditional,
  DynamicChild extends DynamicComponent<any, any>
> = DynamicComponent<EditConditionalAttributes<DynamicChild>, Conditional<C>>

/**
 * Attributes that must be applied to this component when generating it as
 * a dynamic component.
 *
 * Has a property for each branch of the Conditional. Each function should
 * produce a dynamic component for insertion into the EditConditional
 * component. Each produced component should be of the same type per
 * Conditional.
 */
type EditConditionalAttributes<
  ChildComponent extends DynamicComponent<any, any>
> = {
  conditional: Conditional<CanBeConditional>
  ifComponent: () => ChildComponent
  elifComponent: (index: number) => ChildComponent
  elseComponent: () => ChildComponent
}

export default defineComponent({
  name: "EditConditional",
  components: { FieldGroup },
  props: {
    conditional: {
      type: Object as PropType<Conditional<CanBeConditional>>,
      required: true,
    },
    ifComponent: {
      type: Function as PropType<() => DynamicComponent<unknown, unknown>>,
      required: true,
    },
    elifComponent: {
      type: Function as PropType<
        (index: number) => DynamicComponent<unknown, unknown>
      >,
      required: true,
    },
    elseComponent: {
      type: Function as PropType<() => DynamicComponent<unknown, unknown>>,
      required: true,
    },
  },
})
</script>

<style lang="scss"></style>
