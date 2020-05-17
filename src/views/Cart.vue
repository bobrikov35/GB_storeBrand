<template>
  <div>
    <Breadcrumb/>
    <section class="cart-page">
      <div class="cart-page__container">
        <Goods/>
        <div class="cart-page__control">
          <btnClear vTitle="Очистить корзину"/>
          <btnContinueShopping vTitle="Продолжить покупку"/>
        </div>
        <footer class="cart-page__footer">
          <form class="cart-page__address" action="#">
            <h3 class="cart-page__footer_title">Адрес доставки</h3>
            <selectRegion vID="cart-regions" vPlaceholder="Выберите регион"/>
            <editSelectCity vID="cart-cities" vPlaceholder="Введите ваш город"/>
            <editPostcode vID="cart-postcode" vPlaceholder="Введите почтовый индекс"/>
            <btnGetQuote vTitle="Произвести расчет"/>
          </form>
          <form class="cart-footer__discount" action="#">
            <h3 class="cart-page__footer_title">Скидочный купон</h3>
            <p class="cart-page__footer_text">Введите номер Вашего купона, если он есть</p>
            <editCoupon vID="cart-coupon" vPlaceholder="Введите скидочный купон"/>
            <btnApplyCoupon vTitle="Применить купон"/>
          </form>
          <div class="cart-page__checkout">
            <h4 class="cart-page__checkout_sub-total">
              Промежуточный итог<span>{{ cost }} <i class="fa fa-rub"></i></span>
            </h4>
            <h3 class="cart-page__checkout_grand-total">
              Общая сумма<span>{{ cost }} <i class="fa fa-rub"></i></span>
            </h3>
            <btnProceed vTitle="Перейти к оформлению"/>
          </div>
        </footer>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb.vue';
import Goods from '@/components/cart/Goods.vue';
import btnClear from '@/components/cart/btnClear.vue';
import btnContinueShopping from '@/components/cart/btnContinueShopping.vue';
import selectRegion from '@/components/cart/selectRegion.vue';
import editSelectCity from '@/components/cart/editSelectCity.vue';
import editPostcode from '@/components/cart/editPostcode.vue';
import btnGetQuote from '@/components/cart/btnGetQuote.vue';
import editCoupon from '@/components/cart/editCoupon.vue';
import btnApplyCoupon from '@/components/cart/btnApplyCoupon.vue';
import btnProceed from '@/components/cart/btnProceed.vue';

export default {
  name: 'CartPage',
  components: {
    Breadcrumb,
    Goods,
    btnClear,
    btnContinueShopping,
    selectRegion,
    editSelectCity,
    editPostcode,
    btnGetQuote,
    editCoupon,
    btnApplyCoupon,
    btnProceed,
  },
  methods: {
    removeFromCart(prod) {
      const product = JSON.parse(JSON.stringify(prod));
      this.$set(product, 'quantity', product.quantity + 1);
      this.remove(product);
    },
    ...mapActions({
      fetchData: 'cart/fetchData',
      setSearch: 'catalog/setConfigSearch',
    }),
  },
  computed: {
    ...mapGetters({
      getQuery: 'catalog/getQuery',
      goods: 'cart/get',
      isEmpty: 'cart/isEmpty',
      cost: 'cart/cost',
    }),
  },
  mounted() {
    document.querySelector('.search__field').value = '';
    this.setSearch([]);
    this.fetchData();
  },
};
</script>

<style scoped lang="sass">
@import '../styles/var', '../styles/mixins'

.cart-page
  background-color: $clrBackground
  +marginTB(70px, 80px)
  &__container
    width: $siteWidth
    margin: 0 auto
  &__control
    display: flex
    justify-content: space-between
    +marginTB(44px, 66px)

  &__btn
    width: 230px
    height: 48px
    font-weight: 700
    text-transform: uppercase

  &__footer
    display: flex
    justify-content: space-between
    &_title
      +textCSWT($clrText, 16px, 700, uppercase)
      margin-bottom: 20px
    &_text
      +textCSW($clrText, 14px, 400)
      margin-bottom: 20px
  &__adress
    width: 360px
    display: flex
    flex-direction: column

  &__footer-btn
    +textCSWT($OuterSpace, 13px, 700, uppercase)
    margin-top: 20px

  &__checkout
    width: 360px
    height: 214px
    background-color: $WhiteSmoke
    display: flex
    flex-direction: column
    padding: 40px 44px
    &_sub-total
      width: 272px
      +textCSWT($OuterSpace, 11px, 400, uppercase)
      text-align: right
      & span
        margin-left: 16px
      & .fa
        font-size: 10px
    &_grand-total
      width: 272px
      +textCSWT($clrText, 16px, 700, uppercase)
      text-align: right
      margin-top: 14px
      padding-bottom: 22px
      border-bottom: 1px solid $clrBorder
      & span
        color: $clrBrand
        margin-left: 16px
      & .fa
        font-size: 15px
</style>
