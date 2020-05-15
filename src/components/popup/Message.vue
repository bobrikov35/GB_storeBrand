<template>
  <div class="popup" v-if="visibility">
    <div class="popup__background"
         @click="close"/>
    <div class="popup__content">
      <button class="popup__close" type="button"
              @click.prevent="close">
        <i class="fa fa-times"></i>
      </button>
      <div class="popup__message" v-html="message"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Message',
  data() {
    return {
      show: false,
    };
  },
  methods: {
    close() {
      this.hide();
    },
    ...mapActions({
      setMessage: 'setPopupMessage',
      hide: 'hidePopupMessage',
    }),
  },
  computed: {
    ...mapGetters({
      message: 'popupMessage',
      visibility: 'popupMessageVisibility',
    }),
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

button
  border: none
  background: none

.popup
  width: 100vw
  height: 100vh
  display: flex
  justify-content: center
  align-items: center
  position: fixed
  top: 0
  left: 0
  &__background
    width: 100vw
    height: 100vh
    opacity: 0.5
    background: $clrText
    +absoluteTL(0, 0)
  &__content
    z-index: 1
    background-color: $clrBackground
    border-radius: 5px
    padding: 48px
    position: relative
  &__message
    min-width: 300px
    max-width: 600px
    +textCSWH($clrText, 14px, 400, 21px)
    & h2
      +textCSWH($clrText, 20px, 700, 40px)
    & h3
      +textCSWH($clrText, 18px, 400, 36px)
    & h4
      +textCSWH($clrText, 16px, 400, 32px)
  &__close
    cursor: pointer
    overflow: hidden
    width: 32px
    height: 32px
    +textCSW($clrBrand, 24px, 400)
    background-color: $clrBackground
    border-radius: 50%
    display: flex
    justify-content: center
    align-items: center
    +absoluteTR(12px, 12px)
    &:hover
      color: white
      background-color: $clrBrand2
      filter: saturate(115%)
    &:active
      color: white
      background-color: $clrBrand2
      filter: saturate(85%)
    & .fa
      +marginTL(-2px, 1px)
</style>
