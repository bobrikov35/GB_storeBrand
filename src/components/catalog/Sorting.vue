<template>
  <div class="obj-sel-label">
    <div class="obj-sel__label">Сортировать по</div>
    <div class="obj-sel" @mouseover="mouseoverObj" @mouseout="mouseoutObj">
      <button class="obj-sel__input" type="button" v-html="value"
              @blur="blurObj"
              @click="changeVisibility">
      </button>
      <ul class="obj-sel__list" v-show="showList">
        <li class="obj-sel__elem" v-for="(el) of list" :key="el.id"
            @mouseover="mouseoverElem($event)"
            @mouseout="mouseoutElem($event)"
            @click="select(el)">
          {{ el.title }}
        </li>
      </ul>
      <button class="obj-sel__btn" type="button"
              @click="changeVisibility"
              @blur="blurObj">
        <i class="fa fa-caret-down"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Sorting',
  data() {
    return {
      list: [
        { id: 1, name: 'popular', title: 'популярности' },
        { id: 2, name: 'rating', title: 'рейтингу' },
        { id: 3, name: 'price asc', title: 'цене 🠗' },
        { id: 4, name: 'price desc', title: 'цене 🠕' },
        { id: 5, name: 'title asc', title: 'названию 🠗' },
        { id: 6, name: 'title desc', title: 'названию 🠕' },
      ],
      value: '',
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
      this.value = el.title;
      this.setSortBy(el.name);
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
      setSortBy: 'catalog/setViewSortBy',
    }),
  },
  computed: {
    ...mapGetters({
      sortBy: 'catalog/getSortBy',
    }),
  },
  mounted() {
    this.select(this.list.find((el) => el.name === this.sortBy));
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

button
  border: none
  background: none

$width: 148px
$height: 30px

.obj-sel-label
  height: 30px
  background-color: $clrBackground
  border: 1px solid $clrBorder
  display: flex
  align-items: center
  margin-right: 10px
  .obj-sel
    width: $width
    height: inherit
    border-left: 1px solid $clrBorder
    position: relative
    &__label
      +textCSW($DimGray, 14px, 400)
      text-align: center
      +paddingRL(10px, 10px)
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
      +paddingRL($height + 8px, 12px)
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
      +paddingRL(8px, 12px)
    &__btn
      cursor: pointer
      width: $height
      height: $height
      +textCSW($Silver, 15px, 400)
      padding-top: 2px
      +absoluteTR(0, 0)
      &:hover
        filter: brightness(60%)
      &:active
        filter: brightness(80%)
</style>
