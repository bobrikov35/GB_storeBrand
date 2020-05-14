<template>
  <div class="option">
    <h3 class="option__title">В тренде</h3>
    <div class="option__check-block">
      <label class="checkbox">
        <input class="checkbox__box" type="checkbox" :checked="getFlag(1)"
               @change="changeFlag($event, 1)">
        <span class="checkbox__label">{{ getLabel(1) }}</span>
      </label>
      <span class="separator">|</span>
      <label class="checkbox">
        <input class="checkbox__box" type="checkbox" :checked="getFlag(2)"
               @change="changeFlag($event, 2)">
        <span class="checkbox__label">{{ getLabel(2) }}</span>
      </label>
      <span class="separator">|</span>
      <label class="checkbox">
        <input class="checkbox__box" type="checkbox" :checked="getFlag(3)"
               @change="changeFlag($event, 3)">
        <span class="checkbox__label">{{ getLabel(3) }}</span>
      </label>
      <div class="break"></div>
      <label class="checkbox">
        <input class="checkbox__box" type="checkbox" :checked="getFlag(4)"
               @change="changeFlag($event, 4)">
        <span class="checkbox__label">{{ getLabel(4) }}</span>
      </label>
      <span class="separator">|</span>
      <label class="checkbox">
        <input class="checkbox__box" type="checkbox" :checked="getFlag(5)"
               @change="changeFlag($event, 5)">
        <span class="checkbox__label">{{ getLabel(5) }}</span>
      </label>
      <span class="separator">|</span>
      <label class="checkbox">
        <input class="checkbox__box" type="checkbox" :checked="getFlag(6)"
               @change="changeFlag($event, 6)">
        <span class="checkbox__label">{{ getLabel(6) }}</span>
      </label>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Trending',
  methods: {
    getLabel(id) {
      const item = this.trending.find((el) => el.id === id);
      return item ? item.label : '';
    },
    getFlag(id) {
      const item = this.trending.find((el) => el.id === id);
      return item ? item.flag : false;
    },
    changeFlag(event, _id) {
      this.checkTrending({ id: _id, flag: event.target.checked });
    },
    ...mapActions({
      checkTrending: 'catalog/checkConfigTrending',
    }),
  },
  computed: {
    ...mapGetters({
      trending: 'catalog/getConfigTrending',
    }),
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

.option
  width: 260px
  min-height: 74px
  &__title
    +textCSWT($DimGray, 14px, 700, uppercase)
    margin-bottom: 4px
  &__check-block
    display: flex
    flex-wrap: wrap

.separator
  height: 14px
  +textCSW($Gainsboro, 14px, 400)
  display: block
  margin: 11px 10px 0 10px

.break
  width: 100%
  height: 0

.checkbox
  cursor: pointer
  height: 14px
  +textCSW($DimGray, 14px, 400)
  display: flex
  position: relative
  margin-top: 12px
  &:hover > .checkbox__label
    text-decoration: underline
  &:active > .checkbox__label
    color: $clrBrand
    text-decoration: underline
  &__box
    opacity: 0
    cursor: pointer
    +absoluteTL(3px, 0)
    &:checked + .checkbox__label
      color: $clrBrand
    &:checked:active + .checkbox__label
      color: $DimGray
</style>
