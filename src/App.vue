<template>
  <div id="app">
    <Header/>
    <Menu/>
    <router-view/>
    <Feedback/>
    <Footer/>
    <Copyright/>
    <ChoiceSize/>
    <Message/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Menu from '@/components/Menu.vue';
import Feedback from '@/components/footer/Feedback.vue';
import Footer from '@/components/footer/Footer.vue';
import Copyright from '@/components/footer/Copyright.vue';
import ChoiceSize from '@/components/popup/ChoiceSize.vue';
import Message from '@/components/popup/Message.vue';

export default {
  name: 'App',
  components: {
    Header,
    Menu,
    Feedback,
    Footer,
    Copyright,
    ChoiceSize,
    Message,
  },
};
</script>

<style lang="sass">
@import './styles/var', './styles/mixins', './styles/dropdown'

*
  letter-spacing: 0.03em
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

a
  text-decoration: none

ul, li
  list-style-type: none
</style>
