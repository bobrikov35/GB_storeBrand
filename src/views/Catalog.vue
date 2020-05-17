<template>
  <div>
    <Breadcrumb :vLink="pageLink" :vTitle="pageTitle"/>
    <section class="catalog">
      <div class="catalog__container">
        <Sidebar/>
        <div>
          <Filtering/>
          <Settings/>
          <Goods/>
        </div>
      </div>
    </section>
    <Feature/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb.vue';
import Sidebar from '@/components/catalog/Sidebar.vue';
import Filtering from '@/components/catalog/Filtering.vue';
import Settings from '@/components/catalog/Settings.vue';
import Goods from '@/components/catalog/Goods.vue';
import Feature from '@/components/catalog/Feature.vue';

export default {
  name: 'Catalog',
  components: {
    Breadcrumb,
    Sidebar,
    Filtering,
    Settings,
    Goods,
    Feature,
  },
  methods: {
    init() {
      if (this.$route.params.page === 'all') {
        this.fetchData(this.getQuery);
      } else {
        this.fetchData(`page=${this.$route.params.page}&${this.getQuery}`);
      }
    },
    ...mapActions({
      fetchData: 'catalog/fetchData',
      setSearch: 'catalog/setConfigSearch',
    }),
  },
  computed: {
    pageLink() {
      switch (this.$route.params.page) {
        case 'women': return '/catalog/women';
        case 'men': return '/catalog/men';
        case 'kids': return '/catalog/kids';
        case 'accessories': return '/catalog/accessories';
        default: return '/catalog/all';
      }
    },
    pageTitle() {
      switch (this.$route.params.page) {
        case 'women': return 'Женщинам';
        case 'men': return 'Мужчинам';
        case 'kids': return 'Детям';
        case 'accessories': return 'Аксессуары';
        default: return 'Полный каталог';
      }
    },
    ...mapGetters({
      getQuery: 'catalog/getQuery',
    }),
  },
  watch: {
    '$route.params.page': 'init',
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped lang="sass">
@import '../styles/var', '../styles/mixins'

.catalog
  background-color: $clrBackground
  +marginTB(64px, 0)
  &__container
    width: $siteWidth
    display: flex
    justify-content: space-between
    margin: 0 auto
</style>
