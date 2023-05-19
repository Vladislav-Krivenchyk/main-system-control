<template>
  <v-col>
    <div
        justify="space-between" class="col-12"
        v-for="(card, index) in getCard"
        :key="index"
        style="min-height: 380px!important;"
    >
      <v-card>
        <v-img
            height="200"
            :src="card.image ? card.image : require('@/assets/images/1.jpeg')"
            cover
        >
          <div class="icon">
            <v-icon :color="card.image ?'#fff': '#000'" v-if="card.hide"  @click="toggleHideCard(card, index)" class="ml-auto" style="margin-right: 0">mdi-eye-off</v-icon>
            <v-icon :color="card.image ?'#fff': '#000'" v-else  @click="toggleHideCard(card, index)" class="ml-auto">mdi-eye</v-icon>
            <v-icon :color="card.image ?'#fff': '#000'" v-if="card.edit" @click="toggleEditCard(index)"  class="ml-auto">mdi-pencil</v-icon>
            <v-icon :color="card.image ?'#fff': '#000'" @click="deleteCard(index)">mdi-delete</v-icon>
          </div>
        </v-img>

        <v-card-text v-if="
                  card.link || card.language || card.price ||
                  card.advertising || card.textarea ||
                  card.positions" style="min-height: 150px!important;">
          <div class="font-weight-bold ms-1 mb-2">
            <div v-if="card.link">Посилання на сайт: <span>{{card.link}}</span></div>
            <div v-if="card.language">
              <div v-for="lang in card.language" :key="lang.id">
                Мова: <span>{{lang.title}}</span></div>
            </div>
            <div v-if="card.advertising">Відвідувань на мiсяць: <span>{{card.advertising}}</span></div>
            <div v-if="card.price">Вартість на мiсяць: <span>{{card.price}}</span></div>
            <h3 class="mt-3 mb-3 mt-h3" v-if="card.positions.length === 1">Рекламна позиція</h3>
            <h3 class="mt-3 mb-3 mt-h3" v-else>Рекламні позиції</h3>

            <div v-if="card.positions" class="d-flex" style="gap: 20px; flex-wrap: wrap">
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
            <div v-if="card.textarea" class="mt-2"><span>Додатково: {{card.textarea}}</span></div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-col>
</template>

<script>
export default {
  name: "PostCard",
  props: {
    cats: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    getCard() {
      return this.cats
    }
  },
  methods: {
    toggleHideCard(card, index) {
      this.$emit('toggle-hide-card', card, index)
    },
    toggleEditCard(index) {
      this.$emit('toggle-edit-card', index)
    },
    deleteCard(index) {
      this.$emit('delete-card', index)
    }
  }
}
</script>

<style  lang="sass" scoped>
@import "@/css/src/export/component.mainLayout.sass"
</style>