<template>
  <section class="feature">
    <div class="feature__container">
      <div class="feature__banner">
        <img src="@/assets/banners/banner_feature.jpg" alt="banner">
        <div class="feature__title">
          <h3 class="feature__title_h3">30% <span class="feature__title_brand">Offer</span></h3>
          <h4 class="feature__title_h4">For Women</h4>
        </div>
      </div>
      <div class="feature__content">
        <article class="feature__article">
          <div class="feature__icon">
            <img src="@/assets/icons/delivery.png" alt="delivery">
          </div>
          <div class="feature__direction">
            <h3 class="feature__direction_h3">Бесплатная доставка</h3>
            <p class="feature__direction_p">Бесплатная доставка товара в большинство населенных пунктов России.</p>
          </div>
        </article>
        <article class="feature__article">
          <div class="feature__icon">
            <img src="@/assets/icons/discount.png" alt="discount">
          </div>
          <div class="feature__direction">
            <h3 class="feature__direction_h3">Распродажи и скидки</h3>
            <p class="feature__direction_p">Мы регулярно проводим акции и даем скидки на различные группы товаров.</p>
          </div>
        </article>
        <article class="feature__article">
          <div class="feature__icon">
            <img src="@/assets/icons/quality.png" alt="quality">
          </div>
          <div class="feature__direction">
            <h3 class="feature__direction_h3">Гарантия качества</h3>
            <p class="feature__direction_p">
              Всегда, перед отправлением товара тщательно проверяем качество изделий.
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Feature',
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

.feature
  background-color: $DarkJungleGreen
  margin-top: 98px
  &__container
    width: $siteWidth
    min-height: 528px
    display: flex
    align-items: center
    margin: 0 auto
  &__banner
    position: relative
  &__title
    pointer-events: none
    +absoluteTL(132px, 38px)
    &_h3
      max-width: 320px
      +textCSWHT(white, 54px, 700, 44px, uppercase)
      margin-bottom: 16px
    &_h4
      max-width: 320px
      +textCSWHT(white, 32px, 700, 25px, uppercase)
    &_brand
      color: $clrBrand
  &__content
    min-height: 528px - 36px * 2
    display: flex
    justify-content: space-between
    flex-direction: column
    margin: 36px auto
  &__article
    min-height: 108px
    display: flex
    justify-content: space-around
    margin-bottom: 20px
    &:last-child
      margin-bottom: 0
  &__icon
    width: 50px
    height: 50px
    margin-right: 20px
  &__direction
    width: 230px
    min-height: 102px
    &_h3
      +textCSWH($Snow, 20px, 700, 22px)
      margin-bottom: 14px
    &_p
      +textCSWH($Snow, 14px, 300, 24px)
</style>
