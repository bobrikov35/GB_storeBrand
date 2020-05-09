import Vue from 'vue';
import Vuex from 'vuex';
import catalog from '@/store/modules/catalog';
import cart from '@/store/modules/cart';
import product from '@/store/modules/product';
import dataLoader from '@/store/modules/dataLoader';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    popupSize: {
      product: null,
      size: '',
      list: [],
      visibility: false,
    },
  },
  mutations: {
    NEW_POPUP_SIZE(state, data) {
      state.popupSize.product = data.product;
      state.popupSize.size = data.size;
      state.popupSize.list = data.list;
    },
    SET_POPUP_SIZE(state, size) {
      state.popupSize.size = size;
    },
    SHOW_POPUP_SIZE(state) {
      state.popupSize.visibility = true;
    },
    HIDE_POPUP_SIZE(state) {
      state.popupSize.visibility = false;
    },
  },
  actions: {
    showPopupSize({ commit }) {
      commit('SHOW_POPUP_SIZE');
    },
    hidePopupSize({ commit }) {
      commit('HIDE_POPUP_SIZE');
    },
    newPopupSize({ commit }, newProduct) {
      commit('NEW_POPUP_SIZE', { product: newProduct, size: '', list: newProduct.size });
    },
    setPopupSize({ state, commit }, size) {
      if (state.popupSize.product) {
        commit('SET_POPUP_SIZE', size);
      }
    },
  },
  getters: {
    popupSizeGetProduct: (state) => state.popupSize.product,
    popupSizeGetSize: (state) => state.popupSize.size,
    popupSizeGetSizeList: (state) => state.popupSize.list,
    popupSizeVisibility: (state) => state.popupSize.visibility,
  },
  modules: {
    catalog,
    cart,
    product,
    dataLoader,
  },
});
