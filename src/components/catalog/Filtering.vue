<template>
  <section class="settings">
    <Trending/>
    <Size/>
    <Price/>
  </section>
</template>

<script>
import Trending from '@/components/catalog/Trending.vue';
import Size from '@/components/catalog/Size.vue';
import Price from '@/components/catalog/Price.vue';

export default {
  name: 'Filtering',
  components: {
    Trending,
    Size,
    Price,
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

.settings
  width: $siteWidth - 290px
  display: flex
  justify-content: space-between
</style>
