<template>
  <button class="button" :class="vClass" type="button" @click.stop="vClick">
    <svgCart vSize="medium" vType="brand" vClass="cart_left" v-if="vIcon === 'left' && vType === 'cart'"/>
    <span :class="{ button__icon_right: vIcon === 'right' && vTitle, button__icon_left: vIcon === 'left' && vTitle }">
      {{ vTitle }}
    </span>
    <svgCart vSize="medium" vType="brand" vClass="cart_right" v-if="vIcon === 'right' && vType === 'cart'"/>
  </button>
</template>

<script>
import svgCart from '@/components/icons/svgCart.vue';

export default {
  name: 'btnBrand',
  props: {
    vClick: { type: Function, requared: true },
    vTitle: { default: '' },
    vType: { default: '' },
    vIcon: { default: 'none' },
    vClass: { default: '' },
  },
  components: {
    svgCart,
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

button
  border: none
  background: none

.button
  cursor: pointer
  width: 570px
  height: 54px
  +textCSW($clrBrand, 16px, 700)
  background-color: $clrBackground
  border: 1px solid $clrBrand2
  border-radius: 3px
  display: flex
  justify-content: center
  align-items: center
  padding: 11px 16px
  margin-left: 29px
  &:hover
    color: white
    background-color: $clrBrand2
    border: none
    filter: saturate(115%)
  &:hover > .cart_left
    fill: white
  &:hover > .cart_right
    fill: white
  &:active
    color: white
    background-color: $clrBrand2
    border: none
    filter: saturate(85%)
  &:active > .cart_left
    fill: white
  &:active > .cart_right
    fill: white

.cart
  &_right
    margin-left: 14px
  &_left
    margin-right: 14px
</style>
