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
      categories: undefined,
      brands: undefined,
      colors: undefined,
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
      const k = (state.view.quantity / value) * state.view.page;
      state.view.quantity = value;
      state.view.page = Math.ceil(Math.min(k, state.list.length / value));
    },
    SET_VIEW_SORTBY(state, value) {
      state.view.sortBy = value;
    },
    SET_CONFIG_CATEGORIES(state, data) {
      const newData = [];
      for (let k = 0; k < data.length; k++) {
        const list = [];
        for (let i = 0; i < data[k].categories.length; i++) {
          list.push({ id: i + 1, title: data[k].categories[i], flag: false });
        }
        newData.push({
          id: k + 1,
          type: data[k].type,
          categories: list,
          flagged: false,
        });
      }
      state.config.categories = [...newData];
    },
    SWITCH_CONFIG_CATEGORIES(state, params) {
      const type = state.config.categories.find((el) => el.id === params.type);
      const category = type.categories.find((el) => el.id === params.category);
      category.flag = !category.flag;
      let flagged = false;
      for (let i = 0; i < type.categories.length; i++) {
        if (type.categories[i].flag) flagged = true;
      }
      type.flagged = flagged;
    },
    SET_CONFIG_BRANDS(state, data) {
      const newData = [];
      for (let i = 0; i < data.length; i++) {
        newData.push({ id: i + 1, title: data[i], flag: false });
      }
      state.config.brands = [...newData];
    },
    SWITCH_CONFIG_BRANDS(state, id) {
      const brand = state.config.brands.find((el) => el.id === id);
      brand.flag = !brand.flag;
    },
    SET_CONFIG_COLORS(state, data) {
      const newData = [];
      for (let i = 0; i < data.length; i++) {
        newData.push({ id: i + 1, ...data[i], flag: false });
      }
      state.config.colors = [...newData];
    },
    SWITCH_CONFIG_COLORS(state, id) {
      const color = state.config.colors.find((el) => el.id === id);
      color.flag = !color.flag;
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
          commit('SET_VIEW_PAGE', 1);
          commit('SET_CONFIG_PRICE_VALUE_MIN', getters.getPriceInterval.min);
          commit('SET_CONFIG_PRICE_VALUE_MAX', getters.getPriceInterval.max);
        })
        .catch((err) => {
          commit('SET_RESPONSE', false);
          console.log(err);
        });
    },
    fetchConfig({ commit }, params) {
      fetch(`${catalogUrl}/${params.title}/?${params.query}`)
        .then((res) => res.json())
        .then((data) => {
          commit('SET_RESPONSE', true);
          switch (params.title) {
            case 'categories':
              commit('SET_CONFIG_CATEGORIES', data);
              break;
            case 'brands':
              commit('SET_CONFIG_BRANDS', data);
              break;
            case 'colors':
              commit('SET_CONFIG_COLORS', data);
              break;
            default: commit('SET_RESPONSE', false);
          }
        })
        .catch((err) => {
          commit('SET_RESPONSE', false);
          console.log(err);
        });
    },
    switchConfig({ commit }, params) {
      switch (params.name) {
        case 'categories':
          commit('SWITCH_CONFIG_CATEGORIES', params);
          break;
        case 'brands':
          commit('SWITCH_CONFIG_BRANDS', params.id);
          break;
        case 'colors':
          commit('SWITCH_CONFIG_COLORS', params.id);
          break;
        default:
          // do nothing
      }
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
      let filterCatalog = JSON.parse(JSON.stringify(state.list));
      filterCatalog = filterCatalog.filter((el) => {
        if (el.price < state.config.price.min || el.price > state.config.price.max) return false;
        return true;
      });
      if (state.config.size.filter((el) => el.flag).length) {
        const size = [];
        for (let i = 0; i < state.config.size.length; i++) {
          if (state.config.size[i].flag) size.push(state.config.size[i].label);
        }
        filterCatalog = filterCatalog.filter((el) => {
          for (let i = 0; i < size.length; i++) {
            if (!el.size.includes(size[i])) return false;
          }
          return true;
        });
      }
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
    getConfigCategories: (state) => state.config.categories,
    isEmptyConfigBrands: (state) => !state.config.brands || state.config.brands.length === 0,
    isFlaggedConfigBrands: (state) => {
      if (!state.config.brands) return false;
      for (let i = 0; i < state.config.brands.length; i++) {
        if (state.config.brands[i].flag) return true;
      }
      return false;
    },
    getConfigBrands: (state) => state.config.brands,
    isEmptyConfigColors: (state) => !state.config.colors || state.config.colors.length === 0,
    isFlaggedConfigColors: (state) => {
      if (!state.config.colors) return false;
      for (let i = 0; i < state.config.colors.length; i++) {
        if (state.config.colors[i].flag) return true;
      }
      return false;
    },
    getConfigColors: (state) => state.config.colors,
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
