<template>
  <button class="button" :class="vClass" type="button" @click.stop="">
    <svgCart vSize="small" vType="white" v-if="vIcon === 'left' && vType === 'cart'"/>
    <svgHeart vType="white" v-if="vIcon === 'left' && vType === 'heart'"/>
    <svgRefresh vType="white" v-if="vIcon === 'left' && vType === 'refresh'"/>
    <span :class="{ button__icon_right: vIcon === 'right' && vTitle, button__icon_left: vIcon === 'left' && vTitle }">
      {{ vTitle }}
    </span>
    <svgCart vSize="small" vType="white" v-if="vIcon === 'right' && vType === 'cart'"/>
    <svgHeart vType="white" v-if="vIcon === 'right' && vType === 'heart'"/>
    <svgRefresh vType="white" v-if="vIcon === 'right' && vType === 'refresh'"/>
  </button>
</template>

<script>
import svgCart from '@/components/icons/svgCart.vue';
import svgHeart from '@/components/icons/svgHeart.vue';
import svgRefresh from '@/components/icons/svgRefresh.vue';

export default {
  name: 'btnLike',
  props: {
    vTitle: { default: '' },
    vType: { default: '' },
    vIcon: { default: 'none' },
    vClass: { default: '' },
  },
  components: {
    svgCart,
    svgHeart,
    svgRefresh,
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

button
  border: none
  background: none

.button
  cursor: pointer
  width: 60px
  height: 38px
  +textCSW(white, 13px, 700)
  border: 1px solid white
  border-radius: 3px
  display: flex
  justify-content: center
  align-items: center
  padding: 0 12px
  margin-top: 8px
  &:hover
    box-shadow: 0 0 7px white
  &:active
    box-shadow: 0 0 1px white
  &__icon_right
    margin-right: 8px
  &__icon_left
    margin-left: 8px
</style>
