<template>
  <section class="slider">
    <div class="slider__container">
      <img class="slider__image" src="@/assets/banners/slider_home.jpg" alt="slider">
      <div class="slider__text">
        <h2 class="slider__title">The Brand</h2>
        <h3 class="slider__subtitle">Of Luxerious<span class="slider__subtitle_brand">Fashion</span></h3>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Slider',
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

.slider
  background-color: $Platinum
  &__container
    width: $siteWidth
    height: 615px
    overflow: hidden
    position: relative
    margin: 0 auto
  &__image
    margin-left: -230px
  &__text
    pointer-events: none
    border-left: 12px solid $clrBrand2
    +absoluteTL(225px, 0)
  &__title
    +textCSWHT($clrText, 60px, 900, 45px, uppercase)
    +marginBL(15px, 12px)
  &__subtitle
    +textCSWHT($clrText, 40px, 900, 31px, uppercase)
    margin-left: 12px
    &_brand
      color: $clrBrand
</style>
