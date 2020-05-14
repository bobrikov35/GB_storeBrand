<template>
  <div class="subscribe">
    <h2 class="subscribe__title">Подписаться</h2>
    <p class="subscribe__description">Для получения наших предложений и промо акций</p>
    <form class="subscribe__form" action="#">
      <input class="subscribe__input" type="email" autocomplete="off" placeholder="Введите Ваш Email" v-model="email"
             @input="verifyEmail"
             @keydown="checkKeyForEmail($event)">
      <button class="subscribe__button" @click.prevent="sendForm">Subscribe</button>
    </form>
  </div>
</template>

<script>
import Validator from '@/libs/validator';

export default {
  name: 'Subscribe',
  data() {
    return {
      email: '',
      confirmed: false,
      description: `${Validator.errorMessage('email')}\nПри вводе корректного адреса цвет поля станет зеленым.`,
    };
  },
  methods: {
    sendForm() {
      if (!this.confirmed) return;
      const mail = this.$el.querySelector('.subscribe__input');
      const btn = this.$el.querySelector('.subscribe__button');
      mail.classList.remove('subscribe__input_enabled');
      btn.title = this.description;
      btn.classList.remove('subscribe__button_enabled');
      this.email = '';
      this.confirmed = false;
    },
    checkKeyForEmail(event) {
      if (!Validator.verifyEmailSymbol(event.key)) event.preventDefault();
    },
    verifyEmail() {
      this.confirmed = Validator.verifyEmail(this.email);
      const mail = this.$el.querySelector('.subscribe__input');
      const btn = this.$el.querySelector('.subscribe__button');
      if (this.confirmed) {
        mail.classList.add('subscribe__input_enabled');
        btn.title = '';
        btn.classList.add('subscribe__button_enabled');
      } else {
        mail.classList.remove('subscribe__input_enabled');
        btn.title = this.description;
        btn.classList.remove('subscribe__button_enabled');
      }
    },
  },
  mounted() {
    const btn = this.$el.querySelector('.subscribe__button');
    btn.title = this.description;
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

button, input
  border: none
  background: none

.subscribe
  width: $siteWidth / 2
  padding: 140px 40px 110px
  &__title
    +textCSWHT($clrText, 24px, 400, 40px, uppercase)
    text-align: center
  &__description
    +textCSWHT($clrText, 14px, 400, 24px, uppercase)
    text-align: center
    margin-bottom: 30px
  &__form
    display: flex
    justify-content: center
  &__input
    width: 280px
    height: 48px
    +textCSW($clrText, 14px, 400)
    background-color: $Gainsboro
    border: none
    border-radius: 22px 0 0 22px
    +paddingRL(10px, 30px)
    &:focus
      background-color: lighten($clrBrand2, 30%)
    &_enabled:focus
      filter: hue-rotate(180deg)
  &__button
    cursor: pointer
    width: 106px
    height: 48px
    +textCSW(white, 14px, 400)
    background-color: $clrBrand2
    border-radius: 0 22px 22px 0
    &_enabled
      &:hover
        filter: saturate(115%)
      &:active
        filter: saturate(85%)
</style>
