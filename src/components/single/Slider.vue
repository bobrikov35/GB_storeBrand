<template>
  <section class="slider" v-if="!isEmpty">
    <div class="slider__container">
      <button class="slider__btn" @click="prevImage"><i class="fa fa-angle-left"></i></button>
      <img class="slider__image" :src="imageUrl()" alt="Product">
      <button class="slider__btn" @click="nextImage"><i class="fa fa-angle-right"></i></button>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Getters from '@/libs/getters';

export default {
  name: 'Slider',
  methods: {
    imageUrl() {
      return Getters.getActiveImageUrl(this.product);
    },
    ...mapActions({
      nextImage: 'product/nextImage',
      prevImage: 'product/prevImage',
    }),
  },
  computed: {
    ...mapGetters({
      isEmpty: 'product/isEmpty',
      product: 'product/getProduct',
    }),
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

button
  border: none
  background: none

.slider
  background-color: $WhiteSmoke
  border-top: 1px solid $clrBorder
  border-bottom: 1px solid $clrBorder
  &__container
    overflow: hidden
    width: $siteWidth
    height: 778px
    display: flex
    justify-content: space-between
    margin: 0 auto
    &:hover > .slider__btn
      opacity: 1
  &__image
    width: auto
    height: 690px + 8px
    margin-top: -4px
  &__btn
    opacity: 0
    cursor: pointer
    width: 48px
    height: 48px
    +textCSW(white, 24px, 400)
    background-color: $LightGray
    margin-top: calc(778px / 2 - 48px / 2)
    &:hover
      filter: brightness(105%)
    &:active
      filter: brightness(95%)
</style>
