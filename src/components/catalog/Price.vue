<template>
  <div class="option">
    <h3 class="option__title">Размер</h3>
    <div class="option__range-block" tabindex="0">
      <div class="range"
           @mousedown="downRange($event)"
           @mouseup="outRange"
           @mousemove="moveRange($event)">
        <span class="range__bar"></span>
        <button class="range__button range__button_min"></button>
        <button class="range__button range__button_max"></button>
        <span class="range__bar range__bar_active"></span>
      </div>
      <div class="option__data">
        <h3 class="option__value">{{ getValue.min }}<i class="fa fa-rub"></i></h3>
        <h3 class="option__value">{{ getValue.max }}<i class="fa fa-rub"></i></h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Price',
  data() {
    return {
      width: 0,
      active: '',
    };
  },
  methods: {
    getMinPosition() {
      let result = this.getValue.percentMin * this.width - 7;
      if (result < 0) result = 0;
      else if (result > this.width - 14) result = this.width - 14;
      return result;
    },
    getMaxPosition() {
      let result = this.getValue.percentMax * this.width - 7;
      if (result < 0) result = 0;
      else if (result > this.width - 14) result = this.width - 14;
      return result;
    },
    render() {
      const btnMin = this.$el.querySelector('.range__button_min');
      const btnMax = this.$el.querySelector('.range__button_max');
      const active = this.$el.querySelector('.range__bar_active');
      const minPosition = this.getMinPosition();
      const maxPosition = this.getMaxPosition();
      btnMin.style.left = `${minPosition}px`;
      btnMax.style.left = `${maxPosition}px`;
      active.style.left = `${minPosition + 7}px`;
      active.style.width = `${maxPosition - minPosition}px`;
    },
    downRange(event) {
      const percent = event.offsetX / this.width;
      const newValue = Math.round(percent * this.getInterval.size + this.getInterval.min);
      if (this.getValue.min !== this.getValue.max) {
        if (Math.abs(newValue - this.getValue.min) <= Math.abs(newValue - this.getValue.max)) {
          this.active = 'min';
          if (newValue > this.getValue.max) {
            this.setValue({ type: 'min', value: this.getValue.max });
          } else {
            this.setValue({ type: 'min', value: newValue });
          }
        } else {
          this.active = 'max';
          if (newValue < this.getValue.min) {
            this.setValue({ type: 'max', value: this.getValue.min });
          } else {
            this.setValue({ type: 'max', value: newValue });
          }
        }
      } else {
        const leftBtn = this.$el.querySelector('.range__button_min').offsetLeft;
        if (leftBtn === this.width - 14 || event.offsetX - leftBtn <= 7) {
          this.active = 'min';
          this.setValue({ type: 'min', value: newValue });
          if (newValue > this.getValue.max) {
            this.setValue({ type: 'min', value: this.getValue.max });
          } else {
            this.setValue({ type: 'min', value: newValue });
          }
        } else {
          this.active = 'max';
          if (newValue < this.getValue.min) {
            this.setValue({ type: 'max', value: this.getValue.min });
          } else {
            this.setValue({ type: 'max', value: newValue });
          }
        }
      }
      this.render();
    },
    moveRange(event) {
      if (this.active === '') return;
      const leftRange = this.$el.querySelector('.range').offsetLeft;
      const percent = (event.clientX - leftRange) / this.width;
      const newValue = Math.round(percent * this.getInterval.size + this.getInterval.min);
      if (this.active === 'min') {
        if (newValue < this.getInterval.min) {
          this.setValue({ type: 'min', value: this.getInterval.min });
        } else if (newValue > this.getValue.max) {
          this.setValue({ type: 'min', value: this.getValue.max });
        } else {
          this.setValue({ type: 'min', value: newValue });
        }
      } else if (this.active === 'max') {
        if (newValue > this.getInterval.max) {
          this.setValue({ type: 'max', value: this.getInterval.max });
        } else if (newValue < this.getValue.min) {
          this.setValue({ type: 'max', value: this.getValue.min });
        } else {
          this.setValue({ type: 'max', value: newValue });
        }
      }
      this.render();
    },
    outRange() {
      this.active = '';
    },
    ...mapActions({
      setValue: 'catalog/setConfigPriceValue',
    }),
  },
  computed: {
    ...mapGetters({
      getInterval: 'catalog/getPriceInterval',
      getValue: 'catalog/getPriceValue',
    }),
  },
  mounted() {
    document.addEventListener('mouseup', this.outRange);
    document.addEventListener('mousemove', (event) => this.moveRange(event));
    this.width = this.$el.querySelector('.range').offsetWidth;
    this.render();
  },
};
</script>

<style scoped lang="sass">
@import '../../styles/var', '../../styles/mixins'

button
  border: none
  background: none

.option
  width: 260px
  min-height: 74px
  &__title
    +textCSWT($DimGray, 14px, 700, uppercase)
    margin-bottom: 17px
  &__check-block
    display: flex
    flex-wrap: wrap
  &__data
    display: flex
    justify-content: space-between
  &__value
    +textCSW($DimGray, 14px, 400)
    margin-top: 3px
    & .fa
      font-size: 13px
      +marginTL(11px, 4px)

.range
  cursor: pointer
  width: 260px
  height: 14px
  display: flex
  position: relative
  &__bar
    pointer-events: none
    width: 100%
    height: 6px
    background-color: $Munsell
    border-radius: 3px
    +absoluteTL(14px / 2 - 6px / 2, 0)
    &_active
      background-color: $clrBrand2
  &__button
    pointer-events: none
    width: 14px
    height: 14px
    background-color: $clrBrand2
    border-radius: 50%
    position: absolute
    top: 14px / 2 - 7px
    &_min
      left: 0
    &_max
      left: 260px - 14px
</style>
