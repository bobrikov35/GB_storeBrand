const catalogUrl = '/api/catalog';

const catalog = {
  namespaced: true,
  state: {
    view: {
      page: 1,
      quantity: 9,
      sortBy: 'title asc',
    },
    config: {
      trending: [
        { id: 1, label: 'Bohemian', flag: false },
        { id: 2, label: 'Floral', flag: false },
        { id: 3, label: 'Lace', flag: false },
        { id: 4, label: 'Floral', flag: false },
        { id: 5, label: 'Lace', flag: false },
        { id: 6, label: 'Bohemian', flag: false },
      ],
      size: [
        { id: 1, label: 'XXS', flag: false },
        { id: 2, label: 'XS', flag: false },
        { id: 3, label: 'S', flag: false },
        { id: 4, label: 'M', flag: false },
        { id: 5, label: 'L', flag: false },
        { id: 6, label: 'XL', flag: false },
        { id: 7, label: 'XXL', flag: false },
      ],
      price: {
        min: null,
        max: null,
      },
    },
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
    SET_VIEW_PAGE(state, value) {
      state.view.page = value;
    },
    SET_VIEW_QUANTITY(state, value) {
      state.view.quantity = value;
    },
    SET_VIEW_SORTBY(state, value) {
      state.view.sortBy = value;
    },
    SET_CONFIG_TRENDING(state, data) {
      const item = state.config.trending.find((el) => el.id === data.id);
      item.flag = data.flag;
    },
    SET_CONFIG_SIZE(state, data) {
      const item = state.config.size.find((el) => el.id === data.id);
      item.flag = data.flag;
    },
    SET_CONFIG_PRICE_VALUE_MIN(state, value) {
      state.config.price.min = value;
    },
    SET_CONFIG_PRICE_VALUE_MAX(state, value) {
      state.config.price.max = value;
    },
  },
  actions: {
    fetchData({ commit, getters }, query) {
      fetch(`${catalogUrl}/?${query}`)
        .then((res) => res.json())
        .then((data) => {
          commit('SET_RESPONSE', true);
          commit('SET_DATA', data);
          commit('SET_CONFIG_PRICE_VALUE_MIN', getters.getPriceInterval.min);
          commit('SET_CONFIG_PRICE_VALUE_MAX', getters.getPriceInterval.max);
        })
        .catch((err) => {
          commit('SET_RESPONSE', false);
          console.log(err);
        });
    },
    setViewPage({ commit }, value) {
      commit('SET_VIEW_PAGE', value);
    },
    setViewQuantity({ commit }, value) {
      commit('SET_VIEW_QUANTITY', value);
    },
    setViewSortBy({ commit }, value) {
      commit('SET_VIEW_SORTBY', value);
    },
    checkConfigTrending({ commit }, data) {
      commit('SET_CONFIG_TRENDING', data);
    },
    checkConfigSize({ commit }, data) {
      commit('SET_CONFIG_SIZE', data);
    },
    setConfigPriceValue({ commit }, data) {
      if (data.type === 'min') {
        commit('SET_CONFIG_PRICE_VALUE_MIN', data.value);
      } else if (data.type === 'max') {
        commit('SET_CONFIG_PRICE_VALUE_MAX', data.value);
      }
    },
  },
  getters: {
    isEmpty: (state) => state.list.length === 0,
    get: (state) => state.list,
    getFiltered: (state) => {
      const filterCatalog = JSON.parse(JSON.stringify(state.list));
      const sortBy = state.view.sortBy.split(' ');
      switch (sortBy[0]) {
        case 'popular':
          return filterCatalog.sort((A, B) => B.sold - A.sold);
        case 'rating':
          return filterCatalog.sort((A, B) => B.rating - A.rating);
        case 'price':
          if (sortBy[1] === 'desc') {
            return filterCatalog.sort((A, B) => B.price - A.price);
          }
          return filterCatalog.sort((A, B) => A.price - B.price);
        case 'title':
          if (sortBy[1] === 'desc') {
            return filterCatalog.sort((A, B) => B.title.localeCompare(A.title));
          }
          return filterCatalog.sort((A, B) => A.title.localeCompare(B.title));
        default:
          return filterCatalog.sort((A, B) => A.title.localeCompare(B.title));
      }
    },
    getConfigTrending: (state) => state.config.trending,
    getConfigSize: (state) => state.config.size,
    getPriceInterval: (state) => {
      const minValue = state.list.reduce((min, el, i) => {
        if (i > 0) return min > el.price ? el.price : min;
        return el.price;
      }, 0);
      const maxValue = state.list.reduce((max, el, i) => {
        if (i > 0) return max < el.price ? el.price : max;
        return el.price;
      }, 0);
      return { size: maxValue - minValue, min: minValue, max: maxValue };
    },
    getPriceValue: (state, getters) => {
      const percent = {
        percentMin: (state.config.price.min - getters.getPriceInterval.min) / getters.getPriceInterval.size,
        percentMax: (state.config.price.max - getters.getPriceInterval.min) / getters.getPriceInterval.size,
      };
      return {
        ...state.config.price,
        ...percent,
      };
    },
    getPage: (state) => state.view.page,
    getQuantity: (state) => state.view.quantity,
    getSortBy: (state) => state.view.sortBy,
  },
};

export default catalog;
