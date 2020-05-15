<template>
  <section class="goods" >
    <header class="goods__header">
      <h2 class="goods__title">С этим товаром покупали</h2>
    </header>
    <div class="goods__container" v-if="!isEmpty">
      <Product v-for="product of catalog" :key="product.id"
               :vProduct="product"
               :vAddition="false">
      </Product>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Product from '@/components/product/Product.vue';

export default {
  name: 'Goods',
  components: {
    Product,
  },
  computed: {
    ...mapGetters({
      catalog: 'catalog/get',
      isEmpty: 'catalog/isEmpty',
    }),
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

.goods
  background-color: $clrBackground
  +marginTB(98px, 78px)
  &__header
    width: $siteWidth - 400px
    margin: 0 auto 64px
  &__title
    +textCSWT($Liver, 24px, 900, uppercase)
    text-align: center
  &__container
    width: $siteWidth
    min-height: 440px
    display: grid
    grid-gap: 32px
    grid-template-columns: repeat(4, 1fr)
    margin: 0 auto
</style>
