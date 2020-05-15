<template>
  <div class="obj-sel" @mouseover="mouseoverObj" @mouseout="mouseoutObj">
    <button class="obj-sel__input" type="button" :value="product.id"
            @click="changeVisibility"
            @blur="blurObj">
      <span class="obj-sel__input_square" :style="bgColor(product.color.value)"/>
      <span class="obj-sel__input_text">{{ product.color.title }}</span>
    </button>
    <ul class="obj-sel__list" v-show="showList">
      <li class="obj-sel__elem" v-for="(el) of goods" :key="el.id" v-show="el.id !== product.id"
          @mouseover="mouseoverElem($event)"
          @mouseout="mouseoutElem($event)"
          @click="select(el)">
        <span class="obj-sel__elem_square" :style="bgColor(el.color.value)"/>
        <span class="obj-sel__elem_text">{{ el.color.title }}</span>
      </li>
    </ul>
    <button class="obj-sel__btn" type="button"
            @click="changeVisibility"
            @blur="blurObj">
      <i class="fa fa-angle-down"></i>
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'selectColor',
  data() {
    return {
      input: undefined,
      focused: false,
      showList: false,
    };
  },
  methods: {
    changeVisibility() {
      if (this.showList) {
        this.hide();
      } else {
        this.show();
      }
    },
    hide() {
      this.showList = false;
    },
    show() {
      if (this.choiceColor) this.showList = true;
    },
    select(el) {
      this.value = el.id;
      this.changeProduct(el.id);
      this.hide();
    },
    mouseoverObj() {
      this.focused = true;
    },
    mouseoutObj() {
      this.focused = false;
    },
    blurObj() {
      if (this.focused) return;
      this.hide();
    },
    mouseoverElem(event) {
      const elem = event.target;
      elem.style.backgroundColor = '#bcbcbc';
    },
    mouseoutElem(event) {
      const elem = event.target;
      elem.style.backgroundColor = 'inherit';
    },
    bgColor(color) {
      return `background-color: ${color};`;
    },
    ...mapActions({
      changeProduct: 'product/changeProduct',
    }),
  },
  computed: {
    ...mapGetters({
      goods: 'product/getList',
      product: 'product/getProduct',
      choiceColor: 'product/choiceColor',
    }),
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

$width: 144px
$height: 36px

button
  border: none
  background: none

.obj-sel
  width: $width
  height: $height
  background-color: $clrBackground
  border: 1px solid $clrBorder
  position: relative
  margin-bottom: 20px
  &__input
    cursor: pointer
    overflow: hidden
    width: $width
    height: $height
    +textCSW($clrText, 14px, 400)
    white-space: nowrap
    text-overflow: ellipsis
    text-align: left
    user-select: none
    -webkit-user-select: none
    -moz-user-select: none
    -ms-user-select: none
    +paddingRL($height + 2px, 12px)
    &:hover ~ .obj-sel__btn
      filter: brightness(60%)
    &:active ~ .obj-sel__btn
      filter: brightness(80%)
    &_square
      pointer-events: none
      width: 12px
      height: 12px
      border: 1px solid $clrBorder
      display: block
      +absoluteTL($height / 2 - 6px, 16px)
    &_text
      pointer-events: none
      margin-left: 22px
  &__list
    z-index: 1
    overflow: auto
    width: $width
    max-height: $height * 1.5 * 8
    +textCSWH($clrText, 14px, 400, 14px * 1.5)
    background-color: $clrBackground
    border: 1px solid $clrBorder
    +absoluteTL($height, -1px)
  &__elem
    cursor: pointer
    +paddingRL(8px, 16px)
    position: relative
    &_square
      pointer-events: none
      width: 12px
      height: 12px
      border: 1px solid $clrBorder
      display: block
      +absoluteTL(14px * 0.75 - 6px, 16px)
    &_text
      pointer-events: none
      margin-left: 20px
  &__btn
    cursor: pointer
    width: $height
    height: $height
    +textCSW($Silver, 15px, 400)
    +absoluteTR(0, 0)
    &:hover
      filter: brightness(60%)
    &:active
      filter: brightness(80%)
</style>
