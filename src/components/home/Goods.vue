<template>
  <section class="featured" v-show="!isEmpty">
    <header class="featured__header">
      <h2 class="featured__title">Рекомендуемые товары</h2>
      <p class="featured__direction">Покупайте товары на основе наших рекомендаций</p>
    </header>
    <div class="featured__catalog">
      <Product v-for="product of catalog" :key="product.id" :vProduct="product" :vAddition="true"/>
    </div>
    <footer class="featured__footer">
      <btnShowAll vTitle="Показать все товары" vIcon="right" vAwesome="fa-long-arrow-right"/>
    </footer>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Product from '@/components/product/Product.vue';
import btnShowAll from '@/components/home/btnShowAll.vue';

export default {
  name: 'Goods',
  components: {
    Product,
    btnShowAll,
  },
  methods: {
    ...mapActions({
      fetchData: 'catalog/fetchData',
    }),
  },
  computed: {
    ...mapGetters({
      isEmpty: 'catalog/isEmpty',
      catalog: 'catalog/get',
    }),
  },
  mounted() {
    this.fetchData('sortBy={"sold": "desc"}&quantity=8');
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

.featured
  background-color: $clrBackground
  +marginTB(98px, 98px)
  &__header
    width: $siteWidth - 400px
    margin: 0 auto 64px
  &__title
    +textCSW($clrText, 30px, 700)
    text-align: center
    margin-bottom: 10px
  &__direction
    color: $Manatee
    text-align: center
  &__catalog
    width: $siteWidth
    display: grid
    grid-template-columns: repeat(4, 1fr)
    grid-gap: 32px
    margin: 0 auto
  &__footer
    width: $siteWidth
    display: flex
    justify-content: center
    margin: 0 auto
</style>
