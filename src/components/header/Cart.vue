<template>
  <div class="cart">
    <router-link to="/cart" class="cart__icon">
      <svgCart vType="main"/>
      <div class="cart__count" v-show="!isEmpty">
        <p class="cart__count_text">{{ count }}</p>
      </div>
    </router-link>
    <div class="dropdown cart__dropdown" v-show="!isEmpty">
      <div class="dropdown__content">
        <span class="dropdown__triangle dropdown__triangle_shadow"></span>
        <span class="dropdown__triangle"></span>
        <CartProduct v-for="product of goods" :key="`${product.id}-${product.data.size}`" :vProduct="product"/>
        <div class="cart__total">
          <span>Итог</span>
          <span>{{ cost }} <i class="fa fa-rub"></i></span>
        </div>
        <btnCheckout vTitle="Регистрация"/>
        <btnGoto vTitle="Перейти в корзину"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import svgCart from '@/components/icons/svgCart.vue';
import CartProduct from '@/components/header/CartProduct.vue';
import btnCheckout from '@/components/header/btnCheckout.vue';
import btnGoto from '@/components/header/btnGoto.vue';

export default {
  name: 'Cart',
  components: {
    svgCart,
    CartProduct,
    btnCheckout,
    btnGoto,
  },
  data() {
    return {
      timeout: null,
    };
  },
  methods: {
    mouseEnter() {
      if (this.isEmpty) return;
      if (this.timeout !== null) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      const cart = this.$el.querySelector('.cart__dropdown');
      if (cart.style.display !== 'flex') {
        cart.style.display = 'flex';
      }
    },
    mouseLeave() {
      if (this.timeout === null) {
        const cart = this.$el.querySelector('.cart__dropdown');
        this.timeout = setTimeout(() => {
          cart.style.display = 'none';
        }, 333);
      }
    },
    ...mapActions({
      fetchData: 'cart/fetchData',
    }),
  },
  computed: {
    ...mapGetters({
      isEmpty: 'cart/isEmpty',
      goods: 'cart/get',
      count: 'cart/count',
      cost: 'cart/cost',
    }),
  },
  mounted() {
    this.fetchData();
    const icon = this.$el.querySelector('.cart__icon');
    icon.addEventListener('mouseenter', this.mouseEnter);
    icon.addEventListener('mouseleave', this.mouseLeave);
    const cart = this.$el.querySelector('.cart__dropdown');
    cart.addEventListener('mouseenter', this.mouseEnter);
    cart.addEventListener('mouseleave', this.mouseLeave);
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

$width: 32px
$height: 29px

.cart
  width: $width
  height: $height
  display: flex
  justify-content: center
  align-items: center
  padding-top: 3px
  position: relative
  margin-right: 25px
  &__icon
    width: $width
    height: $height
    overflow: hidden
    &:hover > .svg-std
      stroke: $clrBrand
      fill: $clrBackground
    &:hover > .cart__count
      background-color: $clrBackground
      border: 1px solid $clrBrand
    &:hover > .cart__count .cart__count_text
      color: $clrBrand
    &:active > .svg-std
      stroke: none
      fill: $clrBrand
    &:active > .cart__count
      background-color: $clrBrand2
      border: none
    &:active > .cart__count .cart__count_text
      color: white
  &__count
    width: 20px
    height: 20px
    overflow: hidden
    background-color: $clrBrand2
    border-radius: 50%
    display: flex
    justify-content: center
    align-items: center
    +absoluteTL(-8px, 20px)
    &_text
      +textCSW(white, 12px, 700)
      margin-top: -1px
  &__dropdown
    cursor: default
    +paddingTB(20px, 20px)
    +absoluteTL(44px, -98px)
    .dropdown__triangle
      left: 112px
      &_shadow
        left: 114px
  &__total
    +textCSWHT($clrText, 16px, 700, 16px, uppercase)
    display: flex
    justify-content: space-between
</style>
