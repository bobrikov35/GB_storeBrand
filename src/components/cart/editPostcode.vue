<template>
  <div class="obj-edt-numb">
    <input class="obj-edt-numb__input" type="text" maxlength="6" :id="vID" :placeholder="vPlaceholder"
           @keydown="keyCheck($event)">
  </div>
</template>

<script>
export default {
  name: 'editPostcode',
  props: {
    vID: { requared: true },
    vPlaceholder: { default: '' },
  },
  methods: {
    keyCheck(event) {
      if (/\d/.test(event.key)) return;
      switch (event.key) {
        case 'Backspace':
        case 'Delete':
        case 'Enter':
        case 'Tab':
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'ArrowUp':
        case 'ArrowDown':
        case 'Home':
        case 'End':
        case 'PageUp':
        case 'PageDown':
          return;
        default:
          event.preventDefault();
      }
    },
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

.obj-edt-numb
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
