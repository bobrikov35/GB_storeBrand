<template>
  <router-link to="/" class="logo">
    <img class="logo__image" src="@/assets/logo.png" alt="logo">
    <p class="logo__text">Bran<span class="logo__text_brand">d</span></p>
  </router-link>
</template>

<script>
export default {
  name: 'Logo',
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

.logo
  display: flex
  align-items: center
  &__image
    pointer-events: none
    margin-right: 12px
  &__text
    +textCSWHT($RifleGreen, 27px, 400, 25px, uppercase)
    padding-top: 1px
    &_brand
      color: $clrBrand
      font-weight: 900
</style>
