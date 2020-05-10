<template>
  <div class="product"
       @mouseenter="mouseEnter"
       @mouseleave="mouseLeave"
       @mousedown="mouseDown($event)"
       @click.self="goto">
    <div class="product__image">
      <img :src="imageUrl()" :alt="vProduct.id">
    </div>
    <table class="product__description">
      <tr><td class="product__title" colspan="2">{{ vProduct.title }}</td></tr>
      <tr>
        <td class="product__price">{{ vProduct.price }}<i class="fa fa-rub"></i></td>
        <td class="product__rating">
          <span v-for="n in 5" :key="n">
            <i class="fa fa-star" v-if="vProduct.rating >= n"></i>
            <i class="fa fa-star-half-o" v-else-if="vProduct.rating >= (n - 0.5)"></i>
            <i class="fa fa-star-o" v-else></i>
          </span>
        </td>
      </tr>
    </table>
    <div class="product__control">
      <btnAddToCart :vProduct="vProduct" vTitle="В корзину" vType="cart" vIcon="left"/>
      <btnRefresh Style_="margin-top: 8px;" vType="refresh" vIcon="left" v-if="vAddition"/>
      <btnLike Style_="margin-top: 8px;" vType="heart" vIcon="left" v-if="vAddition"/>
    </div>
  </div>
</template>

<script>
import Getters from '@/libs/getters';
import btnAddToCart from '@/components/product/btnAddToCart.vue';
import btnRefresh from '@/components/product/btnRefresh.vue';
import btnLike from '@/components/product/btnLike.vue';

export default {
  name: 'Product',
  components: {
    btnAddToCart,
    btnRefresh,
    btnLike,
  },
  props: {
    vProduct: { required: true },
    vAddition: { type: Boolean, default: true },
  },
  data() {
    return {
      clickOn: false,
    };
  },
  methods: {
    goto() {
      if (this.clickOn) {
        this.clickOn = false;
        this.$router.push({ name: 'Single', params: { id: this.vProduct.id } });
      }
    },
    mouseEnter() {
      this.$el.classList.add('product_mouseenter');
    },
    mouseLeave() {
      this.$el.classList.remove('product_mouseenter');
    },
    mouseDown(event) {
      if (event.target.classList.contains('product')) {
        this.clickOn = true;
        this.$el.classList.add('product_mousedown');
      }
    },
    mouseUp(event) {
      if (!event.target.classList.contains('product')) this.clickOn = false;
      this.$el.classList.remove('product_mousedown');
    },
    imageUrl() {
      return Getters.getMainImageUrl(this.vProduct);
    },
  },
  mounted() {
    document.addEventListener('mouseup', this.mouseUp);
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

.product
  cursor: pointer
  width: $productWidthM
  min-height: $productHeightM + 92px
  position: relative
  &:hover .product__image
    filter: brightness(50%)
  &:hover .product__control
    display: flex
  &__image
    pointer-events: none
    height: $productHeightM
    overflow: hidden
    display: flex
    justify-content: center
    align-items: center
    & img
      width: $productWidthM
  &__description
    pointer-events: none
    width: $productWidthM
    min-height: 92px
    border-spacing: 12px
    padding: 8px 0
    & tr
      width: $productWidthM - 28px
  &__title
    +textCSWHT($clrText, 13px, 700, 12px, uppercase)
  &__price
    width: ($productWidthM - 28px) / 5 * 3
    +textCSWHT($clrBrand, 16px, 700, 14px, uppercase)
    & .fa
      font-size: 15px
      +marginTL(-1px, 4px)
  &__rating
    width: ($productWidthM - 28px) / 5 * 2
    +textCSWH($MeatBrown, 15px, 400, 13px)
    text-align: right
  &__control
    width: 128px
    display: none
    justify-content: space-between
    flex-wrap: wrap
    +absoluteTL($productHeightM / 2 - 48px, $productWidthM / 2 - 128px / 2)
  &_mouseenter
    +shadow-large
  &_mousedown
    +shadow-press
    & .product__image
      filter: brightness(50%)
</style>
