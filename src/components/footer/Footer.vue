<template>
  <footer class="footer">
    <div class="footer__container">
      <div>
        <Logo/>
        <div class="footer__about">
          <p class="footer__about_text">
            Интернет-магазин <b>BRAND</b> – это доступные цены, широкий, регулярно обновляемый ассортимент.
            В онлайн-каталоге <b>BRAND</b> представлено около <b>10 000</b> ведущих брендов женской, мужской и детской
            одежды и обуви.
          </p>
          <p class="footer__about_text">
            Для удобства пользования онлайн-каталог поделен на разделы, все товары можно сортировать по ряду критериев:
            цена, материал изготовления, сезонность, бренд.
          </p>
        </div>
      </div>
      <nav>
        <ul class="footer__menu">
          <li class="footer__list">
            <h2 class="footer__title">Компания</h2>
            <ul>
              <li class="footer__sublist"><router-link to="/" class="footer__link">Главная</router-link></li>
              <li class="footer__sublist"><a class="footer__link" href="#">Магазин</a></li>
              <li class="footer__sublist"><a class="footer__link" href="#">О нас</a></li>
              <li class="footer__sublist"><a class="footer__link" href="#">Как мы работаем</a></li>
              <li class="footer__sublist"><a class="footer__link" href="#">Контакты</a></li>
            </ul>
          </li>
          <li class="footer__list">
            <h2 class="footer__title">Информация</h2>
            <ul>
              <li class="footer__sublist"><a class="footer__link" href="#">Условия и положения</a></li>
              <li class="footer__sublist"><a class="footer__link" href="#">Политика конфиденциальности</a></li>
              <li class="footer__sublist"><a class="footer__link" href="#">Как купить</a></li>
              <li class="footer__sublist"><a class="footer__link" href="#">Как продать</a></li>
              <li class="footer__sublist"><a class="footer__link" href="#">Реклама</a></li>
            </ul>
          </li>
          <li class="footer__list">
            <h2 class="footer__title">Категории</h2>
            <ul>
              <li class="footer__sublist">
                <router-link to="/catalog/women" class="footer__link">Женщинам</router-link>
              </li>
              <li class="footer__sublist">
                <router-link to="/catalog/men" class="footer__link">Мужчинам</router-link>
              </li>
              <li class="footer__sublist">
                <router-link to="/catalog/kids" class="footer__link">Детям</router-link>
              </li>
              <li class="footer__sublist">
                <router-link to="/catalog/accessories" class="footer__link">Аксессуары</router-link>
              </li>
              <li class="footer__sublist">
                <router-link to="/catalog/all" class="footer__link">Показать все товары</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script>
import Logo from '@/components/icons/Logo.vue';

export default {
  name: 'Footer',
  components: {
    Logo,
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

.footer
  min-height: 274px
  display: flex
  +marginTB(110px, 66px)
  &__container
    width: $siteWidth
    display: flex
    justify-content: space-between
    margin: 0 auto
  &__about
    width: $siteWidth * 0.38
    +textCSWH($TaupeGray, 14px, 300, 24px)
    &_text
      margin-top: 24px
  &__menu
    width: $siteWidth * 0.57
    display: flex
    justify-content: space-between
  &__list
    width: 170px
  &__title
    +textCSWT($clrBrand, 18px, 700, uppercase)
    +paddingTB(10px, 40px)
  &__sublist
    margin-bottom: 20px
    &:last-child
      margin-bottom: 0
  &__link
    +textCSWH($TaupeGray, 16px, 400, 16px)
    &:hover
      text-decoration: underline
    &:active
      color: $clrBrand
      filter: saturate(85%)
</style>
