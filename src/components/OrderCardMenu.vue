<template>
    <v-col justify="space-between" class="col-12">
      <div v-for="(card, index) in cats"
          :key="index"
           style="margin-top: 20px"
      >
        <v-card  v-if="card.dates">
          <v-img
              height="200"
              :src="card.image ? card.image :  require('@/assets/images/1.jpeg')"
              cover
          >
            <div class="icon">
              <v-icon :color="card.image ? '#fff' : '#000'" @click="handleDeleteCardOrder(card,index)">mdi-delete</v-icon>
            </div>
          </v-img>

          <v-card-text v-if="
                        card.link || card.language || card.price ||
                        card.advertising || card.textarea || card.positions" style="min-height: 150px!important;">
            <div class="font-weight-bold ms-1 mb-2" style="text-transform: initial">
              <div v-if="card.link">Посилання на сайт: <span>{{card.link}}</span></div>
              <div v-if="card.language">
                <div v-for="lang in card.language" :key="lang.id">
                  Мова: <span>{{lang.title}}</span></div>
              </div>
              <div v-if="card.advertising">Відвідувань на мiсяць: <span>{{card.advertising}}</span></div>
              <div v-if="card.price">Вартість на мiсяць: <span>{{card.price}}</span></div>
              <h3 class="mt-3 mb-3" style="color: #000;" v-if="card.dates.length">Оренда місця</h3>

              <div v-if="card.positions" class="d-flex flex-wrap" style="gap: 20px;">
                <div v-for="(item, index ) in card.dates" :key="index">
                  <div class="flex-column d-flex">
                    <span v-if="item.value">Місце: {{item.value}}</span>

                    <div>

                      <h3 style="color: #000;">Місце: {{item.title}}</h3>
                      <span>Початок: {{item.day}}:{{item.month}}:{{item.year}} | {{item.hours}}:{{item.minutes}}</span> <br>
                      <span>Кінець: {{item.dayEnd}}:{{item.monthEnd}}:{{item.yearEnd}} | {{item.hoursEnd}}:{{item.minutesEnd}}</span>
                      <hr>

                    </div>
                    <span v-if="item.price">Ціна: {{item.price}}</span>
                  </div>
                </div>
              </div>
              <div v-if="card.textarea" class="mt-2" ><span>Додатково: {{card.textarea}}</span></div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-col>
</template>

<script>
export default {
  name: "OrderCardMenu",
  props: {
    cats: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    handleDeleteCardOrder(card, index) {
      this.$emit('handle-delete-card-order', card, index)
    },

  }
}
</script>

<style lang="sass" scoped>
@import "@/css/src/export/component.mainLayout.sass"
</style>