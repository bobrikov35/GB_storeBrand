<template>
  <header class="header">
    <div class="header__container">
      <div class="header__block">
        <Logo/>
        <Browse/>
        <Search/>
      </div>
      <div class="header__block">
        <Cart/>
        <btnAccount vTitle="Профиль" vIcon="right" vAwesome="fa-caret-down"/>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from '@/components/icons/Logo.vue';
import Browse from '@/components/header/Browse.vue';
import Search from '@/components/header/Search.vue';
import Cart from '@/components/header/Cart.vue';
import btnAccount from '@/components/header/btnAccount.vue';

export default {
  name: 'Header',
  components: {
    Logo,
    Browse,
    Search,
    Cart,
    btnAccount,
  },
};
</script>

<style scoped lang="sass">
@import '../styles/var', '../styles/mixins', '../styles/dropdown'

.header
  min-height: 98px
  background-color: $clrBackground
  border-bottom: 1px solid $clrBorder
  &__container
    width: $siteWidth
    display: flex
    justify-content: space-between
    align-items: center
    padding: 24px 0
    position: relative
    margin: 0 auto
  &__block
    display: flex
    justify-content: center
    align-items: center
</style>
