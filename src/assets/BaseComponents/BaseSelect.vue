<!--
    BASE CUSTOM SELECT
    Описание для шаблона. Описание пропсов ниже, перед скриптом

    1. Label
    select-wrapper - корневой DIV с шириной 100%, регулируем с внешнего компонента
    label - класс "label" тянется с styleguide.sass, отображается если кинуть пропсу "label". При ошибке добавляется класс "error-text-label" (локальный, красит текст в крассный)
    Icon - иконка инфо для тултипа, отображается если кинуть пропсу "tooltip"

    2. Select
    .pos-relative - оболочка для селекта. Если кинуть пропсу "disabled" - получает класс "select-disabled" и невозможно открыть селект.
            Так же висит событие "blur" для закрытия селекта при потере фокуса
    .base-input-field - содержит выбранный элемент с селекта или "getPlaceholder" (пропса placeholder или дефолтный текст). При клике открывает или закрывает селект.
        Класс тянется с styleguide.sass. Пропса "selectFieldStyle" для стилей
    .options-list - оболочка для выпадаещего списка. Не отображается если кинута пропса "disabled" или лист для списка пустой
        Если кинуть пропсу "itemsScrollbar" - добавится класс "scrollbar", который даст "overflowY - auto" для скролла внутри селекта
        Пропса "optionsListStyle" для стилей оболочки. Например "height: 200px" для скролла
    .options-item - элемент списка с пропсы "options". При клике меняет выбраный элемент селекта. Пропса "optionItemStyle" для стилей

    3. Error span
    Если пропса "hideErrorLabel" = true - не отобразится.
    Если пропса "hasError" = true - покажет текст ошибки с пропсы "errorMsg"
-->
<template>
  <div class="select-wrapper">
    <!-- 1. Label        -->
    <div class="label-wrapper">
      <label
          v-if="label"
          :class="{ 'error-text-label': hasError, label }"
          :style="labelStyle"
      >
        <template v-if="isCustomLabel">
          <slot name="customLabel"/>
        </template>
        <template v-else>
          {{ label }}
        </template>
      </label>
      <!-- TODO ICON name -->
      <Icon-info
          v-if="tooltip"
          v-tooltip.top="{ content: tooltipMessage, html: true }"
      />
    </div>
    <!-- 2. Select        -->
    <div
        class="pos-relative"
        :class="{'select-disabled': disabled}"
        :tabindex="0"
        @blur="open = false"
    >
      <div
          class="base-input-field"
          :style="selectFieldStyle"
          @click="open = !open"
      >
        <p
            v-if="value"
            class="selected-placeholder"
            :style="selectPlaceholderStyle"
        >
          {{ selected }}
        </p>
        <p
            v-else
            class="selected-placeholder"
            :style="selectPlaceholderStyle"
        >
          {{ getPlaceholder }}
        </p>

      </div>
        <div
            v-show="open"
            v-if="!disabled && options && options.length"
            class="options-list"
            :class="{'scrollbar': itemsScrollbar}"
            :style="optionsListStyle"
        >
          <div
              v-for="option of options"
              :key="option.value"
              :value="option.value"
              class="options-item"
              :style="optionItemStyle"
              @click="updateValue(option.value)"
          >
            <span>{{ option.title }}</span>
          </div>
        </div>
    </div>
    <!-- 3. Error span       -->
    <span
        v-if="!hideErrorLabel"
        v-visible="hasError"
        class="error-label"
    >
            {{ errorMsg }}
        </span>
  </div>
</template>

<!--
1. Props
    options: массив объектов. Обязательный пропс. Объект содержит два поля - value и title
        value: значение, которое будет возвращаться в родительский компонент при выборе
        title: текст для элемента
    label: текст для лейбла
    hasError: boolean. Будут ли стилизироваться элементы под ошибку
    tooltip: boolean. Показывать ли иконку с инфо
    tooltipMessage: текст для тултипа на иконке. Отобразится если просп "tooltip" = true
    disabled: boolean. Будет ли отображаться выпадающий список. И стили
    value: строка или число. v-model в родительском компоненте. Может быть тип null, тогда отображается placeholder как "выбраный элемент"
    placeholder: текст. По дефолту отображается текст, который описанный в поле "getPlaceholder"
    hideErrorLabel: boolean. Спрятать ли span с текстом ошибки
    errorMsg: текст для ошибки
    itemsScrollbar: boolean. Будет ли скролл в выпадающем списке
    optionsListStyle: стили для оболочки выпадающего списка
    selectFieldStyle: стили для оболочки с текстом выбранного элемента
    optionItemStyle: стили для итема в выпадающем списке
    selectPlaceholderStyle: стили для placeholder

