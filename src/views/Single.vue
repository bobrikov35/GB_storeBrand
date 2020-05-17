<template>
  <div>
    <Breadcrumb/>
    <Slider/>
    <Description/>
    <Goods/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb.vue';
import Slider from '@/components/single/Slider.vue';
import Description from '@/components/single/Description.vue';
import Goods from '@/components/single/Goods.vue';

export default {
  name: 'Single',
  components: {
    Breadcrumb,
    Slider,
    Description,
    Goods,
  },
  methods: {
    init() {
      document.querySelector('.search__field').value = '';
      this.setSearch([]);
      this.fetchProduct(this.$route.params.id);
      this.fetchCatalog('sortBy={"sold": "desc"}&quantity=4');
    },
    ...mapActions({
      fetchCatalog: 'catalog/fetchData',
      fetchProduct: 'product/fetchData',
      setSearch: 'catalog/setConfigSearch',
    }),
  },
  computed: {
    ...mapGetters({
      getQuery: 'catalog/getQuery',
    }),
  },
  watch: {
    '$route.params.id': 'init',
  },
  mounted() {
    this.init();
  },
};
</script>
