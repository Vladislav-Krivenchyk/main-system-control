<template>
  <div class="main">
    <v-app-bar class="md-6" color="#141414">
      <v-row class="align-center" v-if="widthWindow">
        <v-col  class="md-6 d-flex justify-center align-center">
          <base-input
              placeholder="Пошук..."
              input-style="width: 300px; height: 36px"
              v-model="searchQuery"
          />
          <v-btn class="ml-2" @click="filterCardsBySearch">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
        <v-col  class="md-6 d-flex justify-center">
          <v-btn
              variant="text"
              color="none"
              class="mr-5"
              @click='sendToApp()'
          >
            Вебмастер
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="align-center" v-else>
        <v-col  class=" d-flex justify-center align-center">
          <base-input
              placeholder="Пошук..."
              input-style="width: 150px; height: 36px"
              v-model="searchQuery"
          />
          <v-btn class="ml-4 pa-2 mdi-btn"  @click="filterCardsBySearch">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn
              variant="text"
              color="none"
              class="mr-5"
              @click='sendToApp()'
          >
            Вебмастер
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-container>

      <div class="d-flex align-center justify-center">
        <div class="range-slider-price">
          <span>{{ minPriceRange }}</span>
        </div>
        <div class="range-slider">
          <input
              type="range"
              min="0"
              max="500000"
              step="100"
              v-model.number="minPriceRange"
              class="custom-range-slider"
          >
          <input
              type="range"
              min="0"
              max="500000"
              step="100"
              v-model.number="maxPriceRange"
              class="custom-range-slider"
          >
        </div>
        <div class="range-slider-price">
          <span>{{ maxPriceRange }}</span>
        </div>
      </div>
      <post-item
          :cats="filterCards"
          :add-option="addOption"
          :keyCard="key"
          :desired-id-card="desiredIdCard"
          @toggleAdDisplay="toggleAdDisplay"
          @placeOrderForAd="placeOrderForAd"
          @update:selectedDateTime="updateSelectedDateTime"
          @update:selectedDateTimeEnd="updateSelectedDateTimeEnd"

      />
    </v-container>
  </div>
</template>

<script>
import BaseInput from "@/assets/BaseComponents/BaseInput.vue";
import PostItem from "@/components/PostItem.vue";
export default {
  name: "LandingLayout",
  components: {
    PostItem,
    BaseInput,
  },
  data() {
    return {
      cards: [],
      addOption: false,
      selectedDateTime: '',
      selectedDateTimeEnd: '',
      key: null,
      desiredIdCard: null,
      searchQuery: '',
      maxPriceRange: 500000,
      minPriceRange: 0,
      widthWindow: false,
      originalCards: []
    }
  },
  computed: {

    filterCards() {
      return this.cards.filter((item) => {
        const advertising = Number(item.advertising);
        return advertising >= this.minPriceRange && advertising <= this.maxPriceRange;
      });
    }
  },
  methods: {
    updateSelectedDateTime(value) {
      this.selectedDateTime = value
    },
    updateSelectedDateTimeEnd(value) {
      this.selectedDateTimeEnd = value
    },
    filterCardsBySearch() {
      this.cards = this.cards.filter((item) =>
          item.link.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    placeOrderForAd(card, idx) {
      const selectedDateTime = new Date(this.selectedDateTime);
      const selectedDateTimeEnd = new Date(this.selectedDateTimeEnd);

      if (!selectedDateTimeEnd && !selectedDateTime) {
        return;
      }

      const dateObject = {
        id: idx,
        title: card,
        year: selectedDateTime.getFullYear(),
        month: selectedDateTime.getMonth() + 1,
        day: selectedDateTime.getDate(),
        hours: selectedDateTime.getHours(),
        minutes: selectedDateTime.getMinutes(),
        yearEnd: selectedDateTimeEnd.getFullYear(),
        monthEnd: selectedDateTimeEnd.getMonth() + 1,
        dayEnd: selectedDateTimeEnd.getDate(),
        hoursEnd: selectedDateTimeEnd.getHours(),
        minutesEnd: selectedDateTimeEnd.getMinutes()
      };

      const cardIndex = this.cards.findIndex(item => item.positions[idx] && item.positions[idx].value === card);
      if (cardIndex !== -1) {
        // Найден соответствующий объект card
        if (!this.cards[cardIndex].dates) {
          this.cards[cardIndex].dates = [];
        } else {
          // Проверяю наличие объекта с таким же id в массиве dates и выполняем перезапись
          const dateIndex = this.cards[cardIndex].dates.findIndex(date => date.id === idx);
          if (dateIndex !== -1) {
            this.cards[cardIndex].dates.splice(dateIndex, 1, dateObject);
            localStorage.setItem('t', JSON.stringify(this.cards));
            this.selectedDateTime = '';
            this.selectedDateTimeEnd = '';
            this.addOption = false;
            return;
          }
        }
        this.cards[cardIndex].dates.push(dateObject);
      }

      localStorage.setItem('t', JSON.stringify(this.cards));

      this.selectedDateTime = '';
      this.selectedDateTimeEnd = '';
      this.addOption = false;
    },

    toggleAdDisplay(idx, cardId) {
      this.key = idx
      this.desiredIdCard = cardId
      this.addOption = !this.addOption
    },
    sendToApp() {
      this.$router.push({name: 'MainLayout'})
    }
  },
  mounted() {
    const getCard= localStorage.getItem('t')
    if(getCard) {
      this.cards = JSON.parse(getCard)
    }

    window.innerWidth >= 500 ? this.widthWindow = true : this.widthWindow = false

  },
}
</script>

<style lang="sass" scoped>
@import "@/css/src/export/component.landingLayout.sass"
</style>