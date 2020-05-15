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
    popupMessage: {
      message: '',
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
    SET_POPUP_MESSAGE(state, message) {
      state.popupMessage.message = message;
    },
    SHOW_POPUP_MESSAGE(state) {
      state.popupMessage.visibility = true;
    },
    HIDE_POPUP_MESSAGE(state) {
      state.popupMessage.visibility = false;
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
    showPopupMessage({ commit }) {
      commit('SHOW_POPUP_MESSAGE');
    },
    hidePopupMessage({ commit }) {
      commit('HIDE_POPUP_MESSAGE');
    },
    setPopupMessage({ commit }, message) {
      commit('SET_POPUP_MESSAGE', message);
    },
  },
  getters: {
    popupSizeGetProduct: (state) => state.popupSize.product,
    popupSizeGetSize: (state) => state.popupSize.size,
    popupSizeGetSizeList: (state) => state.popupSize.list,
    popupSizeVisibility: (state) => state.popupSize.visibility,
    popupMessage: (state) => state.popupMessage.message,
    popupMessageVisibility: (state) => state.popupMessage.visibility,
  },
  modules: {
    catalog,
    cart,
    product,
    dataLoader,
  },
});
