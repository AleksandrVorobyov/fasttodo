import { createStore } from 'vuex'
import FastFirstStart from "./modules/FastFirstStart"
import FastLogin from "./modules/FastLogin"
import FastRegistration from "./modules/FastRegistration"
import FatsToDoList from "./modules/FatsToDoList"
import userSelected from "./user/userSelected"

export default createStore({
  state: {

  },
  getters: {

  },
  mutations: {
    mainBtnAnimMove(_, btn) {
      const rect = btn.target.getBoundingClientRect();
      const x = btn.clientX - rect.left;
      const y = btn.clientY - rect.top;
      btn.target.style.background = `radial-gradient(circle at ${x}px ${y}px , rgba(0, 255, 133 ,0.4),rgba(0, 255, 133 ,0) )`;
    },

    mainBtnAnimLeave(state, btn) {
      btn.target.style.background = `transparent`;
    },
  },
  actions: {},
  modules: {
    FastFirstStart,
    FastLogin,
    FastRegistration,
    FatsToDoList,
    userSelected
  }
})