import Vue from 'vue'
import Vuex from 'vuex'
import { baseDomain } from '@/constans';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
    dialog: {
      state: false,
      message: '',
      code: 0,
    },
    sessions: [],
  },
  mutations: {
    SET_MOVIES(state, data) {
      state.movies = data;
    },
    SET_DIALOG(state, data) {
      state.dialog.state = true;
      state.dialog.code = data.error_code;
      state.dialog.message = data.error_message;
    },
    CLOSE_DIALOG(state) {
      state.dialog.state = false;
      state.dialog.code = '';
      state.dialog.message = 0;
    },
    SET_SESSIONS(state, data) {
      state.sessions = data;
    },
  },
  actions: {
    async getMovies({ commit, state }, cb) {
      fetch(`${baseDomain}/movies`)
        .then((response) => response.json())
        .then((response) => {
          if (response.error_code === 0) {
            commit('SET_MOVIES', response.data);
          } else {
            commit('SET_DIALOG', response);
          }
        })
        .catch((err) => console.error(err));

    },
    async getMovieSessions({ commit, state }, id) {
      fetch(`${baseDomain}/movieShows?movie_id=${id}`)
          .then((response) => response.json())
          .then((response) => {
            if (response.error_code === 0) {
              commit('SET_SESSIONS', response.data);
            } else {
              commit('SET_DIALOG', response);
            }
          })
          .catch((err) => console.error(err));

    },
    async checkFreePlaces({ commit, state }, {id, daytime, showdate, cb}) {
      fetch(`${baseDomain}/showPlaces?movie_id=${id}&daytime=${daytime}&showdate=${showdate}`)
          .then((response) => response.json())
          .then((response) => {
            if (response.error_code === 0) {
              cb(response.data);
            } else {
              commit('SET_DIALOG', response);
            }
          })
          .catch((err) => console.error(err));

    },
    async bookingPlaces({ commit, state }, {id, row, seat, showdate, daytime ,cb}) {
      fetch(`${baseDomain}/bookPlace`, {
          method: 'POST',
          body: JSON.stringify({
              movie_id: id,
              row: row,
              seat: seat,
              Showdate: showdate,
              daytime: daytime
          }),
      })
          .then((response) => response.json())
          .then((response) => {
            if (response.error_code === 0) {
              cb(response.data);
            } else {
              commit('SET_DIALOG', response);
            }
          })
          .catch((err) => console.error(err));

    },
  },
  modules: {
  }
})
