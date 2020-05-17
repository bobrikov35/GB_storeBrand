<template>
  <div class="obj-edt-sel" @mouseover="mouseoverObj" @mouseout="mouseoutObj">
    <input class="obj-edt-sel__input" type="text" :id="vID" :placeholder="vPlaceholder" v-model="field"
           @blur="blurObj"
           @input="changeField">
    <ul class="obj-edt-sel__list" v-show="showList">
      <li class="obj-edt-sel__elem" v-for="(el) of filtered" :key="el.id"
          @mouseover="mouseoverElem($event)"
          @mouseout="mouseoutElem($event)"
          @click="select(el)">
        {{ el.name }}
      </li>
    </ul>
    <button class="obj-edt-sel__btn" type="button"
            @click="changeVisibility"
            @blur="blurObj">
      <i class="fa fa-caret-down"></i>
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'editSelectCity',
  props: {
    vID: { required: true },
    vPlaceholder: { default: '' },
  },
  data() {
    return {
      dataLoaded: false,
      focused: false,
      showList: false,
      field: '',
    };
  },
  methods: {
    changeVisibility() {
      if (this.showList) {
        this.hide();
      } else {
        this.show();
      }
    },
    changeField() {
      if (this.field.length === 0) {
        this.hide();
      } else {
        this.show();
      }
    },
    hide() {
      this.showList = false;
    },
    show() {
      if (this.filteredIsEmpty) {
        this.hide();
        return;
      }
      this.showList = true;
    },
    select(el) {
      this.field = el.name;
      this.hide();
    },
    mouseoverObj() {
      this.focused = true;
    },
    mouseoutObj() {
      this.focused = false;
    },
    blurObj() {
      if (this.focused) return;
      this.hide();
    },
    mouseoverElem(event) {
      const elem = event.target;
      elem.style.backgroundColor = '#bcbcbc';
    },
    mouseoutElem(event) {
      const elem = event.target;
      elem.style.backgroundColor = 'inherit';
    },
    ...mapActions({
      fetchData: 'dataLoader/fetchData',
    }),
  },
  computed: {
    filtered() {
      if (this.dataLoaded) {
        const regexp = new RegExp(`^${this.field}`, 'ig');
        return this.cities.filter((el) => el.name.search(regexp) >= 0);
      }
      return [];
    },
    filteredIsEmpty() {
      return this.filtered.length === 0;
    },
    ...mapGetters({
      cities: 'dataLoader/getCity',
      isEmpty: 'dataLoader/isEmptyCity',
    }),
  },
  mounted() {
    if (this.isEmpty) {
      this.fetchData('city')
        .then(() => {
          this.dataLoaded = true;
        });
    } else {
      this.dataLoaded = true;
    }
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

$width: 356px
$height: 42px

button, input
  border: none
  background: none

input
  &::placeholder,
  &::-webkit-input-placeholder,
  &:-moz-placeholder,
  &::-moz-placeholder,
  &:-ms-input-placeholder
    color: $clrPlaceholder

.obj-edt-sel
  width: $width
  height: $height
  background-color: $clrBackground
  border: 1px solid $clrBorder
  position: relative
  margin-bottom: 20px
  &__input
    overflow: hidden
    width: $width - 3px
    height: $height
    +textCSW($clrText, 14px, 400)
    +paddingRL($height + 2px, 12px)
  &__list
    z-index: 1
    overflow: auto
    width: $width
    max-height: 14px * 1.5 * 8
    +textCSWH($clrText, 14px, 400, 14px * 1.5)
    background-color: $clrBackground
    border: 1px solid $clrBorder
    +absoluteTR($height, -1px)
  &__elem
    cursor: pointer
    padding: 0 8px
  &__btn
    cursor: pointer
    width: $height
    height: $height
    +textCSW($Silver, 15px, 400)
    +absoluteTR(0, 0)
    &:hover
      filter: brightness(60%)
    &:active
      filter: brightness(80%)
</style>
