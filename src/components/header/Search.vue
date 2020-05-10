<template>
  <form class="search" action="#">
    <input type="text" class="search__field" placeholder="Поиск товара..." v-model="field">
    <button type="submit" class="search__button"><i class="fa fa-search"></i></button>
  </form>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      field: '',
    };
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

$width: 280px
$height: 38px

.search
  background-color: $clrBackground
  display: flex
  align-items: center
  &__field
    width: $width
    height: $height
    border-top: 1px solid $clrBorder
    border-bottom: 1px solid $clrBorder
    padding: 0 12px
  &__button
    cursor: pointer
    width: $height
    height: $height
    color: $DarkGray
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
