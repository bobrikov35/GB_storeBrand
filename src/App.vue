<template>
  <div id="app">
<!--    <Header/>-->
<!--    <Menu/>-->
<!--    <router-view/>-->
<!--    <Feedback/>-->
<!--    <Footer/>-->
<!--    <Copyright/>-->
<!--    <ChoiceSize/>-->
  </div>
</template>

<script>
// import Header from '@/components/Header.vue';
// import Menu from '@/components/Menu.vue';
// import Feedback from '@/components/footer/Feedback.vue';
// import Footer from '@/components/footer/Footer.vue';
// import Copyright from '@/components/footer/Copyright.vue';
// import ChoiceSize from '@/components/popup/ChoiceSize.vue';
export default {
  name: 'App',
  // components: {
  // Header,
  // Menu,
  // Feedback,
  // Footer,
  // Copyright,
  // ChoiceSize,
  // },
};
</script>

<style lang="sass">
@import './styles/var', './styles/mixins', './styles/dropdown'

*
  box-sizing: border-box
  padding: 0
  margin: 0
  &:active
    outline: none
  &:focus
    outline: none
body
  user-select: none
  font-family: 'Lato', sans-serif
  +textCSW($clrText, 14px, 400)
  letter-spacing: 0.03em
a
  text-decoration: none
ul, li
  list-style-type: none
details > summary
  list-style: none
summary::-webkit-details-marker
  display: none
button, input
  border: none
  background: none
</style>
