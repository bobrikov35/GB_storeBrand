<template>
  <div class="settings">
    <Sorting/>
    <Showing :class="{ settings_hide: page === 0 }"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Sorting from '@/components/catalog/Sorting.vue';
import Showing from '@/components/catalog/Showing.vue';

export default {
  name: 'Settings',
  components: {
    Sorting,
    Showing,
  },
  computed: {
    ...mapGetters({
      page: 'catalog/getPage',
    }),
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

.settings
  width: $siteWidth - 290px
  min-height: 48px
  background-color: $Munsell
  display: flex
  align-items: center
  +paddingRL(12px, 12px)
  margin-top: 20px
  &_hide
    visibility: hidden
</style>
