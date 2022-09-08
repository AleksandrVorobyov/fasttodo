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
import uploadImage from "./uploadImage";
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
        inputValue: "",
        btn: "Изменить",
        errorMin: "Слишком короткое имя! Минимум 5 букв",
        errorMax: "Слишком длинное имя! Максимум 20 букв",
        btnExit: "Отменить",
        success: "Вы успешно сменили имя!",
      },
      changeAvatar: {
        title: "Выберите новый аватар",
        inputLoad: false,
        inputFile: "Перетащите изображение...",
        inputFileSucess: "Изображение загружено!",
        btnSubmit: "Отправить",
        btnExit: "Отменить",
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
    renameInputSave(state) {
      return (state.profile.rename.inputValue =
        document.getElementById("formRenameInput").value);
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
    async toggleRenameFormModule({ state, dispatch }) {
      const formRename = document.getElementById("formRename");
      const formRenameInput = document.getElementById("formRenameInput");
      formRename.classList.toggle("form-rename--active");
      await dispatch("hiddenBodyFunc");

      if (formRenameInput.value.length > 0) {
        return (formRenameInput.value = "");
      }
    },
    async toggleChangeAvatarFormModule({ state, dispatch }) {
      const changeAvatar = document.getElementById("changeAvatar");
      changeAvatar.classList.toggle("change-avatar--active");
      await dispatch("hiddenBodyFunc");
    },
    async changeUserName({ state, commit, dispatch }) {
      if (
        state.profile.rename.inputValue.length >= 5 &&
        state.profile.rename.inputValue.length <= 20
      ) {
        try {
          const db = getDatabase();
          const uid = await dispatch("getUid");
          await set(
            ref(db, `users/${uid}/info/username/`),
            state.profile.rename.inputValue
          );
          return (
            await dispatch("toggleRenameFormModule"),
            (state.profile.rename.inputValue = ""),
            await dispatch("loadUserName"),
            await dispatch(
              "getNotificationSuccess",
              state.profile.rename.success
            )
          );
        } catch (error) {
          return (
            await dispatch("getNotificationError", error),
            console.log(error, "1")
          );
        }
      } else if (state.profile.rename.inputValue.length > 20) {
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
    loadProfileInputFile({ state }) {
      return (state.profile.changeAvatar.inputLoad =
        !state.profile.changeAvatar.inputLoad);
    },
  },
  modules: {
    uploadImage,
  },
};