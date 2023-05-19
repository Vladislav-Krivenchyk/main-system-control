<template>
  <v-app class="menu">
    <v-app-bar color="#fff" >
      <v-row class="align-center justify-end">
        <v-col v-if="!isWindowWidthSmall">
          <div class="d-flex"><v-icon>mdi-file-plus</v-icon><h4 class="ma-1" @click="handleOpenOptions">Додати сайт</h4></div>
        </v-col>
        <v-col class="col-4 col-md-4 d-flex align-center justify-end">
          <div class="d-flex align-center">
            <v-icon class="col-3 col-md-4" color="#000" @click="handleOrder">mdi-email</v-icon>
            <div class="ml-2" v-if="computedTotal">{{computedTotal}}</div>
          </div>
          <v-btn  variant="text" color="none" style="text-transform: initial" @click="logout">
            <v-icon>mdi-account</v-icon>Вихід
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-container class="col-12 d-flex " :style="{justifyContent: !isWindowWidthSmall ? 'center': ''}" >
      <v-row  v-if="isWindowWidthSmall && isOptionMenuOpen === false && isEditOptionMenuOpen === false" class="col-2 main-row">
        <v-card >
          <v-layout>
            <v-navigation-drawer
                permanent
                location="right"
            >
              <v-list dense nav>
                <v-list-item><v-icon>mdi-file-plus</v-icon><h4 class="ma-1" @click="handleOpenOptions">Додати сайт</h4></v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-layout>
        </v-card>
      </v-row>
      <v-row class="col-10" :class="{'col-12': !isWindowWidthSmall}">
        <div v-if="isOrderCardsVisible">
          <div class="menu-popup-order">
            <div class="menu-inner">
              <v-icon @click="isOrderCardsVisible = false">mdi-close</v-icon>
              <order-card-menu
                  :cats="orderCard"
                  @handle-delete-card-order="handleDeleteCardOrder"
              />
            </div>
          </div>
        </div>
        <div v-if="isOptionMenuOpen">
          <div class="menu-popup" :style="{ height: computedHeightPopup ? (50 * orderCardCount) + '%' : '' }" style="height: 100%">
            <div class="menu-inner">
              <v-icon @click="handleCloseOptions">mdi-close</v-icon>

              <form-option-menu
                  :options="options"
                  :positions="positions"
                  @handleAddNewPosition="handleAddNewPosition"
                  @handleAddToSite="handleAddToSite"
                  @update:link="handleLinkUpdate"
                  @update:language="handleLanguageUpdate"
                  @update:advertising="handleAdvertising"
                  @update:textarea="handleTextarea"
              >
                <div class="Image-input">
                  <div class="Image-input__image-wrapper">
                    <i v-show="!image" class="icon fa fa-picture-o"></i>
                    <img v-show="image" class="Image-input__image" style="width: 300px; height: 150px" :src="image">
                  </div>

                  <input @change="handlePreviewThumbnail" class="Image-input__input" name="thumbnail" type="file">
                </div>
              </form-option-menu>
            </div>
          </div>
        </div>
        <div v-if="isEditOptionMenuOpen">
          <div class="menu-popup" style="width: 100%; height: 100%">
            <div class="menu-inner">
              <v-icon @click="handleCloseEditOptions">mdi-close</v-icon>
              <edit-option-menu
                  :card-form="cardForm"
                  :options="getCard"
                  @edit-options="editOptions"
                  >
                <div class="Image-input">
                  <div class="Image-input__image-wrapper">
                    <i v-show="!image" class="icon fa fa-picture-o"></i>
                    <img v-show="image" class="Image-input__image" style="width: 300px; height: 150px" :src="image">
                  </div>
                  <input @change="previewThumbnailImg" class="Image-input__input" name="thumbnail" type="file">
                </div>
              </edit-option-menu>
            </div>
          </div>
        </div>
        <post-card
            :cats="getCard"
            @toggle-hide-card="toggleHideCard"
            @toggle-edit-card="toggleEditCard"
            @delete-card="deleteCard"
        />
      </v-row>

    </v-container>
  </v-app>
</template>

