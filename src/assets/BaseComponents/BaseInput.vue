<template>
  <div style="position: relative;" :style="styleComponent">
    <label
        v-if="label"
        :style="labelStyle"
        class="label"
        :class="{ 'error-text-label': hasError, 'input-label-disabled': $attrs.disabled }"
    >
      <template v-if="isCustomLabel">
        <slot name="customLabel" />
      </template>
      <template v-else>
        {{ label }}
      </template>
    </label>

    <div style="position: relative;">
      <input
          v-mask="mask"
          :type="type"
          :disabled="isDisabled"
          :style="inputStyle"
          class="input"
          :class="{ 'error': hasError, 'input-disabled': $attrs.disabled, 'no-hover-styles': !hoverStyles }"
          v-bind="$attrs"
          maxlength="70"
          @input="$emit('update', $event.target.value)"
          v-on="$listeners"
      >
    </div>
    <span
        v-if="!hideErrorLabel"
        v-visible="hasError"
        class="error-label"
        :class="labelAbsolute ? 'label-absolute' : ''"
    >
            {{ errorMsg }}
        </span>
  </div>
</template>

<script>
import { VueMaskDirective } from 'v-mask'
import visible from "@/boot/directives/visible"

export default {
  name: "BaseInput",
  directives: {
    mask: VueMaskDirective,
    visible
  },
  inheritAttrs: false,
  model: {
    event: 'update'
  },
  props: {
    styleComponent: {
      type: String,
      default: ''
    },
    mask: {
      type: String,
      required: false
    },
    inputStyle: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      // validator(value) {
      //   return [
      //     'email',
      //     'number',
      //     'password',
      //     'search',
      //     'tel',
      //     'text',
      //     'date',
      //     'url',
      //   ].includes(value)
      // },
    },
    hideErrorLabel: {
      type: Boolean,
      default: false
    },
    hasError: {
      type: Boolean,
      default: false
    },
    errorMsg: {
      type: String,
    },
    label: {
      type: String,
      default: ''
    },
    isCustomLabel: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    hoverStyles: {
      type: Boolean,
      default: true
    },
    labelAbsolute: {
      type: Boolean,
      default: false
    },
    labelStyle: {
      type: String
    }
  },
  computed: {
    showErrorIcon() {
      return !this.type.includes('date');
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/css/src/partials/_colors.sass'
@import '@/css/src/partials/_geometrics.sass'
@import '@/css/src/mixins/setTypography.mixin.sass'
@import '@/css/src/mixins/visuals.mixin.sass'
@import '@/css/src/mixins/breakpoints.mixin.sass'
$height: 48px
.input
  display: flex
  align-items: center
  height: $height
  border-radius: 8px
  border: 2px solid rgba(#b4b4b4, .4)
  background: rgba(0, 0, 0, -0.05)
  transition: 0.1s alls
  padding-left: 16px
  padding-right: 16px
  font-size: 14px !important
  @include respond-to('small')
    height: calc(#{$height} - 8px)
  &:focus
    outline: none
.error-text-label
  color: $grey-1
.icon-error
  position: absolute
  right: calc(#{$heading-margin} - 12px)
  top: calc(#{$height} - 28px)
  @include respond-to('small')
    top: calc(#{$height - 8px} - 28px)
.input-label-disabled
  pointer-events: none
  color: rgba(#101A03, 0.5)
.input-disabled
  background: $grey-4 !important
  pointer-events: none !important

.label-absolute
  position: absolute
  top: calc(28px + #{$height})
  @include respond-to('small')
    top: calc(28px + #{$height - 8px})


input
  color: #ffffff
  &:hover
    border: 2px solid $green-1
    transition: 0.1s all
  &:focus
    border: 2px solid $green-1
    transition: 0.1s all
    outline: none
</style>