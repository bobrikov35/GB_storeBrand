<template>
  <details class="category" v-show="!isEmpty">
    <summary class="category__button">
      <span :class="{ category__button_flagged: isFlagged }">Бренд</span><i class="fa fa-caret-down"></i>
    </summary>
    <ul class="category__list">
      <li v-for="brand of brands" :key="brand.id">
        <span class="category__switch" :class="{ category__switch_active: brand.flag }"
              @click="switchBrand(brand)">
          {{ brand.title }}
        </span>
      </li>
    </ul>
  </details>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Brands',
  props: {
    vFetchData: { type: Function, required: true },
  },
  data() {
    return {
      name: 'brands',
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
    switchBrand(brand) {
      this.switchFlag({
        name: this.name,
        id: brand.id,
      });
      this.vFetchData();
    },
    ...mapActions({
      fetchData: 'catalog/fetchConfig',
      switchFlag: 'catalog/switchConfig',
    }),
  },
  computed: {
    ...mapGetters({
      isEmpty: 'catalog/isEmptyConfigBrands',
      isFlagged: 'catalog/isFlaggedConfigBrands',
      brands: 'catalog/getConfigBrands',
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
  &__switch
    cursor: pointer
    color: $DimGray
    line-height: 32px
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