<script>
import FormOptionMenu from "@/components/FormOptionMenu.vue";
import EditOptionMenu from "@/components/EditOptionMenu.vue";
import OrderCardMenu from "@/components/OrderCardMenu.vue";
import PostCard from "@/components/PostCard.vue";
export default {
  name: "MainLayout",
  components: {PostCard, OrderCardMenu, EditOptionMenu, FormOptionMenu},
  data() {
    return  {
      isOrderCardsVisible: false,
      isOptionMenuOpen: false,
      advertising: '',
      price: null,
      day: '',
      week: '',
      month: '',
      link: '',
      image: '',
      textarea: '',
      language: '',
      choosePosition: null,
      options: [
        {id: 1, title: 'Англійська',  value: 1},
        {id: 2, title: 'Російська',  value: 2},
        {id: 3, title: 'Українська',  value: 3},
      ],
      form: [],
      editCard: null,
      isEditOptionMenuOpen: false,
      cardForm: null,
      editPosition: '',
      editForm: {
        image: '',
        position: '',
      },
      currentItem: null,
      positions: [],
      saveOrder: [],
      isWindowWidthSmall: false,
      computedHeightPopup: false,
      orderCardCount: 1,
    }
  },
  computed: {
    computedTotal() {
      let total = 0
      for(let item of this.saveOrder) {
        if(item.dates && Array.isArray(item.dates)) {
          total += item.dates.length
        }
      }
      return total
    },
    getCard() {
      return [...this.form]
    },
    orderCard() {
      return this.saveOrder
    }
  },
  methods: {
    handleLinkUpdate(value) {
      this.link = value
    },
    handleLanguageUpdate(value) {
      this.language = value;
    },
    handleAdvertising(value) {
      this.advertising = value
    },
    handleTextarea(value) {
      this.textarea = value
    },
    handleOrder() {
      this.isOrderCardsVisible = true
    },
    handleDeleteCardOrder(card) {
      delete card.dates;
      localStorage.setItem('t', JSON.stringify(this.saveOrder));
      this.isOrderCardsVisible = false
      window.location.reload(true)
    },
    handleAddNewPosition() {
      this.orderCardCount++
      this.computedHeightPopup = true

      // Создаем новую позицию
      const newPosition = {
        value: '',
        filterPosition: true,
        price: '',
        day: '',
        week: '',
        month: ''
      };
      // Добавляем новую позицию в массив positions
      this.positions.push(newPosition);
    },
    deleteCard(index) {
      this.form.splice(index, 1);
      localStorage.setItem('t', JSON.stringify(this.form))
    },
    editOptions(card)   {
      // Обновление данных в текущей карточке
      this.form.link = card.link ? card.link : "";
      this.form.advertising = card.advertising ? card.advertising : "";
      this.form.price = card.price ? card.price : "";
      this.form.textarea = card.textarea ? card.textarea : "";
      card.image = this.editForm.image ? this.editForm.image : '';
      this.form.day = card.day ? card.day : "";
      this.form.week = card.week ? card.week : "";
      this.form.month = card.month ? card.month : "";

      localStorage.setItem("t", JSON.stringify(this.form));

      this.editCard = null;

      this.isEditOptionMenuOpen = false;
    },
    previewThumbnailImg(event) {
      let input = event.target;

      if (input.files && input.files[0]) {
        let reader = new FileReader();
        let vm  = this

        reader.onload = function(e) {
          vm.image = e.target.result;
          vm.editForm.image = vm.image;
        }
        reader.readAsDataURL(input.files[0]);
      }
    },
    toggleEditCard(index) {
      this.cardForm = index
      this.isEditOptionMenuOpen = !this.isEditOptionMenuOpen;
    },
    logout() {
      this.$router.push({path: '/'})
    },
    handleCloseOptions() {
      this.isOptionMenuOpen = false
    },
    handleOpenOptions() {
      this.isOptionMenuOpen = true
    },
    handlePreviewThumbnail(event) {
      let input = event.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        let vm = this;

        reader.onload = function(e) {
          vm.image = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
      }
    },
    handleCloseEditOptions() {
      this.isEditOptionMenuOpen = false
    },
    toggleHideCard(item, index) {
      item.hide = !item.hide

      this.$set(this.form, index, item)

      localStorage.setItem("t", JSON.stringify(this.form));
    },
    handleAddToSite() {
      if (
          !this.link &&
          !this.advertising &&
          !this.textarea &&
          !this.language &&
          !this.image &&
          this.positions.some((position) => {
            return (
                !position.value ||
                !position.price ||
                !position.day ||
                !position.week ||
                !position.month
            );
          })
      ) {
        return;
      }
      if (
          !this.link &&
          !this.advertising &&
          !this.textarea &&
          !this.language &&
          !this.image
      ) {
        return;
      }

      const newCard = {
        link: this.link,
        advertising: this.advertising,
        textarea: this.textarea,
        language: this.options.filter(item => item.value === this.language ?? item.title),
        image: this.image,
        positions: this.positions,
        hide: false,
        edit: true
      };

      console.log(newCard)
      if (!Array.isArray(this.form)) {
        this.form = [];
      }

      this.form.push(newCard)
      localStorage.setItem("t", JSON.stringify(this.form));

      this.link = "";
      this.textarea = "";
      this.advertising = null;
      this.language = "";
      this.image = "";
      this.positions = [];

      this.isOptionMenuOpen = false
    },
  },
  created() {

    const storedData = localStorage.getItem("t");
    if (storedData) {
      this.form = JSON.parse(storedData);
    }
    const orderStore = localStorage.getItem('t')

    if(orderStore) {
      this.saveOrder = (JSON.parse(orderStore))
    }

  },
  mounted() {
    window.innerWidth >= 1025 ? this.isWindowWidthSmall = true : this.isWindowWidthSmall = false
  }
}
</script>

<style lang="sass" scoped>
@import "@/css/src/export/component.mainLayout.sass"
</style>