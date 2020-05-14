<template>
  <div>
    <details class="category" v-for="category of categories" :key="`category-${category.id}`"
             v-show="category.categories.length > 0">
      <summary class="category__button">
        <span :class="{ category__button_flagged: category.flagged }">{{ category.type }}</span>
        <i class="fa fa-caret-down"></i>
      </summary>
      <ul class="category__list">
        <li v-for="item of category.categories" :key="item.id">
          <span class="category__switch" :class="{ category__switch_active: item.flag }"
                @click="switchCategory(category, item)">
            {{ item.title }}
          </span>
        </li>
      </ul>
    </details>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Categories',
  props: {
    vFetchData: { type: Function, required: true },
  },
  data() {
    return {
      name: 'categories',
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
    switchCategory(type, category) {
      this.switchFlag({
        name: this.name,
        type: type.id,
        category: category.id,
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
      isEmpty: 'catalog/isEmptyConfigCategories',
      categories: 'catalog/getConfigCategories',
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
