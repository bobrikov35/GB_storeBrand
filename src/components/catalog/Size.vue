<template>
  <div class="option">
    <h3 class="option__title">Размер</h3>
    <div class="option__check-block">
      <label class="checkbox" v-for="el of size" :key="`catalog-size-${el.id}`">
        <input class="checkbox__box" type="checkbox" :checked="el.flag"
               @change="changeFlag($event, el.id)">
        <span class="checkbox__flag"><i class="fa fa-check"></i></span>
        <span class="checkbox__label">{{ el.label }}</span>
      </label>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Size',
  methods: {
    changeFlag(event, size) {
      this.checkSize({ id: size, flag: event.target.checked });
    },
    ...mapActions({
      checkSize: 'catalog/checkConfigSize',
    }),
  },
  computed: {
    ...mapGetters({
      size: 'catalog/getConfigSize',
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
    margin-bottom: 17px
  &__check-block
    display: flex
    flex-wrap: wrap

.checkbox
  cursor: pointer
  width: 48px
  height: 14px
  +textCSW($DimGray, 14px, 400)
  display: flex
  position: relative
  +marginRB(14px, 12px)
  &:hover > .checkbox__flag
    background-color: lighten($clrBrand2, 20%)
  &:active > .checkbox__flag
    background-color: lighten($clrBrand2, 25%)
  &__box
    cursor: pointer
    opacity: 0
    margin-top: 1px
    &:checked + .checkbox__flag .fa
      display: block
  &__flag
    width: 13px
    height: 13px
    background-color: $clrBackground
    border: 1px solid $clrBorder
    border-radius: 2px
    display: flex
    justify-content: center
    align-items: center
    +absoluteTL(1px, 0)
    & .fa
      font-size: 11px
      display: none
      +absoluteTL(0, 0)
  &__label
    margin-top: -1px
    padding-left: 8px
</style>
