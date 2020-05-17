<template>
  <button class="button" :class="vClass" type="button">
    <i class="fa fa_left" :class="vAwesome" v-if="vIcon === 'left' && vAwesome !== 'none'"/>
    {{ vTitle }}
    <i class="fa fa_right" :class="vAwesome" v-if="vIcon === 'right' && vAwesome !== 'none'"/>
  </button>
</template>

<script>
export default {
  name: 'btnAccount',
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
  width: 272px
  height: 48px
  +textCSWT(white, 16px, 400, uppercase)
  background-color: $clrBrand
  border-radius: 3px
  display: flex
  justify-content: center
  align-items: center
  padding: 11px 16px
  margin: 18px auto 0
  &:hover
    filter: saturate(115%)
  &:active
    filter: saturate(85%)
  .fa
    &_right
      margin-left: 14px
    &_left
      margin-right: 14px
</style>
