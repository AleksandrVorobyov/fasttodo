import { getDatabase, ref, set } from "firebase/database";
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
        btnExit: "Отменить",
        success: "Вы успешно сменили имя!",
        show: false
      },
      changeAvatar: {
        title: "Выберите новый аватар",
        inputLoad: false,
        inputFile: "Перетащите изображение...",
        inputFileSucess: "Изображение загружено!",
        btnSubmit: "Отправить",
        btnExit: "Отменить",
        show: false
      },
      errors: {
        renameTtlMin: "Слишком короткое имя! Минимум 5 букв",
        renameTtlMax: "Слишком длинное имя! Максимум 20 букв",
      }
    },
  },
  getters: {
    profile(state) {
      return state.profile;
    },
  },
  mutations: {
    todoMenuActive(state, payload) {
      const hamburger = document.getElementById("todolistProfile");
      const menu = document.getElementById("todolistProfileMenu");
      menu.classList.toggle("todolist-profile__menu--active");
      hamburger.classList.toggle("todolist-profile--active");
      state.profile.menu.show = !state.profile.menu.show;
    },
    renameInputSave(state) {
      return (state.profile.rename.inputValue =
        document.getElementById("formRenameInput").value);
    },
  },
  actions: {
    todoMenuSmartHiding({ state, commit, dispatch }, e) {
      if (document.getElementById("todolistProfile")) {
        const hamburger = document.getElementById("todolistProfile");
        const menu = document.getElementById("todolistProfileMenu");
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
      state.profile.rename.show = !state.profile.rename.show
      await dispatch("hiddenBodyFunc");
      const formRenameInput = document.getElementById("formRenameInput");

      if (formRenameInput.value.length > 0) {
        return (formRenameInput.value = "");
      }
    },
    async toggleChangeAvatarFormModule({ state, dispatch }) {
      if (state.profile.changeAvatar.show) {
        state.profile.changeAvatar.show = false
      } else {
        state.profile.changeAvatar.show = true
      }
      await dispatch("hiddenBodyFunc");
    },
    async changeUserName({ state, commit, dispatch }) {
      try {
        const db = getDatabase();
        const uid = await dispatch("getUid");

        if (state.profile.rename.inputValue.length < 5) {
          throw new SyntaxError(state.profile.errors.renameTtlMin);
        }

        if (state.profile.rename.inputValue.length > 20) {
          throw new SyntaxError(state.profile.errors.renameTtlMax);
        }

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
      } catch (err) {
        return (
          await dispatch("getNotificationError", err.message)
        );
      }
    },
    loadProfileInputFile({ state }) {
      return (state.profile.changeAvatar.inputLoad =
        !state.profile.changeAvatar.inputLoad);
    },
  },
};
