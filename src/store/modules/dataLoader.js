const dataLoader = {
  namespaced: true,
  state: {
    urls: {
      review: '/api/review',
      region: '/api/lists/regions',
      city: '/api/lists/cities',
    },
    lists: {
      reviews: [],
      regions: [],
      cities: [],
    },
    response: false,
  },
  mutations: {
    SET_RESPONSE(state, res) {
      state.response = res;
    },
    SET_DATA_REVIEW(state, data) {
      if (!state.response) return;
      state.lists.reviews = [...data];
    },
    SET_DATA_REGION(state, data) {
      if (!state.response) return;
      state.lists.regions = [...data];
    },
    SET_DATA_CITY(state, data) {
      if (!state.response) return;
      state.lists.cities = [...data];
    },
  },
  actions: {
    fetchData({ state, commit }, name) {
      fetch(state.urls[name])
        .then((res) => res.json())
        .then((data) => {
          commit('SET_RESPONSE', true);
          switch (name) {
            case 'review':
              commit('SET_DATA_REVIEW', data);
              break;
            case 'region':
              commit('SET_DATA_REGION', data);
              break;
            case 'city':
              commit('SET_DATA_CITY', data);
              break;
            default: commit('SET_RESPONSE', false);
          }
        })
        .catch((err) => {
          commit('SET_RESPONSE', false);
          console.log(err);
        });
    },
  },
  getters: {
    isEmptyReviews: (state) => state.lists.reviews.length === 0,
    getReviews: (state) => state.lists.reviews,
    isEmptyRegion: (state) => state.lists.regions.length === 0,
    getRegion: (state) => state.lists.regions,
    isEmptyCity: (state) => state.lists.cities.length === 0,
    getCity: (state) => state.lists.cities,
  },
};

export default dataLoader;
