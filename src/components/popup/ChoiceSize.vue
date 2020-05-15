<template>
  <div class="popup" v-if="visibility">
    <div class="popup__background"
         @click="close"/>
    <div class="popup__content">
      <button class="popup__close" type="button"
              @click.prevent="close">
        <i class="fa fa-times"></i>
      </button>
      <form action="#">
        <h3 class="popup__title">Выберите размер</h3>
        <div class="popup__radio-block">
          <span class="popup__button" v-for="size of sizeList" :key="size">
            <input class="popup__radio" type="radio" name="choice-size" :id="`choice-size-${size}`" :value="size"
                   @change="check($event)">
            <label class="popup__label" :for="`choice-size-${size}`">{{ size }}</label>
          </span>
        </div>
        <btnAddToCart vTitle="Добавить в корзину" :vClick="addToCart"/>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import btnAddToCart from '@/components/popup/btnAddToCart.vue';

export default {
  name: 'ChoiceSize',
  components: {
    btnAddToCart,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    addToCart() {
      if (this.getSize) {
        const newProduct = JSON.parse(JSON.stringify(this.product));
        const newData = { size: this.getSize, quantity: 1 };
        this.$set(newProduct, 'data', newData);
        this.add(newProduct);
        this.hide();
      } else {
        this.setMessage('<p>Перед добавлением товара в корзину необходимо обязательно выбрать размер</p>');
        this.showMessage();
      }
    },
    check(event) {
      this.setSize(event.target.value);
    },
    close() {
      this.hide();
    },
    ...mapActions({
      add: 'cart/add',
      setSize: 'setPopupSize',
      hide: 'hidePopupSize',
      showMessage: 'showPopupMessage',
      setMessage: 'setPopupMessage',
    }),
  },
  computed: {
    ...mapGetters({
      product: 'popupSizeGetProduct',
      getSize: 'popupSizeGetSize',
      sizeList: 'popupSizeGetSizeList',
      visibility: 'popupSizeVisibility',
    }),
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

button
  border: none
  background: none

.popup
  width: 100vw
  height: 100vh
  display: flex
  justify-content: center
  align-items: center
  position: fixed
  top: 0
  left: 0
  &__background
    width: 100vw
    height: 100vh
    opacity: 0.5
    background: $clrText
    +absoluteTL(0, 0)
  &__content
    z-index: 1
    background-color: $clrBackground
    border-radius: 5px
    padding: 48px
    position: relative
  &__close
    cursor: pointer
    overflow: hidden
    width: 32px
    height: 32px
    +textCSW($clrBrand, 24px, 400)
    background-color: $clrBackground
    border-radius: 50%
    display: flex
    justify-content: center
    align-items: center
    +absoluteTR(12px, 12px)
    &:hover
      color: white
      background-color: $clrBrand2
      filter: saturate(115%)
    &:active
      color: white
      background-color: $clrBrand2
      filter: saturate(85%)
    & .fa
      +marginTL(-2px, 1px)
  &__title
    size: 24px
  &__radio-block
    display: flex
    justify-content: space-around
    margin: 24px auto 36px
  &__button
    margin-right: 12px
    &:last-of-type
      margin-right: 0
  &__label
    cursor: pointer
    width: 48px
    height: 36px
    +textCSWT($clrBrand, 18px, 700, uppercase)
    background-color: $clrBackground
    border: 1px solid $clrBrand2
    border-radius: 3px
    display: flex
    justify-content: center
    align-items: center
    &:hover
      color: white
      background-color: $clrBrand2
      filter: saturate(115%)
      border: none
    &:active
      color: white
      background-color: $clrBrand2
      filter: saturate(85%)
      border: none
  &__radio
    display: none
    &:checked + .popup__label
      color: white
      background-color: $clrBrand2
      border: none
    &:checked + .popup__label:hover
      filter: none
    &:checked + .popup__label:active
      filter: none
</style>
