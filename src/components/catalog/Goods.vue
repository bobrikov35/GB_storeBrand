<template>
  <section class="catalog" v-show="!isEmpty">
    <div class="catalog__content">
      <Product v-for="(el, i) of catalog" :key="el.id" :vProduct="el" :Addition="false"
               v-show="page === 0 || (i + 1 > (page - 1) * quantity && i + 1 <= page * quantity)"/>
    </div>
    <footer class="catalog__footer">
      <Pagination :class="{ catalog_hide: page === 0 }"/>
      <btnShowAll Title="Показать все" :Click="setPage" v-show="page !== 0"/>
      <btnShowAllActive Title="Показать постранично" :Click="setPage" v-show="page === 0"/>
    </footer>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Product from '@/components/product/Product.vue';
import Pagination from '@/components/catalog/Pagination.vue';
import btnShowAll from '@/components/catalog/btnShowAll.vue';
import btnShowAllActive from '@/components/catalog/btnShowAllActive.vue';

export default {
  name: 'Goods',
  components: {
    Product,
    Pagination,
    btnShowAll,
    btnShowAllActive,
  },
  methods: {
    ...mapActions({
      setPage: 'catalog/setViewPage',
    }),
  },
  computed: {
    ...mapGetters({
      isEmpty: 'catalog/isEmpty',
      catalog: 'catalog/getFiltered',
      page: 'catalog/getPage',
      quantity: 'catalog/getQuantity',
    }),
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

.catalog
  background-color: $clrBackground
  &__content
    width: $siteWidth - 290px
    display: grid
    grid-template-columns: repeat(3, 1fr)
    grid-gap: 32px
    margin: 48px auto
  &__footer
    width: $siteWidth
    display: flex
    justify-content: center
    margin: 0 auto
  &__footer
    width: inherit
    display: flex
    justify-content: space-between
  &_hide
    visibility: hidden
</style>
