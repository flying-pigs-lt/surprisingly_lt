// store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    theme: 'loud-seahorse-55'  // 初始主题
  },
  mutations: {
    setTheme(state, newTheme) {
      state.theme = newTheme;  // 更新主题
    }
  },
  actions: {
    updateTheme({ commit }, newTheme) {
      commit('setTheme', newTheme);  // 提交 mutation 更新主题
    }
  }
});
