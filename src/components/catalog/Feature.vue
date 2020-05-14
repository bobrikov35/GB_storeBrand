<template>
  <section class="feature">
    <div class="feature__content">
      <article class="feature__article">
        <div class="feature__icon">
          <img src="@/assets/icons/delivery.png" alt="delivery">
        </div>
        <div class="feature__direction">
          <h3 class="feature__title">Бесплатная доставка</h3>
          <p class="feature__text">Бесплатная доставка товара в большинство населенных пунктов России.</p>
        </div>
      </article>
      <article class="feature__article">
        <div class="feature__icon">
          <img src="@/assets/icons/discount.png" alt="discount">
        </div>
        <div class="feature__direction">
          <h3 class="feature__title">Распродажи и скидки</h3>
          <p class="feature__text">Мы регулярно проводим акции и даем скидки на различные группы товаров.</p>
        </div>
      </article>
      <article class="feature__article">
        <div class="feature__icon">
          <img src="@/assets/icons/quality.png" alt="quality">
        </div>
        <div class="feature__direction">
          <h3 class="feature__title">Гарантия качества</h3>
          <p class="feature__text">Всегда, перед отправлением товара тщательно проверяем качество изделий.</p>
        </div>
      </article>
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
  &__content
    width: $siteWidth
    display: flex
    justify-content: space-around
    align-items: center
    padding: 80px 0
    margin: 0 auto
  &__article
    width: 30%
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
  &__icon
    width: 50px
    height: 50px
    display: flex
    justify-content: center
    align-items: center
  &__direction
    text-align: center
    margin-top: 10px
  &__title
    +textCSW($Snow, 20px, 700)
    margin-bottom: 16px
  &__text
    +textCSWH($Snow, 14px, 300, 24px)
</style>
