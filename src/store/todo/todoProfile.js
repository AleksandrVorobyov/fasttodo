import firebase from "firebase/compat/app";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  push,
  update,
  onValue,
} from "firebase/database";
import { getAuth } from "firebase/auth";
export default {
  state: {
    profile: {
      username: "User-8282",
      avatarImg: {
        default: "avatar/main.png",
        userСhoice: "",
      },
      menu: {
        show: false,
        btn: {
          renameTextBtn: "Сменить имя",
          renameImgBtn: "Сменить аватарку",
          exitBtn: "Выйти из профиля?",
        },
      },
      rename: {
        title: "Напишите новое имя",
        placeholder: "...",
        btn: "Изменить",
        errorMin: "Слишком короткое имя! Минимум 5 букв",
        errorMax: "Слишком длинное имя! Максимум 20 букв",
      },
    },
  },
  getters: {
    profile(state) {
      return state.profile;
    },
  },
  mutations: {
    todoMenuActive(state, payload) {
      const hamburger = document.getElementById("todo-profile");
      const menu = document.getElementById("todo-profile__menu");
      menu.classList.toggle("todo-profile__menu--active");
      hamburger.classList.toggle("todo-profile--active");
      state.profile.menu.show = !state.profile.menu.show;
    },
    openRenameFormModule(state) {
      document
        .getElementById("formRename")
        .classList.toggle("form-rename--active");
    },
  },
  actions: {
    todoMenuSmartHiding({ state, commit, dispatch }, e) {
      if (document.getElementById("todo-profile")) {
        const hamburger = document.getElementById("todo-profile");
        const menu = document.getElementById("todo-profile__menu");
        let target = e.target;
        let its_menu = target == menu || menu.contains(target);

        if (
          hamburger.contains(target) ||
          (!its_menu && state.profile.menu.show == true)
        ) {
          return commit("todoMenuActive");
        }
        return;
      }
    },
    async changeUserName({ state, commit, dispatch }) {
      const formRenameInput = document.getElementById("formRenameInput").value;
      if (formRenameInput.length >= 5 && formRenameInput.length <= 20) {
        try {
          const db = getDatabase();
          const uid = await dispatch("getUid");

            const updates = {};

            const username = {
              username: formRenameInput,
            };

            updates[`users/${uid}/info/`] = username;

            formRenameInput = "";
            commit("openRenameFormModule");
            return update(ref(db), updates);
        } catch (error) {
          return await dispatch("getNotificationError", error);
        }
      } else if (formRenameInput.length > 20) {
        return await dispatch(
          "getNotificationError",
          state.profile.rename.errorMax
        );
      }
      return await dispatch(
        "getNotificationError",
        state.profile.rename.errorMin
      );
    },
  },
};
