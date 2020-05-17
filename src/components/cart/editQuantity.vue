<template>
  <div class="obj-edt-numb" :class="vClass"
       @mouseover="mouseoverObj" @mouseout="mouseoutObj">
    <input class="obj-edt-numb__input" type="number" v-model="quantity"
           @focus="focusInput" @blur="blurInput" @keydown="keyIgnore($event)" @input="changeQuantity()">
    <button class="obj-edt-numb__btn obj-edt-numb__inc" v-show="mouseover || focused"
            @click="addToCart(1)"><i class="fa fa-caret-up"></i></button>
    <button class="obj-edt-numb__btn obj-edt-numb__dec" v-show="mouseover || focused"
            @click="removeFromCart(1)"><i class="fa fa-caret-down"></i></button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CartEditQuantity',
  props: {
    vProduct: { type: Object, default: undefined },
    vClass: { default: '' },
  },
  data() {
    return {
      quantity: this.vProduct.data.quantity,
      focused: false,
      mouseover: false,
    };
  },
  methods: {
    keyIgnore(event) {
      if (event.key === '-' || event.key === '+' || event.key === 'e') event.preventDefault();
    },
    changeQuantity() {
      let val = +this.quantity;
      val -= this.vProduct.data.quantity;
      if (val > 0) {
        this.addToCart(val);
      } else if (val < 0) {
        this.removeFromCart(-val);
      }
    },
    mouseoverObj() {
      this.mouseover = true;
    },
    mouseoutObj() {
      this.mouseover = false;
    },
    focusInput() {
      this.focused = true;
    },
    blurInput() {
      this.focused = false;
    },
    addToCart(quantity) {
      const val = this.vProduct.data.quantity;
      const product = JSON.parse(JSON.stringify(this.vProduct));
      product.data.quantity = quantity;
      this.add(product)
        .then(() => {
          this.quantity = this.vProduct.data.quantity;
        })
        .catch(() => {
          this.quantity = val;
        });
    },
    removeFromCart(quantity) {
      const val = this.vProduct.data.quantity;
      const product = JSON.parse(JSON.stringify(this.vProduct));
      product.data.quantity = quantity;
      this.remove(product)
        .then(() => {
          this.quantity = this.vProduct.data.quantity;
        })
        .catch(() => {
          this.quantity = val;
        });
    },
    ...mapActions({
      add: 'cart/add',
      remove: 'cart/remove',
    }),
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

button, input
  border: none
  background: none

input
  &[type=number]
    -moz-appearance: textfield
  &[type=number]::-webkit-outer-spin-button,
  &[type=number]::-webkit-inner-spin-button
    -webkit-appearance: none

$width: 60px
$height: 30px

.obj-edt-numb
  width: $width
  height: $height
  background-color: $clrBackground
  border: 1px solid $clrBorder
  position: relative
  margin: 0 auto
  &__input
    text-align: center
    width: $width
    height: $height
    +textCSW($clrText, 14px, 400)
    +paddingRL(max($height / 2 + 8px, 24px), max($height / 2, 16px))
  &__btn
    cursor: pointer
    overflow: hidden
    width: $height / 2
    min-width: 16px
    +textCSW($Silver, 15px, 400)
    display: flex
    justify-content: center
    position: absolute
    top: 0
    right: 0
    &:hover
      filter: brightness(60%)
    &:active
      filter: brightness(80%)
  &__inc
    height: $height / 2 - 1px
    & .fa
      margin-top: ($height / 2 - 16px) / 2
  &__dec
    height: $height / 2 - 1px
    top: $height / 2 - 1px
    & .fa
      margin-top: ($height / 2 - 15px) / 2
</style>
