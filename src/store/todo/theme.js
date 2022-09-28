import { getDatabase, ref, get, child, push, update } from "firebase/database";
export default {
  state: {
    theme: {
      activeTheme: "001def",
      themeCards: [],
      title: "Активная тема:",
      btnIcon: "arrow",
      btnDisabled: "prev-theme",
      rename: {
        title: "Выберите что то из перечисленного:",
        btnTtlRenameText: "Изменить текст...",
        btnTtlRenameimg: "Изменить картинку...",
        show: false,
        btnExit: "Отменить",
        saveTheme: "",
        ttl: {
          title: "Придумайте новое название для темы!",
          btnSub: "Отправить",
          btnExit: "Отменить",
          show: false,
          inputPlace: "Новое название...",
          inputValue: "",
          error: "должно быть минимум 3 символа!",
          success: "Вы успешно изменили название темы!"
        },
        img: {
          title: "Выберите новую картинку!",
          btnSub: "Отправить",
          btnExit: "Отменить",
          show: false,
          inputLoad: false,
          inputFile: "Перетащите изображение...",
          inputFileSucess: "Изображение загружено!",
          file: "",
          success: "Вы успешно изменили картинку темы!"
        }
      }
    },
  },
  getters: {
    theme(state) {
      return state.theme;
    },
  },
  mutations: {
    findActiveTheme(state) {
      return (state.theme.activeTheme = state.theme.themeCards.find(
        (e) => e.idx == 0
      ).id);
    },
    checkToThemeBtnDisabled(state) {
      let btnDisFirst = state.theme.themeCards.find(
        (e) => e.idx == '-1'
      )
      let btnDisLast = state.theme.themeCards.find(
        (e) => e.idx == '1'
      )

      if (btnDisFirst != undefined && btnDisLast != undefined) {
        return state.theme.btnDisabled = "none"
      } else if (btnDisFirst == undefined && btnDisLast != undefined) {
        return state.theme.btnDisabled = "prev-theme"
      } else if (btnDisFirst != undefined && btnDisLast == undefined) {
        return state.theme.btnDisabled = "next-theme"
      }
    },
    saveInfoForRenameTheme(state, id) {
      return state.theme.rename.saveTheme = id
    },
    delInfoForRenameTheme(state) {
      return state.theme.rename.saveTheme = ""
    },
    saveInputTtlThemeRename(state, id) {
      return state.theme.rename.ttl.inputValue = document.getElementById(id).value
    },
  },
  actions: {
    validateiIputTtlThemeRename(state, text) {
      if (text.length >= 3) {
        return true;
      }
      return false;
    },
    async activeThemeNext({ state, commit, dispatch }) {
      let last = state.theme.themeCards[state.theme.themeCards.length - 1];
      if (last.idx > 0) {
        state.theme.themeCards.forEach((item) => {
          item.idx = item.idx - 1;
        });
        await commit("findActiveTheme");
        await dispatch("changeThemeStyle");
        await dispatch("changeActiveThemeToServer");
        await dispatch("loadPersonRecord");
        await commit("checkToThemeBtnDisabled")
      }
    },
    async activeThemePrev({ state, commit, dispatch }) {
      let first = state.theme.themeCards[0];
      if (first.idx < 0) {
        state.theme.themeCards.forEach((item) => {
          item.idx = item.idx + 1;
        });
        await commit("findActiveTheme");
        await dispatch("changeThemeStyle");
        await dispatch("changeActiveThemeToServer");
        await dispatch("loadPersonRecord");
        await commit("checkToThemeBtnDisabled")
      }
    },
    async changeThemeStyle({ state }) {
      await state.theme.themeCards.forEach((item, index) => {
        let themeIdx = item.idx;
        if (themeIdx >= 0) {
          item.style.left = 50 + 5 * themeIdx + "%";
          item.style.zIndex = 50 - themeIdx;
          item.style.opacity = 1 - 0.25 * themeIdx;
        } else {
          item.style.left = 50 + 5 * themeIdx + "%";
          item.style.zIndex = 50 + themeIdx;
          item.style.opacity = 1 + 0.25 * themeIdx;
        }
      });
    },
    async defaultUploadDefPropTheme({ state, getters, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const defProp = getters.defaultProperties.themeCardsDefault;

        await defProp.forEach((item, index) => {
          const newPostKey = push(child(ref(db), "themeList")).key;
          const updates = {};

          dispatch("uploadDefaultThemeImg", {
            itemImg: item.src,
            itemRef: newPostKey,
          });

          updates[`users/${uid}/info/themeList/${newPostKey}`] = {
            title: item.title,
            src: item.src,
            idx: index,
            imgRef: newPostKey,
          };

          return update(ref(db), updates);
        });
      } catch (error) {
        return await dispatch("getNotificationError", error);
      }
    },
    async getNewTheme({ state, getters, dispatch }) {
      if (
        getters.inputCreateNameThemeBoolean &&
        getters.todolistWorkplace.create.inputLoad
      ) {
        try {
          const uid = await dispatch("getUid");
          const db = getDatabase();
          const inputText = getters.todolistWorkplace.create.themeInput;

          const newPostKey = push(child(ref(db), "themeList")).key;
          const updates = {};

          await dispatch("createNewTheme", newPostKey);

          updates[`users/${uid}/info/themeList/${newPostKey}`] = {
            title: inputText,
            imgRef: newPostKey,
            idx: state.theme.themeCards.length,
            id: newPostKey,
          };

          await update(ref(db), updates);
          return await dispatch("loadTheme");
        } catch (error) {
          return await dispatch("getNotificationError", error);
        }
      }
    },
    async getThemeImg({ state, getters, dispatch }, { url, id }) {
      let newSrc = state.theme.themeCards.find((e) => e.id == id);
      newSrc.src = url;
    },
    async loadTheme({ state, dispatch, getters }) {
      const uid = await dispatch("getUid");
      const dbRef = ref(getDatabase());

      await get(child(dbRef, `users/${uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          let themeCards = snapshot.val().info.themeList;
          let themeCardsMod = Object.entries(themeCards);
          let newThemeCardsMod = [];
          themeCardsMod.forEach((item, index) => {
            let objectOne = {
              id: item[0],
              style: {
                zIndex: 50 - index,
                opacity: 1 - 0.25 * index,
                left: 50 + 5 * index + "%",
              },
            };
            let objectTwo = item[1];
            if (objectTwo.src == undefined) {
              dispatch("loadThemeImg", item[0]);
              objectTwo.imgLoad = "web";
            }
            item.splice(0, 2);
            let objectThree = Object.assign(objectOne, objectTwo);
            return newThemeCardsMod.push(objectThree);
          });
          return (state.theme.themeCards = newThemeCardsMod);
        }
      });
    },
    async delTheme({ state, getters, dispatch }, id) {
      try {
        const delThemeItem = state.theme.themeCards.find((e) => e.id === id);
        const uid = await dispatch("getUid");
        const db = getDatabase();
        let newThemeList = state.theme.themeCards.filter((e) => e.id != id);
        await newThemeList.forEach((item, index) => {
          item.idx = index;
          item.style = {};
          const updates = {};
          updates[`users/${uid}/info/themeList/${item.id}`] = item;
          return update(ref(db), updates);
        });

        const delUpdate = {};
        delUpdate[`users/${uid}/info/themeList/${id}`] = {};
        await update(ref(db), delUpdate);

        if (delThemeItem.imgLoad == "web") {
          await dispatch("delThemeImg", id);
        }

        return await dispatch("loadTheme");
      } catch (error) {
        return await dispatch("getNotificationError", error);
      }
    },
    async uploadActiveThemeToServer({ state, getters, dispatch, commit }, uid) {
      const db = getDatabase();
      const updates = {};
      const activeTheme = state.theme.activeTheme;

      updates[`users/${uid}/info/activeTheme/`] = activeTheme;

      return await update(ref(db), updates);
    },
    async changeActiveThemeToServer({ state, getters, commit, dispatch }) {
      const uid = await dispatch("getUid");
      const db = getDatabase();
      const updates = {};
      const activeTheme = state.theme.activeTheme;

      updates[`users/${uid}/info/activeTheme/`] = activeTheme;

      return await update(ref(db), updates);
    },
    async loadActiveThemeFromServer({ state, getters, dispatch, commit }) {
      const uid = await dispatch("getUid");
      const dbRef = ref(getDatabase());

      await get(child(dbRef, `users/${uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          state.theme.activeTheme = snapshot.val().info.activeTheme;
        }
      });

      await dispatch("changeThemeStyle");
    },
    async changeActiveThemeToServerDef({ state, getters, dispatch, commit }) {
      const db = getDatabase();
      const uid = await dispatch("getUid");
      const updates = {};
      const dbRef = ref(getDatabase());

      let firstTheme = "";

      await get(child(dbRef, `users/${uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          return (firstTheme =
            snapshot.val().info.themeList[
            Object.keys(snapshot.val().info.themeList)[0]
            ]);
        }
      });

      updates[`users/${uid}/info/activeTheme/`] = firstTheme.imgRef;

      return await update(ref(db), updates);
    },
    async toggleThemeRenameFormModule({ state, dispatch }) {
      state.theme.rename.show = !state.theme.rename.show
      await dispatch("hiddenBodyFunc");
    },
    async toggleThemeRenameTtlFormModule({ state, dispatch }) {
      state.theme.rename.ttl.show = !state.theme.rename.ttl.show
      await dispatch("hiddenBodyFunc");
    },
    async toggleThemeRenameImgFormModule({ state, dispatch }) {
      state.theme.rename.img.show = !state.theme.rename.img.show
      await dispatch("hiddenBodyFunc");
    },
    async changeThemeRenameTtlFormModule({ state, commit, dispatch }) {
      try {
        const newThemeTtl = state.theme.rename.ttl.inputValue;
        const newThemeTtlValid = await dispatch("validateiIputTtlThemeRename", newThemeTtl)
        if (newThemeTtlValid) {
          const uid = await dispatch("getUid");
          const db = getDatabase();
          const updates = {};
          const themeId = state.theme.rename.saveTheme
          updates[`users/${uid}/info/themeList/${themeId}/title`] = newThemeTtl;
          await update(ref(db), updates);
          await dispatch("loadTheme")
          await dispatch("loadActiveThemeFromServer")
          await dispatch("getNotificationSuccess", state.theme.rename.ttl.success);
        } else {
          return await dispatch("getNotificationError", state.theme.rename.ttl.error);
        }
      } catch (error) {
        return await dispatch("getNotificationError", error);
      }
    },
    async preloadThemeRenameImgFormModule({ state, dispatch }, e) {
      try {
        const image = e.target.files[0];
        let inputDiv = e.target.closest("div");
        let labelDiv = inputDiv.querySelector("label");

        labelDiv.classList.add("image-file-input__label--sucess");
        return state.theme.rename.img.file = image, state.theme.rename.img.inputLoad = true;
      } catch (error) {
        return await dispatch("getNotificationError", error);
      }
    },
    delThemeRenameImgFormModule({ state, dispatch }, e) {
      let inputDiv = e.target.closest("form");
      let labelDiv = inputDiv.querySelector("label");

      labelDiv.classList.remove("image-file-input__label--sucess");
      return state.theme.rename.img.file = "", state.theme.rename.img.inputLoad = false;
    },
  },
};
