<template>
  <div>
    <div class="menu-form"  v-for="(item, index) in getCard" :key="index">
      <div v-if="cardForm === index">
        <base-input
            label="Посилання на сайт"
            type="text"
            labelStyle="font-size: large; text-transform: initial;"
            input-style="background-color: #fff; color: #000; width: 100%"
            style-component="margin-top: 20px; margin-bottom: 20px"
            v-model="item.link"
        />
        <base-select
            :options="options"
            label="Мова"
            type="text"
            labelStyle="font-size: large; text-transform: initial;"
            placeholder="Англійська"
            selectPlaceholderStyle="margin: 0; text-transform: initial"
            option-item-style="text-transform: initial;"
            v-model="language"

        />
        <base-input
            label="Відвідуваність"
            type="number"
            style-component="margin-top: 20px; margin-bottom: 20px"
            input-style="background-color: #fff; color: #000; width: 100%"
            labelStyle="font-size: large; text-transform: initial;"
            v-model="item.advertising"

        />

        <slot></slot>

        <div class="d-flex flex-wrap card" style="justify-content: space-between; background: #fff;">
          <div v-for="(post, index) in item.positions" :key="index">
            <h3 class="mt-3 mb-3 h3-advertising" v-if="post.value">Рекламна позиція: {{post.value}}</h3>
            <base-input
                label="Вартість"
                type="number"
                style-component="margin-bottom: 10px width: 100%"
                input-style="background-color: #fff; color: #000; width: 100%"
                labelStyle="font-size: large; text-transform: initial;"
                v-model="post.price"
            />
            <div class="d-flex " style="justify-content: space-between">
              <base-input
                  label="Днів"
                  type="number"
                  style-component="margin-bottom: 10px; width: 100%"
                  input-style="background-color: #fff; color: #000; width: 100%"
                  labelStyle="font-size: large; text-transform: initial;"
                  v-model="post.day"
              />
              <base-input
                  label="Тижнів"
                  type="number"
                  style-component="margin-bottom: 10px; margin-left: 8px; width: 100%"
                  input-style="background-color: #fff; color: #000; width: 100%"
                  labelStyle="font-size: large; text-transform: initial;"
                  v-model="post.week"
              />
            </div>

            <base-input
                label="Місяців"
                type="number"
                style-component="margin-bottom: 10px"
                input-style="background-color: #fff; color: #000; width: 100%"
                labelStyle="font-size: large; text-transform: initial;"
                v-model="post.month"
            />
          </div>
        </div>
        <base-textarea
            label="Додатково"
            type="text"
            labelStyle="font-size: large; text-transform: initial; margin-top: 20px"
            v-model="item.textarea"
            styles="margin-top: 20px"

        />
        <v-btn width="100%"  @click="editOptions(item)">Редагувати</v-btn>
      </div>
    </div>
  </div>
</template>

<script>

import BaseTextarea from "@/assets/BaseComponents/BaseTextarea.vue";
import BaseSelect from "@/assets/BaseComponents/BaseSelect.vue";
import BaseInput from "@/assets/BaseComponents/BaseInput.vue";

export default {
  name: "EditOptionMenu",
  components: {BaseInput, BaseSelect, BaseTextarea},
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
      default: () => ([])
    },
    cardForm: {
      type: Number,
      required: true
    }
  },
  computed: {
    getCard() {
      return this.options
    }
  },
  methods: {
    editOptions(item) {
      this.$emit('edit-options', item)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "@/css/src/export/component.mainLayout.sass"
</style>