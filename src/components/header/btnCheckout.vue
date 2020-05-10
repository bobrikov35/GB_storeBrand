<template>
  <button class="button" :class="vClass" type="button">
    <i class="fa fa_left" :class="vAwesome" v-if="vIcon === 'left' && vAwesome !== 'none'"/>
    {{ vTitle }}
    <i class="fa fa_right" :class="vAwesome" v-if="vIcon === 'right' && vAwesome !== 'none'"/>
  </button>
</template>

<script>
export default {
  name: 'btnCheckout',
  props: {
    vTitle: { default: 'Кнопка' },
    vAwesome: { default: 'none' },
    vIcon: { default: 'none' },
    vClass: { default: '' },
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
  width: 228px
  height: 48px
  +textCSWT($clrBrand, 14px, 700, uppercase)
  background-color: $clrBackground
  border: 1px solid $clrBrand2
  border-radius: 3px
  display: flex
  justify-content: center
  align-items: center
  padding: 11px 16px
  margin: 28px auto 12px
  &:hover
    color: white
    background-color: $clrBrand2
    filter: saturate(115%)
    border: none
  &:hover > .svg-cart
    fill: white
  &:active
    color: white
    background-color: $clrBrand2
    filter: saturate(85%)
    border: none
  &:active > .svg-cart
    fill: white
  .fa
    &_right
      margin-left: 14px
    &_left
      margin-right: 14px
</style>
