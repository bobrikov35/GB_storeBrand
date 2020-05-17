<template>
  <div class="obj-sel" @mouseover="mouseoverObj" @mouseout="mouseoutObj">
    <button class="obj-sel__input" type="button" :id="vID" data-id="" data-value=""
            @blur="blurObj"
            @click="changeVisibility">
      {{ value }}
    </button>
    <ul class="obj-sel__list" v-show="showList">
      <li class="obj-sel__elem" v-for="(el) of regions" :key="el.id"
          @mouseover="mouseoverElem($event)"
          @mouseout="mouseoutElem($event)"
          @click="select(el)">
        {{ el.name[0] }}
      </li>
    </ul>
    <button class="obj-sel__btn" type="button"
            @click="changeVisibility"
            @blur="blurObj">
      <i class="fa fa-caret-down"></i>
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'selectRegion',
  props: {
    vID: { required: true },
    vPlaceholder: { default: '' },
  },
  data() {
    return {
      value: this.vPlaceholder,
      focused: false,
      showList: false,
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
    hide() {
      this.showList = false;
    },
    show() {
      if (this.isEmpty) {
        this.hide();
        return;
      }
      this.showList = true;
    },
    select(el) {
      const name = el.name[0];
      const input = this.$el.querySelector('.obj-sel__input');
      input.style.color = '#222222';
      input.attributes['data-id'] = el.id;
      input.attributes['data-value'] = name;
      this.value = name;
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
    ...mapGetters({
      isEmpty: 'dataLoader/isEmptyRegion',
      regions: 'dataLoader/getRegion',
    }),
  },
  mounted() {
    if (this.isEmpty) this.fetchData('region');
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

$width: 356px
$height: 42px

button
  border: none
  background: none

.obj-sel
  width: $width
  height: $height
   background-color: $clrBackground
  border: 1px solid $clrBorder
  position: relative
  margin-bottom: 20px
  &__input
    cursor: pointer
    overflow: hidden
    width: $width - 3px
    height: $height
    +textCSW($clrPlaceholder, 14px, 400)
    white-space: nowrap
    text-overflow: ellipsis
    text-align: left
    user-select: none
    -webkit-user-select: none
    -moz-user-select: none
    -ms-user-select: none
    +paddingRL($height + 2px, 12px)
    &:hover ~ .obj-sel__btn
      filter: brightness(60%)
    &:active ~ .obj-sel__btn
      filter: brightness(80%)
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
