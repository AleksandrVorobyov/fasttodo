import { createStore } from "vuex";
import userSelected from "./user/userSelected";
import FastFirstStart from "./modules/FastFirstStart";
import FastLogin from "./modules/FastLogin";
import FastRegistration from "./modules/FastRegistration";
import FastToDoList from "./modules/FastToDoList";
import notification from "./user/notification";
import defaultProperties from "./user/defaultProperties";
import uploadImage from "./todo/uploadImage";
import todoListForm from "./todo/todoListForm";
import todoListProfile from "./todo/todoListProfile";
import theme from "./todo/theme";

export default createStore({
  state: {
    hiddenBody: false,
    scrollBody: {
      x: "",
      y: "",
    },
    disconnect: {
      title: "Мы потеряли связь с интернетом! Подождите пока связь появится или попробуйте перезагрузить страницу!",
      btn: "Перезагрузить страницу",
    },
  },
  getters: {
    hiddenBody(state) {
      return state.hiddenBody;
    },
    scrollBody(state) {
      return state.scrollBody;
    },
    disconnect(state) {
      return state.disconnect;
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
    rebootPage() {
      location.reload();
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
