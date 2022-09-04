import { createStore } from "vuex";
import userSelected from "./user/userSelected";
import FastFirstStart from "./modules/FastFirstStart";
import FastLogin from "./modules/FastLogin";
import FastRegistration from "./modules/FastRegistration";
import FastToDoList from "./modules/FastToDoList";

export default createStore({
  state: {},
  getters: {},
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
    userSelected,
    FastFirstStart,
    FastLogin,
    FastRegistration,
    FastToDoList,
  },
});
