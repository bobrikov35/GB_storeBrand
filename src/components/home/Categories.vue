<template>
  <section class="category">
    <table class="category__container">
      <tr>
        <td class="category__cell" rowspan="2">
          <router-link to="/catalog/men" class="category__item">
            <img class="category__image" src="@/assets/banners/men.jpg" alt="category for men">
            <div class="category__title">
              <h4 class="category__title_h4">Hot Deal</h4>
              <h3 class="category__title_h3">For Men</h3>
            </div>
          </router-link>
        </td>
        <td class="category__cell">
          <router-link to="/catalog/women" class="category__item">
            <img class="category__image" src="@/assets/banners/women.jpg" alt="category for men">
            <div class="category__title">
              <h4 class="category__title_h4">30% offer</h4>
              <h3 class="category__title_h3">Women</h3>
            </div>
          </router-link>
        </td>
      </tr>
      <tr>
        <td class="category__cell" rowspan="2">
          <router-link to="/catalog/kids" class="category__item">
            <img class="category__image" src="@/assets/banners/kids.jpg" alt="category for men">
            <div class="category__title">
              <h4 class="category__title_h4">New Arrivals</h4>
              <h3 class="category__title_h3">For Kids</h3>
            </div>
          </router-link>
        </td>
      </tr>
      <tr>
        <td class="category__cell">
          <router-link to="/catalog/accessories" class="category__item">
            <img class="category__image" src="@/assets/banners/accessories.jpg" alt="category for men">
            <div class="category__title">
              <h4 class="category__title_h4">Luxirous &amp; Trendy</h4>
              <h3 class="category__title_h3">Accesories</h3>
            </div>
          </router-link>
        </td>
      </tr>
    </table>
  </section>
</template>

<script>
export default {
  name: 'Categories',
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

.category
  background-color: $clrBackground
  +marginTB(98px, 98px)
  &__container
    width: $siteWidth
    border-spacing: $siteWidth - 560px * 2
    margin: 0 auto
  &__cell
    width: 560px
  &__item
    overflow: hidden
    width: 560px
    display: flex
    justify-content: center
    align-items: center
    position: relative
    &:hover
      filter: brightness(50%)
    &:active
      filter: brightness(75%)
    &:hover > .category__image
      transform: scale(1.03, 1.03)
  &__image
    transition: linear 0.3s
  &__title
    pointer-events: none
    height: 82px
    background-color: $clrBackground
    padding: 20px 16px
    +absoluteTL(26px, 0)
    &_h3
      +textCSWHT($clrBrand, 30px, 900, 23px, uppercase)
      margin-top: 10px
    &_h4
      +textCSWHT($clrText, 18px, 900, 14px, uppercase)
</style>
