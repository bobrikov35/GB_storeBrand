<template>
  <nav class="breadcrumb">
    <div class="breadcrumb__container">
      <h2 class="breadcrumb__title">Новые поступления</h2>
      <ul class="breadcrumb__menu">
        <li><router-link to="/" class="breadcrumb__link">Главная</router-link></li>
        <li><router-link to="#" class="breadcrumb__link">Каталог</router-link></li>
        <li><router-link to="#" class="breadcrumb__link">Новые поступления</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumb',
};
</script>

<style scoped lang="sass">
@import '../styles/var', '../styles/mixins'

.breadcrumb
  background-color: $PinkSmoke
  &__container
    width: $siteWidth
    height: 148px
    display: flex
    justify-content: space-between
    align-items: center
    margin: 0 auto
  &__title
    +textCSWT($clrBrand, 24px, 900, uppercase)
  &__menu
    display: flex
    justify-content: flex-end
    & li + li:before
      content: '/'
      +textCSW($DimGray, 14px, 300)
      +marginRL(4px, 4px)
  &__link
    cursor: pointer
    +textCSWHT($DimGray, 14px, 300, 14px, uppercase)
    &:hover
      text-decoration: underline
    &:active
      color: $clrBrand
      filter: saturate(85%)
    &_active
      pointer-events: none
      color: $clrBrand
      font-weight: 700
      &:hover
        color: $DimGray
      &:active
        color: $DimGray
</style>
