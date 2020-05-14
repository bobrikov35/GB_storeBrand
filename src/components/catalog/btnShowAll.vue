<template>
  <button class="button" :style="Style_" type="button" @click="Click(0)">
    <i class="fa fa_left" :class="Awesome" v-if="Icon === 'left' && Awesome !== ''"/>
    {{ Title }}
    <i class="fa fa_right" :class="Awesome" v-if="Icon === 'right' && Awesome !== ''"/>
  </button>
</template>

<script>
export default {
  name: 'btnShowAll',
  props: {
    Click: { type: Function, requared: true },
    Title: { default: 'Кнопка' },
    Style_: { default: '' },
    Icon: { default: '' },
    Awesome: { default: '' },
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
  width: 148px
  height: 44px
  +textCSW($clrBrand, 16px, 400)
  background-color: $clrBackground
  border: 1px solid $clrBrand2
  border-radius: 3px
  display: flex
  justify-content: center
  align-items: center
  padding: 11px 16px
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
