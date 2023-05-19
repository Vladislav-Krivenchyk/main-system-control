<template>
  <div>
    <v-row class="col-12 ma-0 "
           v-for="(card, index) in cats"
           :key="index"
    >
      <v-col justify="space-between"
             v-if="card.hide !== true"
             class="col-12"
             style="min-height: 380px!important;">
        <v-card >
          <v-img
              height="200"
              :src="card.image ? card.image : require('@/assets/images/1.jpeg')"
              cover
          />
          <v-card-text  style="min-height: 150px!important;">
            <div class="font-weight-bold ms-1 mb-2">
              <div v-if="card.link">Посилання на сайт: <span>{{card.link}}</span></div>
              <div v-if="card.language.length">
                <div v-for="lang in card.language" :key="lang.id">
                  Мова: <span>{{lang.title}}</span></div>
              </div>
              <div v-if="card.advertising">Відвідувань на мiсяць: <span>{{card.advertising}}</span></div>
              <div v-if="card.price">Вартість на мiсяць: <span>{{card.price}}</span></div>
              <div class="d-flex flex-wrap">
                <div v-for="(position, idx) in card.positions" :key="idx">
                  <v-btn
                      class="position-btn"
                      @click="toggleAdDisplay(idx, card)"
                  >{{position.value}}</v-btn>

                  <div style="margin: 10px 0 10px 0"  v-if="addOption && keyCard === idx && card === desiredIdCard">
                    <div>
                      <base-input
                          label="Від"
                          type="datetime-local"
                          style-component="margin-bottom: 10px"
                          input-style="background-color: #fff; color: #000; width: 100%"
                          labelStyle="font-size: large; text-transform: initial;"
                          v-model="selectedDateTime"
                          @input="updateDateTime(selectedDateTime)"
                      />
                      <base-input
                          label="До"
                          type="datetime-local"
                          style-component="margin-bottom: 10px"
                          input-style="background-color: #fff; color: #000; width: 100%"
                          labelStyle="font-size: large; text-transform: initial;"
                          v-model="selectedDateTimeEnd"
                          @input="updateDateTimeEnd(selectedDateTimeEnd)"
                      />
                      <v-btn @click="placeOrderForAd(position.value, idx)">Заказати</v-btn>
                    </div>
                  </div>
                </div>
              </div>

              <h3 class="mt-3 mb-3" v-if="card.positions.length === 1">Рекламна позиція</h3>
              <h3 class="mt-3 mb-3" v-else>Рекламні позиції</h3>

              <div v-if="card.positions" class="d-flex flex-wrap position">
                <div v-for="(item ) in card.positions" :key="item.id">
                  <div class="flex-column d-flex">
                    <span v-if="item.value">Місце: {{item.value}}</span>

                    <div v-if="item.day">
                      <div v-if="item.day === '1'">
                        <span>День: {{item.day}}</span>
                      </div>
                      <div v-else>
                        <span>Днів: {{item.day}}</span>
                      </div>

                    </div>

                    <div v-if="item.week">
                      <div v-if="item.week === '1'">
                        <span>Тиждень: {{item.week}}</span>
                      </div>
                      <div v-else>
                        <span>Тижнів: {{item.week}}</span>
                      </div>
                    </div>

                    <div v-if="item.month">
                      <div v-if="item.month === '1'">
                        <span>Місяць: {{item.month}}</span>
                      </div>
                      <div v-else>
                        <span>Місяців: {{item.month}}</span>
                      </div>
                    </div>
                    <span v-if="item.price">Ціна: {{item.price}}</span>
                  </div>
                </div>
              </div>
              <div v-if="card.textarea" class="mt-2" ><span>Додатково: {{card.textarea}}</span></div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BaseInput from "@/assets/BaseComponents/BaseInput.vue";
export default {
  name: "PostItem",
  components: {BaseInput},
  data() {
    return {
      selectedDateTime: '',
      selectedDateTimeEnd: ''
    }
  },
  props: {
    cats: {
      type: Array,
      default: () => ([])
    },
    addOption: {
      type: Boolean,
      default: false
    },
    keyCard: {
      type: Number,
      default: null
    },
    desiredIdCard: {
      type: Object,
      default: null
    }
  },
  methods: {
    toggleAdDisplay(positionIndex, card) {
      this.$emit('toggleAdDisplay', positionIndex, card)
    },
    placeOrderForAd(position, idx) {
      this.$emit('placeOrderForAd', position, idx)
    },
    updateDateTime(value) {
      this.selectedDateTime = value
      this.$emit('update:selectedDateTime', this.selectedDateTime)
    },
    updateDateTimeEnd(value) {
      this.selectedDateTimeEnd = value
      this.$emit('update:selectedDateTimeEnd', this.selectedDateTimeEnd)
    }

  }
}
</script>

<style  lang="sass" scoped>
@import "@/css/src/export/component.landingLayout.sass"
</style>