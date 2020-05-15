const productUrl = '/api/product';

const product = {
  namespaced: true,
  state: {
    response: false,
    list: [],
    curProduct: 0,
  },
  mutations: {
    SET_RESPONSE(state, res) {
      state.response = res;
    },
    SET_DATA(state, data) {
      if (!state.response) return;
      state.list = [...data];
    },
    SET_CURRENT_PRODUCT(state, index) {
      state.curProduct = index;
    },
    SET_CURRENT_IMAGE(state, index) {
      state.list[state.curProduct].img.current = index;
    },
  },
  actions: {
    fetchData({ commit }, id) {
      fetch(`${productUrl}/?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          commit('SET_RESPONSE', true);
          commit('SET_DATA', data);
          commit('SET_CURRENT_PRODUCT', 0);
        })
        .catch((err) => {
          commit('SET_RESPONSE', false);
          console.log(err);
        });
    },
    changeProduct({ state, commit }, id) {
      const index = state.list.findIndex((el) => el.id === id);
      commit('SET_CURRENT_PRODUCT', index);
      state.curImage = state.list[index].img.current;
    },
    nextImage({ state, commit }) {
      const prod = state.list[state.curProduct];
      if (prod.img.current < prod.img.quantity) {
        commit('SET_CURRENT_IMAGE', prod.img.current + 1);
      } else {
        commit('SET_CURRENT_IMAGE', 1);
      }
    },
    prevImage({ state, commit }) {
      const prod = state.list[state.curProduct];
      if (prod.img.current > 1) {
        commit('SET_CURRENT_IMAGE', prod.img.current - 1);
      } else {
        commit('SET_CURRENT_IMAGE', prod.img.quantity);
      }
    },
  },
  getters: {
    isEmpty: (state) => state.list.length === 0,
    getList: (state) => state.list,
    getProduct: (state) => state.list[state.curProduct],
    choiceColor: (state) => state.list.length > 1,
  },
};

export default product;
