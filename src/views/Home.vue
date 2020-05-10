<template>
  <div class="home">
    <Slider/>
    <Categories/>
    <Goods/>
    <Feature/>
  </div>
</template>

<script>
import Slider from '@/components/home/Slider.vue';
import Categories from '@/components/home/Categories.vue';
import Goods from '@/components/home/Goods.vue';
import Feature from '@/components/home/Feature.vue';

export default {
  name: 'Home',
  components: {
    Slider,
    Categories,
    Goods,
    Feature,
  },
};
</script>

<style scoped lang="sass">
@import '../styles/var', '../styles/mixins'

.home
  margin-bottom: 98px
</style>
