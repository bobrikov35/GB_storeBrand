<template>
  <div class="product">
    <router-link :to="{name: 'Single', params: {id: vProduct.id}}" class="product__link">
      <img class="product__image" :src="imageUrl()" alt="product">
      <div class="product__description">
        <h2 class="product__title">{{ vProduct.title }}</h2>
        <p class="product__rating">
          <span v-for="n in 5" :key="n">
            <i v-if="vProduct.rating >= n" class="fa fa-star" ></i>
            <i v-else-if="vProduct.rating >= (n - 0.5)" class="fa fa-star-half-o"></i>
            <i v-else class="fa fa-star-o"></i>
          </span>
        </p>
        <h3 class="product__size">Размер: {{ vProduct.data.size }}</h3>
        <h3 class="product__price">{{ vProduct.data.quantity }} x {{ vProduct.price }}<i class="fa fa-rub"></i></h3>
      </div>
    </router-link>
    <div class="product__delete">
      <button class="product__remove" @click="removeFromCart"><i class="fa fa-times-circle"></i></button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Getters from '@/libs/getters';

export default {
  name: 'CartProduct',
  props: {
    vProduct: { required: true },
  },
  methods: {
    removeFromCart() {
      const newProduct = JSON.parse(JSON.stringify(this.vProduct));
      newProduct.data.quantity = 1;
      this.remove(newProduct);
    },
    imageUrl() {
      return Getters.getMainImageUrl(this.vProduct);
    },
    ...mapActions({
      remove: 'cart/remove',
    }),
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

button
  border: none
  background: none

.product
  width: 234px
  min-height: $productHeightS
  border-bottom: 1px solid $clrBorder
  display: flex
  padding-bottom: 12px
  margin-bottom: 16px
  &__link
    display: flex
    margin-right: 8px
    &:hover
      +shadow-medium
    &:hover > .product__image
      filter: brightness(50%)
    &:active
      +shadow-press
  &__image
    width: $productWidthS
  &__description
    width: 228px - $productWidthS - 14px
    text-transform: uppercase
    display: flex
    flex-direction: column
    padding: 10px 8px 10px 12px
  &__title
    +textCSWH($clrText, 12px, 700, 12px)
    margin-bottom: 8px
  &__rating
    +textCSWH($clrRating, 12px, 400, 12px)
    margin-bottom: 10px
  &__size
    +textCSWH($clrText, 10px, 400, 10px)
    margin-bottom: 6px
  &__price
    +textCSWH($clrBrand, 10px, 400, 10px)
    & .fa
      margin-left: 2px
  &__delete
    display: flex
    align-items: center
  &__remove
    cursor: pointer
    overflow: hidden
    height: 14px
    +textCSW($Silver, 16px, 400)
    border-radius: 50%
    display: flex
    &:hover
      color: $clrBrand
      filter: saturate(115%)
    &:active
      filter: saturate(85%)
    & .fa
      margin-top: -1px
</style>
