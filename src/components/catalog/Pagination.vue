<template>
  <div class="pagination" :class="{ pagination_hide: pages === 0 }">
    <button class="pagination__btn" type="button" @click="prevPage">
      <i class="fa fa-chevron-left"/>
    </button>
    <ul class="pagination__box">
      <li v-for="n in pages" :key="`page-${n}`"
          class="pagination__page" :class="{ pagination__page_current: n === page }"
          @click="setPage(n)">
        {{ n }}
      </li>
    </ul>
    <button class="pagination__btn" type="button" @click="nextPage">
      <i class="fa fa-chevron-right"/>
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Pagination',
  methods: {
    prevPage() {
      if (this.page > 1) {
        this.setPage(this.page - 1);
      }
    },
    nextPage() {
      if (this.page < this.pages) {
        this.setPage(this.page + 1);
      }
    },
    ...mapActions({
      setPage: 'catalog/setViewPage',
    }),
  },
  computed: {
    pages() {
      return Math.ceil(this.catalog.length / this.quantity);
    },
    ...mapGetters({
      catalog: 'catalog/getFiltered',
      quantity: 'catalog/getQuantity',
      page: 'catalog/getPage',
    }),
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

button
  border: none
  background: none

.pagination
  height: 44px
  border: 1px solid $clrBorder
  border-radius: 3px
  display: flex
  justify-content: center
  align-items: center
  &_hide
    opacity: 0
  &__btn
    cursor: pointer
    height: inherit
    +textCSW($DarkGray, 12px, 400)
    padding: 1px 12px 0 12px
    &:hover, &:active
      color: white
      background-color: $clrBrand2
      border-top: 1px solid $clrBorder
      border-bottom: 1px solid $clrBorder
      border-radius: 3px
    &:hover
      filter: saturate(115%)
    &:active
      filter: saturate(85%)
    & .fa
      margin-top: 1px
  &__box
    +textCSW($Silver, 16px, 400)
    display: flex
    align-items: center
  &__page
    cursor: pointer
    padding: 2px 6px
    +marginRL(4px, 4px)
    &:hover
      color: $clrText
      text-decoration: underline
    &:active
      color: $clrBrand
      text-decoration: underline
    &_current
      cursor: default
      color: $clrBrand
      &:hover, &:active
        color: $clrBrand
        text-decoration: none
</style>
