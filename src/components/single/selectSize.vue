<template>
  <div class="obj-sel" @mouseover="mouseoverObj" @mouseout="mouseoutObj">
    <button class="obj-sel__input" type="button" :id="vID" value=""
            @blur="blurObj"
            @click="changeVisibility">
      {{ value }}
    </button>
    <ul class="obj-sel__list" v-show="showList">
      <li class="obj-sel__elem" v-for="(el) of product.size" :key="el"
          @mouseover="mouseoverElem($event)"
          @mouseout="mouseoutElem($event)"
          @click="select(el)">
        {{ el }}
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
import { mapGetters } from 'vuex';

export default {
  name: 'selectSize',
  props: {
    vID: { required: true },
    vPlaceholder: { default: '' },
  },
  data() {
    return {
      value: this.vPlaceholder,
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
      if (this.isEmpty) {
        this.hide();
        return;
      }
      this.showList = true;
    },
    select(el) {
      const input = this.$el.querySelector('.obj-sel__input');
      input.style.color = '#222222';
      input.value = el;
      this.value = el;
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
  },
  computed: {
    ...mapGetters({
      product: 'product/getProduct',
      isEmpty: 'product/isEmpty',
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
    +textCSW($clrPlaceholder, 14px, 400)
    white-space: nowrap
    text-overflow: ellipsis
    text-align: left
    user-select: none
    -webkit-user-select: none
    -moz-user-select: none
    -ms-user-select: none
    +paddingRL($height + 8px, 16px)
    &:hover ~ .obj-sel__btn
      filter: brightness(60%)
    &:active ~ .obj-sel__btn
      filter: brightness(80%)
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
