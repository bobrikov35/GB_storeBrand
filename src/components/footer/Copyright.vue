<template>
  <footer class="copyright">
    <div class="copyright__container">
      <p class="copyright__text">
        {{ year }} © Brand — модный интернет-магазин одежды, обуви и аксессуаров. Все права защищены. Доставка по всей
        России.
      </p>
      <nav>
        <ul class="copyright__social">
          <li class="copyright__link">
            <a href="https://ru-ru.facebook.com/" target="_blank">
              <button class="copyright__btn copyright__btn_default copyright__btn_facebook">
                <i class="fa fa-facebook"></i>
              </button>
            </a>
          </li>
          <li class="copyright__link">
            <a href="https://twitter.com/" target="_blank">
              <button class="copyright__btn copyright__btn_brand copyright__btn_twitter">
                <i class="fa fa-twitter"></i>
              </button>
            </a>
          </li>
          <li class="copyright__link">
            <a href="https://www.linkedin.cn/" target="_blank">
              <button class="copyright__btn copyright__btn_default copyright__btn_linkedin">
                <i class="fa fa-linkedin"></i>
              </button>
            </a>
          </li>
          <li class="copyright__link">
            <a href="https://www.pinterest.ru/" target="_blank">
              <button class="copyright__btn copyright__btn_default copyright__btn_pinterest">
                <i class="fa fa-pinterest-p"></i>
              </button>
            </a>
          </li>
          <li class="copyright__link">
            <a href="https://plus.google.com/" target="_blank">
              <button class="copyright__btn copyright__btn_default copyright__btn_google">
                <i class="fa fa-google-plus"></i>
              </button>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Copyright',
  data() {
    return {
      year: undefined,
    };
  },
  mounted() {
    const date = new Date();
    this.year = date.getFullYear();
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

button
  border: none
  background: none

.copyright
  background-color: $LightGray
  &__container
    width: $siteWidth
    height: 78px
    display: flex
    justify-content: space-between
    align-items: center
    margin: 0 auto
  &__text
    width: $siteWidth * 0.50
    +textCSWH($TrolleyGrey, 16px, 400, 18px)
  &__social
    display: flex
  &__link
    margin-right: 8px
  &__btn
    cursor: pointer
    width: 32px
    height: 32px
    display: flex
    justify-content: center
    align-items: center
    &:hover
      filter: saturate(115%)
    &:active
      filter: saturate(85%)
    &_default
      color: $AshGrey
      background-color: $WhiteSmoke
    &_brand
      color: $WhiteSmoke
      background-color: $clrBrand
    &_facebook
      &:hover
        color: #f8f8f8
        background-color: #4064ad
      &:active
        color: #f8f8f8
        background-color: #4064ad
    &_twitter
      &:hover
        color: #1da1f2
        background-color: #e8f5fe
      &:active
        color: #1da1f2
        background-color: #e8f5fe
    &_linkedin
      &:hover
        color: white
        background-color: #0077b5
      &:active
        color: white
        background-color: #0077b5
    &_pinterest
      &:hover
        color: white
        background-color: #e60023
      &:active
        color: white
        background-color: #e60023
    &_google
      &:hover
        color: #f8f8f8
        background-color: #d65044
      &:active
        color: #f8f8f8
        background-color: #d65044
</style>
