<template>
  <div class="obj-edt-numb" @mouseover="mouseoverObj" @mouseout="mouseoutObj">
    <input class="obj-edt-numb__input" type="number" :id="vID" value=0
           @focus="focusInput"
           @blur="blurInput"
           @keydown="keyIgnore($event)">
    <button class="obj-edt-numb__btn" type="button" v-show="mouseover || focused"
            @click="increment">
      <i class="fa fa-caret-up obj-edt-numb__btn_icon-inc"></i>
    </button>
    <button class="obj-edt-numb__btn obj-edt-numb__btn_dec" type="button" v-show="mouseover || focused"
            @click="decrement">
      <i class="fa fa-caret-down obj-edt-numb__btn_icon-dec"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'editQuantity',
  props: {
    vID: { required: true },
  },
  data() {
    return {
      focused: false,
      mouseover: false,
    };
  },
  methods: {
    keyIgnore(event) {
      if (event.key === '-' || event.key === '+' || event.key === 'e') event.preventDefault();
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
    increment() {
      const input = this.$el.querySelector('.obj-edt-numb__input');
      input.value = +input.value + 1;
    },
    decrement() {
      const input = this.$el.querySelector('.obj-edt-numb__input');
      if (+input.value > 0) input.value = +input.value - 1;
    },
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

$width: 144px
$height: 36px
$iconSize: 15px

button, input
  border: none
  background: none

input
  &[type=number]
    -moz-appearance: textfield
  &[type=number]::-webkit-outer-spin-button,
  &[type=number]::-webkit-inner-spin-button
    -webkit-appearance: none

.obj-edt-numb
  width: $width
  height: $height
  background-color: $clrBackground
  border: 1px solid $clrBorder
  position: relative
  &__input
    width: $width
    height: $height
    +textCSW($clrText, 14px, 400)
    text-align: center
    +paddingRL($height / 2 + 16px, $height / 2 + 8px)
  &__btn
    cursor: pointer
    overflow: hidden
    width: $height / 2
    height: $height / 2 - 1px
    +textCSW($Silver, $iconSize, 400)
    display: flex
    justify-content: center
    +absoluteTR(0, 0)
    &:hover
      filter: brightness(60%)
    &:active
      filter: brightness(80%)
    &_dec
      top: $height / 2 - 1px
    &_icon-inc
      margin-top: ($height / 2 - $iconSize - 1px) / 2
    &_icon-dec
      margin-top: ($height / 2 - $iconSize) / 2
</style>
