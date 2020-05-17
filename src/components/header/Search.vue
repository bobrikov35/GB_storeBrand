<template>
  <form class="search" action="#" @submit.prevent="submit">
    <input type="text" class="search__field" placeholder="Поиск товара..." v-model="field" @input="input">
    <button class="search__button" type="submit"><i class="fa fa-search"></i></button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Search',
  data() {
    return {
      field: '',
    };
  },
  methods: {
    input() {
      const list = this.field.match(/([-а-яё\w])+/ig);
      this.setSearch(list !== null ? list : []);
    },
    submit() {
      if (!this.$route.params.page) {
        this.$router.push('/catalog/all');
      } else if (this.$route.params.page === 'all') {
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
    ...mapGetters({
      getQuery: 'catalog/getQuery',
    }),
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

button, input
  border: none
  background: none

input::placeholder,
input::-webkit-input-placeholder,
input:-moz-placeholder,
input::-moz-placeholder,
input:-ms-input-placeholder
  color: $clrPlaceholder

$height: 38px

.search
  background-color: $clrBackground
  display: flex
  align-items: center
  &__field
    width: 280px
    height: $height
    border-top: 1px solid $clrBorder
    border-bottom: 1px solid $clrBorder
    padding: 0 12px
  &__button
    cursor: pointer
    width: $height
    height: $height
    +textCSW($DarkGray, 14px, 400)
    background-image: linear-gradient(180deg, white 0%, $WhiteSmoke 100%)
    border: 1px solid $clrBorder
    border-radius: 0 3px 3px 0
    display: flex
    justify-content: center
    align-items: center
    &:hover
      background-image: linear-gradient(180deg, white 0%, $Snow 100%)
    &:active
      color: $clrBrand
</style>