2. Data
    open: отображать выпадающий список или нет

3. Computed
    model: v-model в родительском компоненте
    selected: текст для отображения выбраного элемента в .selected-placeholder
    getPlaceholder: текст плейсхолдера

4. Methods
    updateValue: меняет активный элемент с выпадающего списка
-->

<script>

export default {
  name: 'BaseSelect',
  props: {
    options: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    label: {
      type: String,
      default: '',
    },
    isCustomLabel: {
      type: Boolean,
      default: false
    },
    labelStyle: {
      type: String,
      default: '',
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: Boolean,
      default: false,
    },
    tooltipMessage: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    hideErrorLabel: {
      type: Boolean,
      default: true,
    },
    errorMsg: {
      type: String,
      default: '',
    },
    itemsScrollbar: {
      type: Boolean,
      default: false,
    },
    optionsListStyle: {
      type: String,
      default: '',
    },
    selectFieldStyle: {
      type: String,
      default: '',
    },
    optionItemStyle: {
      type: String,
      default: '',
    },
    selectPlaceholderStyle: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    selected() {
      const selectedOption = this.options.find(option => option.value?.toString() === this.model?.toString());

      return selectedOption?.title;
    },
    getPlaceholder() {
      return this.placeholder || ('Виберіть значення зі списку');
    },
  },
  methods: {
    updateValue(value) {
      this.model = value;
      this.open = false;
    },
  },
};
</script>

<style scoped lang="sass">
@import '@/css/src/partials/colors'
@import '@/css/src/mixins/visuals.mixin.sass'
@import '@/css/src/mixins/setTypography.mixin.sass'
@import '@/css/src/mixins/breakpoints.mixin.sass'

.base-input-field
  background: #fff
  cursor: pointer
  border-radius: 8px
  display: flex
  align-items: center
  column-gap: 7px
  padding: 0 16px
  height: 48px
  width: 100%
  border: 2px solid rgba(#b4b4b4, .4)
  transition: .2s all
  &:disabled
    pointer-events: none
  &:hover
    border-color: #66a30d !important
    transition: .2s all
    box-shadow: 0 7px 18px rgba(0, 0, 0, 0.06)
  &:focus
    border-color: #66a30d !important
    transition: .2s all
    box-shadow: 0 7px 18px rgba(0, 0, 0, 0.06)
  &.error
    border: 2px solid #dd3d3d
    &:hover
      border: 2px solid #dd3d3d !important
    &:active
      border: 2px solid #dd3d3d !important
    &:focus
      border: 2px solid #dd3d3d !important
  @media (max-width:  958px)
    height: 40px
  &:focus
    outline: none

.select-wrapper
  width: 100%
  outline: none

  &:focus
    outline: none

  & *
    outline: none

    &:focus
      outline: none

.label-wrapper
  display: flex
  column-gap: 10px

.error-text-label
  color: $red-1

.pos-relative
  position: relative

.selected-placeholder
  width: 100%
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  font-size: 14px

.selected-icon-arrow
  flex-shrink: 0
  margin-top: 1px
  transition: transform .2s

.options-list
  position: absolute
  padding-top: 14px
  padding-bottom: 14px
  z-index: $z-popup
  top: 53px
  left: 0
  color: $black-3
  width: calc(100% + 2px)
  border-radius: 6px
  border: 1px solid $grey-2
  background-color: $white-1
  @include set-body-text('3')

.options-item
  min-height: 36px
  max-height: 100%
  display: flex
  align-items: center
  padding-left: 1em
  padding-right: 1em
  cursor: pointer

  &:hover
    background: rgba($green-1, .1)

.select-disabled
  pointer-events: none
  color: $grey-3

.select-arrow-disabled
  background: none
  pointer-events: none
  border: none
  color: $grey-3

.scrollbar
  overflow-y: auto

  &::-webkit-scrollbar
    width: 4px

  &::-webkit-scrollbar-track
    background: $white-1

  &::-webkit-scrollbar-thumb
    background: $green-1

.rotate-180
  transform: rotate(180deg)
</style>