<template>
  <button class="button" :class="vClass" type="button">
    <i class="fa fa_left" :class="vAwesome" v-if="vIcon === 'left' && vAwesome !== 'none'"/>
    {{ vTitle }}
    <i class="fa fa_right" :class="vAwesome" v-if="vIcon === 'right' && vAwesome !== 'none'"/>
  </button>
</template>

<script>
export default {
  name: 'btnContinueShopping',
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
  +textCSWT($OuterSpace, 14px, 700, uppercase)
  background-color: $clrBackground
  border: 1px solid $Platinum
  border-radius: 3px
  display: flex
  justify-content: center
  align-items: center
  padding: 11px 16px
  &:hover
    background-color: $Platinum + #070707
    border: none
  &:active
    background-color: $Platinum - #070707
    border: none
  .fa
    &_right
      margin-left: 14px
    &_left
      margin-right: 14px
</style>
