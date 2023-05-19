<template>
  <div class="menu-form">
    <div>
      <base-input
          label="Посилання на сайт"
          type="text"
          labelStyle="font-size: large; text-transform: initial;"
          input-style="background-color: #fff; color: #000; width: 100%"
          style-component="margin-left: 0px; margin-right: 0px; margin-bottom: 20px"
          v-model="computedLink"
      />
      <base-select
          :options="options"
          label="Язик"
          type="text"
          labelStyle="font-size: large; text-transform: initial; "
          placeholder="Англійська"
          selectPlaceholderStyle="margin: 0; text-transform: initial"
          option-item-style="text-transform: initial;"
          v-model="computedLanguage"
      />
      <base-input
          label="Відвідуваність"
          type="number"
          style-component="margin-top: 20px; margin-bottom: 20px"
          input-style="background-color: #fff; color: #000; width: 100%"
          labelStyle="font-size: large; text-transform: initial;"
          v-model="computedAdvertising"

      />
    </div>

        <slot></slot>

    <div v-for="(position, index) in positions" :key="index">
          <base-input
              :label="'Рекламна позиція: \n' + position.value"
              type="text"
              style-component="margin-top: 20px; margin-bottom: 20px"
              input-style="background-color: #fff; color: #000; width: 100%"
              labelStyle="font-size: large; text-transform: initial;"
              v-model="position.value"
          />
        <div v-if="position.filterPosition && position.value.length > 2">
          <!-- Дополнительные поля для каждого селекта -->
          <base-input
              label="Вартість"
              type="number"
              style-component="margin-top: 20px; margin-bottom: 20px"
              input-style="background-color: #fff; color: #000; width: 100%"
              labelStyle="font-size: large; text-transform: initial;"
              v-model="position.price"
          />
        <div class="d-flex" style="justify-content: space-between">
          <base-input
              label="Днів"
              type="number"
              style-component="margin-top: 0px; margin-bottom: 20px; width: 100%"
              input-style="background-color: #fff; color: #000; width: 100%"
              labelStyle="font-size: large; text-transform: initial;"
              v-model="position.day"
          />
            <base-input
                label="Тижнів"
                type="number"
                style-component="margin-top: 0px; margin-bottom: 20px; margin-left: 8px; width: 100%"
                input-style="background-color: #fff; color: #000; width: 100%"
                labelStyle="font-size: large; text-transform: initial;"
                v-model="position.week"
            />
          </div>
            <base-input
                label="Місяців"
                type="number"
                style-component="margin-top: 0px; margin-bottom: 20px"
                input-style="background-color: #fff; color: #000; width: 100%"
                labelStyle="font-size: large; text-transform: initial;"
                v-model="position.month"
            />
        </div>
      </div>

        <div class="d-flex mt-3 align-center">
          <div @click="$emit('handleAddNewPosition')"
               class="b-mdi-plus">
            <v-icon color="white" style="cursor: pointer;">mdi-plus</v-icon>
          </div>
          <span class="ml-2 add-txt">Додати рекламну позицію</span>
        </div>

              <base-textarea
                  label="Додатково"
                  type="text"
                  labelStyle="font-size: large; text-transform: initial; margin-top: 20px"
                  v-model="computedTextarea"
                  styles="margin-top: 20px"

              />
              <v-btn @click="$emit('handleAddToSite')">Додати сайт</v-btn>
</div>
</template>

<script>
import baseInput from "@/assets/BaseComponents/BaseInput.vue";
import baseSelect from "@/assets/BaseComponents/BaseSelect.vue";
import baseTextarea from "@/assets/BaseComponents/BaseTextarea.vue";
export default {
  name: "FormOptionMenu",
  components: {
    baseInput,
    baseSelect,
    baseTextarea
  },
  data() {
    return {
      language: '',
      link: '',
      advertising: '',
      textarea: ''
    }
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    positions: {
      type: Array,
      default: () => []
    },
  },
  computed: {
    computedLink: {
      get() {
        return this.link;
      },
      set(value) {
        this.link = value;
        this.$emit('update:link', this.link);
      }
    },
    computedLanguage: {
      get() {
        return this.language;
      },
      set(value) {
        this.language = value;
        this.$emit('update:language', this.language);
      }
    },
    computedAdvertising: {
      get() {
        return this.advertising;
      },
      set(value) {
        this.advertising = value;
        this.$emit('update:advertising', this.advertising);
      }
    },
    computedTextarea: {
      get() {
        return this.textarea;
      },
      set(value) {
        this.textarea = value;
        this.$emit('update:textarea', this.textarea);
      }
    }
  },
}
</script>

<style lang="sass" scoped>
@import "@/css/src/export/component.mainLayout.sass"
</style>