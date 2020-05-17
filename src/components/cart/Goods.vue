<template>
  <table class="cart-table">
    <thead>
      <tr>
        <th>Описание товара</th>
        <th>Цена</th>
        <th>Количество</th>
        <th>Доставка</th>
        <th>Общая стоимость</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product of goods" :key="product.id">
        <td>
          <router-link :to="{name: 'Single', params: {id: product.id}}" class="cart-table__product">
            <img :src="getImageUrl(product)" alt="Product">
            <div class="cart-table__description">
              <h3 class="cart-table__description_title">{{ product.title }}</h3>
              <p class="cart-table__description_text">Цвет:<span>{{ product.color.title }}</span></p>
              <p class="cart-table__description_text">Размер:<span>{{ product.data.size }}</span></p>
            </div>
          </router-link>
        </td>
        <td>{{ product.price }}<i class="fa fa-rub"/></td>
        <td>
          <editQuantity :vProduct="product"/>
        </td>
        <td>Бесплатно</td>
        <td>{{ product.price * product.data.quantity}}<i class="fa fa-rub"/></td>
        <td>
          <button class="cart-table__delete">
            <i class="fa fa-times-circle" @click="deleteFromCart(product)"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import editQuantity from '@/components/cart/editQuantity.vue';

export default {
  name: 'Goods',
  components: {
    editQuantity,
  },
  methods: {
    deleteFromCart(product) {
      const prod = JSON.parse(JSON.stringify(product));
      prod.data.quantity += 1;
      this.remove(prod);
    },
    getImageUrl(prod) {
      if (!prod) return '#';
      const i = prod.url.lastIndexOf('.');
      return `${prod.url.slice(0, i)}${prod.img.current}${prod.url.slice(i)}`;
    },
    ...mapActions({
      remove: 'cart/remove',
    }),
  },
  computed: {
    ...mapGetters({
      goods: 'cart/get',
    }),
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

button
  border: none
  background: none

.cart-table
  width: $siteWidth
  & th, & td
    width: 12%
    text-align: center
    border-bottom: 1px solid $clrBorder
    +paddingTB(20px, 20px)
    &:first-of-type
      width: 44%
      text-align: left
    &:last-of-type
      width: 8%
  & th
    +textCSWT($clrText, 13px, 700, uppercase)
  & td
    +textCSWT($DimGray, 13px, 400, uppercase)
  & .fa
    font-size: 12px
    margin-left: 4px
  &__product
    display: flex
    &:hover
      +shadow-medium
    &:hover > img
      filter: brightness(50%)
    &:active
      +shadow-press
    & img
      width: 100px
      margin-right: 22px
  &__description
    +marginTB(12px, 12px)
    &_title
      color: $clrText
      margin-bottom: 32px
    &_text
      +textCSWHT($DavyGrey, 13px, 600, 20px, none)
      & span
        +textCSWT($DimGray, 13px, 400, none)
        margin-left: 4px
  &__delete
    cursor: pointer
    overflow: hidden
    width: 14px
    height: 14px
    border-radius: 50%
    display: flex
    justify-content: center
    align-items: center
    margin: 0 auto
    & .fa
      +textCSW($Silver, 16px, 400)
      text-align: left
      margin: -1px 0 0
      &:hover
        color: $clrBrand
        filter: saturate(115%)
      &:active
        filter: saturate(85%)
</style>
