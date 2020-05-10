<template>
  <section class="feedback">
    <div class="feedback__container">
      <Review vShow="2"/>
      <Subscribe/>
    </div>
  </section>
</template>

<script>
import Review from '@/components/footer/Review.vue';
import Subscribe from '@/components/footer/Subscribe.vue';

export default {
  name: 'Feedback',
  components: {
    Review,
    Subscribe,
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

.feedback
  height: 438px
  background: url(../../assets/banners/feedback.jpg) no-repeat center
  display: flex
  justify-content: space-between
  margin-bottom: 98px
  position: relative
  &__container
    width: $siteWidth
    display: flex
    justify-content: space-between
    margin: 0 auto
</style>
