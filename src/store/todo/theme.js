import {
  getDatabase,
  ref,
  get,
  child,
  push,
  update,

} from "firebase/database";
export default {
  state: {
    theme: {
      activeTheme: "Спорт",
      themeCards: [],
      title: "Активная тема:",
      btnIcon: "arrow",
      lastTheme: ""
    },
  },
  getters: {
    theme(state) {
      return state.theme;
    },
  },
  mutations: {
    findActiveTheme(state) {
      return (state.activeTheme = state.theme.themeCards.find(
        (e) => e.idx == 0
      ).title);
    },
  },
  actions: {
    async themeIndexPlus({ state, commit, dispatch }) {
      let last = state.theme.themeCards[state.theme.themeCards.length - 1];
      if (last.idx > 0) {
        state.theme.themeCards.forEach((item) => {
          item.idx = item.idx - 1;
        });
        await commit("findActiveTheme");
        await dispatch("getThemeStyle");
      }
    },
    async themeIndexmin({ state, commit, dispatch }) {
      let first = state.theme.themeCards[0];
      if (first.idx < 0) {
        state.theme.themeCards.forEach((item) => {
          item.idx = item.idx + 1;
        });
        await commit("findActiveTheme");
        await dispatch("getThemeStyle");
      }
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
          const inputText = getters.todolistWorkplace.create.themeInput

          const newPostKey = push(child(ref(db), "themeList")).key;
          const updates = {};

          await dispatch("createNewTheme", newPostKey);

          updates[`users/${uid}/info/themeList/${newPostKey}`] = {
            title: inputText,
            imgRef: newPostKey,
            idx: state.theme.themeCards.length
          };

          await update(ref(db), updates);
          return await dispatch("loadTheme")
        } catch (error) {
          return await dispatch("getNotificationError", error);
        }
      }
    },
    async getThemeStyle({ state }) {
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
    async getThemeImg({ state, getters, dispatch }, { url, id }) {
      let newSrc = state.theme.themeCards.find((e) => e.id == id);
      newSrc.src = url
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
                left: 50 + 5 * index + "%"
              }
            }
            let objectTwo = item[1];
            if (objectTwo.src == undefined) {
              dispatch("loadThemeImg", item[0])
              objectTwo.imgLoad = "web"
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
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const updates = {};
        updates[`users/${uid}/info/themeList/${id}`] = {};
        await update(ref(db), updates);
        await dispatch("delThemeImg", id)
        return await dispatch("loadTheme")
      } catch (error) {
        return await dispatch("getNotificationError", error);
      }
    }
  },
};
