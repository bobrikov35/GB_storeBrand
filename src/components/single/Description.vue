<template>
  <section class="description" v-if="!isEmpty">
    <div class="description__container">
      <h2 class="description__title">
        <span class="description__title_text">{{ product.collection }}</span>
        <span class="description__title_border"></span>
      </h2>
      <h3 class="description__name">{{ product.title }}</h3>
      <div class="description__rating">
        <span v-for="n in 5" :key="n">
          <i class="fa fa-star" v-if="product.rating >= n"></i>
          <i class="fa fa-star-half-o" v-else-if="product.rating >= (n - 0.5)"></i>
          <i class="fa fa-star-o" v-else></i>
        </span>
      </div>
      <p class="description__text" v-html="product.description"/>
      <div class="description__inform">
        <h4 class="description__subtitle">Состав:
          <span class="description__subtitle_value">{{ product.material }}</span>
        </h4>
        <h4 class="description__subtitle">Бренд:
          <span class="description__subtitle_value">{{ product.brand }}</span>
        </h4>
      </div>
      <h3 class="description__price">{{ product.price }}<i class="fa fa-rub"></i></h3>
      <form action="#">
        <div class="description__filter">
          <div class="description__option">
            <h3 class="description__option_title">Цвет</h3>
            <selectColor/>
          </div>
          <div class="description__option">
            <h3 class="description__option_title">Размер</h3>
            <selectSize vID="single-size" vPlaceholder="Размер"/>
          </div>
          <div class="description__option">
            <h3 class="description__option_title">Количество</h3>
            <editQuantity vID="single-quantity"/>
          </div>
        </div>
        <btnAddToCart vTitle="Добавить в корзину" vIcon="left" vType="cart" :vClick="addToCart"/>
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import selectColor from '@/components/single/selectColor.vue';
import selectSize from '@/components/single/selectSize.vue';
import editQuantity from '@/components/single/editQuantity.vue';
import btnAddToCart from '@/components/single/btnAddToCart.vue';

export default {
  name: 'Description',
  components: {
    selectColor,
    selectSize,
    editQuantity,
    btnAddToCart,
  },
  data() {
    return {
      single: this.$parent,
    };
  },
  methods: {
    addToCart() {
      const s = this.$el.querySelector('#single-size').value;
      const q = +this.$el.querySelector('#single-quantity').value;
      if (s.length > 0 && q > 0) {
        const newProduct = JSON.parse(JSON.stringify(this.product));
        const newData = { size: s, quantity: q };
        this.$set(newProduct, 'data', newData);
        this.add(newProduct);
      } else {
        let message = '';
        if (s.length === 0 && q === 0) {
          message = `<p>
                        Перед добавлением товара в корзину необходимо обязательно выбрать размер и количество должно
                        быть не менее одной единицы.
                     </p>`;
        } else if (s.length === 0) {
          message = '<p>Перед добавлением товара в корзину необходимо обязательно выбрать размер</p>';
        } else {
          message = '<p>Перед добавлением товара в корзину количество должно быть не менее одной единицы.</p>';
        }
        this.setMessage(message);
        this.show();
      }
    },
    ...mapActions({
      add: 'cart/add',
      show: 'showPopupMessage',
      setMessage: 'setPopupMessage',
    }),
  },
  computed: {
    ...mapGetters({
      isEmpty: 'product/isEmpty',
      product: 'product/getProduct',
    }),
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

.description
  +marginTB(-88px, 120px)
  &__container
    z-index: 3
    width: $siteWidth
    background-color: $clrBackground
    border: 1px solid $clrBorder
    display: flex
    justify-content: center
    flex-direction: column
    padding: 70px 250px 120px
    margin: 0 auto
  &__title
    +textCSWT($clrBrand, 14px, 700, uppercase)
    text-align: center
    position: relative
    margin-bottom: 30px
    &_text
      border-bottom: 1px solid $clrBorder
      padding-bottom: 14px
    &_border
      width: 64px
      height: 3px
      display: block
      background-color: $clrBrand2
      +absoluteTL(30px, $siteWidth / 2 - 64px / 2 - 250px)
  &__name
    +textCSWT($Liver, 20px, 900, uppercase)
    text-align: center
    margin-bottom: 24px
  &__rating
    +textCSWH($MeatBrown, 15px, 400, 13px)
    text-align: center
    margin-bottom: 24px
  &__text
    +textCSW($DavyGrey, 14px, 300)
    text-align: center
    margin-bottom: 22px
  &__inform
    display: flex
    justify-content: center
    margin-bottom: 32px
  &__subtitle
    +textCSWT($AshGrey, 14px, 700, uppercase)
    margin-left: 44px
    &:first-of-type
      margin-left: 0
    &_value
      color: $clrText
      margin-left: 4px
  &__price
    +textCSW($clrBrand, 24px, 700)
    text-align: center
    border-bottom: 1px solid $clrBorder
    padding-bottom: 36px
    margin-bottom: 58px
    & .fa
      font-size: 22px
      margin-left: 4px
  &__filter
    margin-bottom: 30px
    display: flex
    justify-content: space-around
  &__option
    width: 154px
    &_title
      +textCSWT($clrText, 14px, 700, uppercase)
      margin-bottom: 12px
</style>
