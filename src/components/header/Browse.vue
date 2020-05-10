<template>
  <details class="browse">
    <summary class="browse__summary">Обзор<i class="fa fa-caret-down"></i></summary>
    <div class="dropdown browse__dropdown">
      <div class="dropdown__content">
        <span class="dropdown__triangle dropdown__triangle_shadow"></span>
        <span class="dropdown__triangle"></span>
        <div class="browse__dropdown_elem" v-for="elMenu of menu" :key="elMenu.name">
          <h2 class="dropdown__title">{{ elMenu.title }}</h2>
          <ul>
            <li v-for="el of elMenu.list" :key="el.name">
              <router-link :to="el.link" class="dropdown__link">{{ el.title }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </details>
</template>

<script>
export default {
  name: 'Browse',
  data() {
    return {
      menu: [
        {
          name: 'women',
          title: 'Женщинам',
          list: [
            { name: 'clothes', title: 'Одежда', link: '#' },
            { name: 'shoes', title: 'Обувь', link: '#' },
          ]
        },
        {
          name: 'men',
          title: 'Мужчинам',
          list: [
            { name: 'clothes', title: 'Одежда', link: '#' },
            { name: 'shoes', title: 'Обувь', link: '#' },
          ],
        },
        {
          name: 'kids',
          title: 'Детям',
          list: [
            { name: 'girls', title: 'Для девочек', link: '#' },
            { name: 'boys', title: 'Для мальчиков', link: '#' },
            { name: 'newborns', title: 'Для новорожденных', link: '#' },
          ],
        },
        {
          name: 'accessories',
          title: 'Аксессуары',
          list: [
            { name: 'hats', title: 'Головные уборы', link: '#' },
            { name: 'gloves', title: 'Перчатки и варежки', link: '#' },
            { name: 'bags', title: 'Сумки и рюкзаки', link: '#' },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

details > summary
  list-style: none

summary::-webkit-details-marker
  display: none

.browse
  border-radius: 3px 0 0 3px
  position: relative
  margin-left: 44px
  &[open] > .browse__dropdown
    display: flex
  &[open] > .browse__summary .fa
    transform: rotateZ(-180deg)
    color: $clrBrand2
    margin-top: 0
  &[open] > .browse__summary:active .fa
    transform: rotateZ(-90deg)
  &__summary
    cursor: pointer
    height: 38px
    background-image: linear-gradient(180deg, white 0%, $WhiteSmoke 100%)
    border: 1px solid $clrBorder
    border-radius: 3px 0 0 3px
    display: flex
    align-items: center
    padding: 8px 14px
    position: relative
    &:hover
      background-image: linear-gradient(180deg, white 0%, $Snow 100%)
    &:active > .fa
      transform: rotateZ(-90deg)
    & .fa
      color: $DarkGray
      +marginTL(2px, 10px)
  &__dropdown
    top: 48px
    &_elem
      margin-top: 12px
      &:first-of-type
        margin-top: 0
</style>
