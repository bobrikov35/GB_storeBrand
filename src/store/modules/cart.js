const cartUrl = '/api/cart';

/**
 * Поиск продукта в корзине
 * @param product - объект из каталога
 * @param cart - список объектов из каталога
 * @returns {*}
 */
const findInCart = (product, cart) => {
  const compare = (p1, p2) => p1.id === p2.id && p1.data.size === p2.data.size;
  return cart.findIndex((el) => compare(el, product));
};

const cart = {
  namespaced: true,
  state: {
    response: false,
    list: [],
  },
  mutations: {
    SET_RESPONSE(state, res) {
      state.response = res;
    },
    SET_DATA(state, data) {
      if (!state.response) return;
      state.list = [...data];
    },
    ADD_PRODUCT(state, data) {
      if (!state.response) return;
      const i = findInCart(data, state.list);
      if (i < 0) {
        state.list.push(data);
      } else {
        state.list[i].data.quantity += data.data.quantity;
      }
    },
    REMOVE_PRODUCT(state, data) {
      if (!state.response) return;
      const i = findInCart(data, state.list);
      state.list[i].data.quantity -= data.data.quantity;
      if (state.list[i].data.quantity < 0) {
        state.list.splice(i, 1);
      }
    },
    CLEAR(state, data) {
      state.list = data;
    },
  },
  actions: {
    fetchData({ commit }) {
      fetch(cartUrl)
        .then((res) => res.json())
        .then((data) => {
          commit('SET_RESPONSE', true);
          commit('SET_DATA', data);
        })
        .catch((err) => {
          commit('SET_RESPONSE', false);
          console.log(err);
        });
    },
    add({ state, commit }, data) {
      const find = state.list.findIndex((el) => el.id === data.id && el.data.size === data.data.size) < 0;
      return fetch(cartUrl, {
        method: find ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: data.id,
          data: { size: data.data.size, quantity: data.data.quantity },
        }),
      })
        .then(() => {
          commit('SET_RESPONSE', true);
          commit('ADD_PRODUCT', data);
        })
        .catch((err) => {
          commit('SET_RESPONSE', false);
          console.log(err);
        });
    },
    remove({ commit }, data) {
      return fetch(cartUrl, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: data.id,
          data: { size: data.data.size, quantity: data.data.quantity },
        }),
      })
        .then(() => {
          commit('SET_RESPONSE', true);
          commit('REMOVE_PRODUCT', data);
        })
        .catch((err) => {
          commit('SET_RESPONSE', false);
          console.log(err);
        });
    },
    clear({ commit }) {
      return fetch(`${cartUrl}/clr`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(() => {
          commit('SET_RESPONSE', true);
          commit('CLEAR', []);
        })
        .catch((err) => {
          commit('SET_RESPONSE', false);
          console.log(err);
        });
    },
  },
  getters: {
    isEmpty: (state) => state.list.length === 0,
    get: (state) => state.list,
    count: (state) => state.list.length,
    cost: (state) => state.list.reduce((sum, el) => sum + el.price * el.data.quantity, 0),
  },
};

export default cart;
