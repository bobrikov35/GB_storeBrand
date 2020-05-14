<template>
  <details class="category" v-show="!isEmpty">
    <summary class="category__button">
      <span :class="{ category__button_flagged: isFlagged }">Цвет</span><i class="fa fa-caret-down"></i>
    </summary>
    <ul class="category__list">
      <li class="category__elem" v-for="color of colors" :key="color.id">
        <span class="category__square" :style="bgColor(color.value)"/>
        <span class="category__switch" :class="{ category__switch_active: color.flag }"
              @click="switchBrand(color)">
          {{ color.title }}
        </span>
      </li>
    </ul>
  </details>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Colors',
  props: {
    vFetchData: { type: Function, required: true },
  },
  data() {
    return {
      name: 'colors',
    };
  },
  methods: {
    init() {
      if (this.$route.params.page === 'all') {
        this.fetchData({ title: this.name, query: '' });
      } else {
        this.fetchData({ title: this.name, query: `page=${this.$route.params.page}` });
      }
    },
    switchBrand(color) {
      this.switchFlag({
        name: this.name,
        id: color.id,
      });
      this.vFetchData();
    },
    bgColor(color) {
      return `background-color: ${color};`;
    },
    ...mapActions({
      fetchData: 'catalog/fetchConfig',
      switchFlag: 'catalog/switchConfig',
    }),
  },
  computed: {
    ...mapGetters({
      isEmpty: 'catalog/isEmptyConfigColors',
      isFlagged: 'catalog/isFlaggedConfigColors',
      colors: 'catalog/getConfigColors',
    }),
  },
  watch: {
    '$route.params.page': 'init',
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

details > summary
  list-style: none

summary::-webkit-details-marker
  display: none

.category
  margin-bottom: 18px
  &[open] > .category__button .fa
    transform: rotateZ(-180deg)
    color: $clrBrand
    top: 38px / 2 - 14px / 2 - 1px
  &__button
    cursor: pointer
    height: 38px
    +textCSWT($DimGray, 14px, 700, uppercase)
    border-left: 5px solid $clrBrand2
    border-bottom: 1px solid $clrBorder
    display: flex
    align-items: center
    position: relative
    padding-left: 10px
    &:hover
      border-bottom: 1px solid $DimGray
      border-left: 5px solid $clrBrand2
      filter: saturate(115%)
    &:active
      border-bottom: 1px solid $DimGray
      border-left: 5px solid $clrBrand2
      filter: saturate(85%)
    & .fa
      +absoluteTR(38px / 2 - 14px / 2 + 1px, 12px)
    &_flagged
      color: $clrBrand
  &__list
    padding: 14px 14px 0
  &__elem
    position: relative
  &__square
    pointer-events: none
    width: 12px
    height: 12px
    border: 1px solid $clrBorder
    display: block
    +absoluteTL(10px, 0)
  &__switch
    cursor: pointer
    +textCSW($DimGray, 14px, 400)
    line-height: 32px
    padding-left: 20px
    &:hover
      text-decoration: underline
    &:active
      color: $clrBrand
      text-decoration: underline
    &_active
      color: $clrBrand
      &:active
        color: $DimGray
</style>
