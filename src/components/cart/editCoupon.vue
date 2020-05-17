<template>
  <div class="obj-edt">
    <input class="obj-edt__input" type="text" :id="vID" :placeholder="vPlaceholder">
  </div>
</template>

<script>
export default {
  name: 'editPostcode',
  props: {
    vID: { requared: true },
    vPlaceholder: { default: '' },
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

$width: 356px
$height: 42px

input
  border: none
  background: none

input
  &::placeholder,
  &::-webkit-input-placeholder,
  &:-moz-placeholder,
  &::-moz-placeholder,
  &:-ms-input-placeholder
    color: $clrPlaceholder

.obj-edt
  width: $width
  height: $height
  background-color: $clrBackground
  border: 1px solid $clrBorder
  position: relative
  margin-bottom: 20px
  &__input
    overflow: hidden
    width: $width
    height: $height
    +textCSW($clrText, 14px, 400)
    +paddingRL($height + 2px, 12px)
</style>
