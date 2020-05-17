<template>
  <nav class="sidebar">
    <Categories :vFetchData="updateData"/>
    <Brands :vFetchData="updateData"/>
    <Colors :vFetchData="updateData"/>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Categories from '@/components/catalog/Categories.vue';
import Brands from '@/components/catalog/Brands.vue';
import Colors from '@/components/catalog/Colors.vue';

export default {
  name: 'Sidebar',
  components: {
    Categories,
    Brands,
    Colors,
  },
  methods: {
    updateData() {
      if (this.$route.params.page === 'all') {
        this.fetchData(this.getQuery);
      } else {
        this.fetchData(`page=${this.$route.params.page}&${this.getQuery}`);
      }
    },
    ...mapActions({
      fetchData: 'catalog/fetchData',
    }),
  },
  computed: {
    ...mapGetters({
      getQuery: 'catalog/getQuery',
      searchList: 'catalog/getSearchList',
      categories: 'catalog/getConfigCategories',
      brands: 'catalog/getConfigBrands',
      colors: 'catalog/getConfigColors',
    }),
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

details > summary
  list-style: none

summary::-webkit-details-marker
  display: none

.sidebar
  width: 244px
  display: flex
  flex-direction: column
  &__category
    cursor: pointer
    margin-bottom: 18px
    &[open] > .sidebar__button
      color: $clrBrand
    &[open] > .sidebar__button i
      transform: rotateZ(-180deg)
      color: $clrBrand
      top: 38px / 2 - 14px / 2 - 1px
  &__button
    height: 38px
    +textCSWT($DimGray, 14px, 700, uppercase)
    border-left: 5px solid $clrBrand2
    border-bottom: 1px solid $clrBorder
    display: flex
    align-items: center
    position: relative
    padding-left: 10px
    & i
      +absoluteTR(38px / 2 - 14px / 2 + 1px, 12px)
  &__list
    cursor: default
    padding: 14px 14px 0
  &__switch
    cursor: pointer
    line-height: 32px
    &:hover
      text-decoration: underline
    &:active
      text-decoration: underline
    &_off
      +textCSW($DimGray, 14px, 400)
      &:active
        color: $clrBrand
    &_on
      +textCSW($clrBrand, 14px, 400)
      &:active
        color: $DimGray
</style>
