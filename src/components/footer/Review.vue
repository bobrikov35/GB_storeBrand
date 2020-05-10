<template>
  <div class="review">
    <div v-if="!isEmpty">
      <figure v-for="elReview of Reviews" :key="elReview.id" v-show="isActive(elReview.id)">
        <img class="review__photo" :src="elReview.user.photo" alt="photo">
        <div class="review__block">
          <p class="review__message">“{{ elReview.message }}”</p>
          <h3 class="review__user_name">{{ elReview.user.name }}</h3>
          <h4 class="review__user_city">{{ elReview.user.city }}, {{ elReview.user.country }}</h4>
        </div>
      </figure>
      <nav class="review__navigation" v-if="!isEmpty">
        <button class="review__switch"
                v-for="elReview of Reviews" :key="elReview.id"
                :class="{review__switch_inactive: (!isActive(elReview.id))}"
                @click="switchTo(elReview.id)"/>
      </nav>
    </div>
    <div v-else>
      <h2 class="review__empty">Не удалось загрузить отзывы</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Review',
  props: ['vShow'],
  data() {
    return {
      show: +this.vShow,
    };
  },
  methods: {
    isActive(id) {
      return id === this.show;
    },
    switchTo(id) {
      this.show = id;
    },
    ...mapActions({
      fetchData: 'dataLoader/fetchData',
    }),
  },
  computed: {
    ...mapGetters({
      Reviews: 'dataLoader/getReviews',
      isEmpty: 'dataLoader/isEmptyReviews',
    }),
  },
  mounted() {
    this.fetchData('review');
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

button
  border: none
  background: none

.review
  width: $siteWidth / 2
  height: inherit
  border-right: 1px solid $clrBorder
  display: flex
  flex-wrap: wrap
  padding: 110px 32px 110px 0
  & figure
    display: flex
  &__photo
    width: 84px
    height: 84px
    border-radius: 50%
    margin-right: 24px
  &__block
    width: $siteWidth / 2 - 134px
    margin-top: 4px
  &__message
    height: 82px
    +textCSWH($clrText, 16px, 400, 26px)
    font-style: italic
    overflow: hidden
    text-overflow: ellipsis
  &__user
    &_name
      +textCSWH($clrBrand, 16px, 700, 15px)
      +marginTB(8px, 8px)
    &_city
      +textCSWH($clrText, 12px, 300, 12px)
  &__navigation
    +marginTL(40px, 108px)
    display: flex
  &__switch
    width: 38px
    height: 4px
    background-color: $clrBrand2
    margin-right: 10px
    &:last-child
      margin-right: 0
    &_inactive
      cursor: pointer
      background-color: $LightGray
      &:hover
        background-color: $clrBrand2
        filter: saturate(115%)
      &:active
        background-color: $clrBrand2
        filter: saturate(85%)
  &__empty
    +textCSW($clrPlaceholder, 16px, 400)
    font-style: italic
    text-align: center
</style>
