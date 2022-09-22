import { createStore } from "vuex";
import userSelected from "./user/userSelected";
import FastFirstStart from "./modules/FastFirstStart";
import FastLogin from "./modules/FastLogin";
import FastRegistration from "./modules/FastRegistration";
import FastToDoList from "./modules/FastToDoList";
import notification from "./user/notification";
import defaultProperties from "./user/defaultProperties";
import uploadImage from "./todo/uploadImage";
import theme from "./todo/theme";
import todoListForm from "./todo/todoListForm";
import todoListProfile from "./todo/todoListProfile";

export default createStore({
  state: {
    hiddenBody: false,
    scrollBody: {
      x: "",
      y: "",
    },
  },
  getters: {
    hiddenBody(state) {
      return state.hiddenBody;
    },
    scrollBody(state) {
      return state.scrollBody;
    },
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
  actions: {
    hiddenBodyFunc({ state, commit, dispatch }) {
      if (state.hiddenBody == false) {
        state.scrollBody.x = window.pageXOffset;
        state.scrollBody.y = window.pageYOffset;
      }
      return (state.hiddenBody = !state.hiddenBody);
    },
  },
  modules: {
    userSelected,
    FastFirstStart,
    FastLogin,
    FastRegistration,
    FastToDoList,
    defaultProperties,
    notification,
    uploadImage,
    theme,
    todoListForm,
    todoListProfile,
  },
});
