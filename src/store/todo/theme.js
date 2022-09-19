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
          };

          return update(ref(db), updates);
        });
      } catch (error) {
        return await dispatch("getNotificationError", error);
      }
    },
    async loadTheme({ state, dispatch }) {
      const uid = await dispatch("getUid");
      const dbRef = ref(getDatabase());

      await get(child(dbRef, `users/${uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          let themeCards = snapshot.val().info.themeList;
          let themeCardsMod = Object.entries(themeCards);
          let newThemeCardsMod = [];
          themeCardsMod.forEach((item, index) => {
            let oblectOne = {
              id: item[0],
              style: {
                zIndex: 50 - index,
                opacity: 1 - 0.25 * index,
                left: 50 + 5 * index + "%"
              }
            };
            let oblectTwo = item[1];
            item.splice(0, 2);
            let objectThree = Object.assign(oblectOne, oblectTwo);
            return newThemeCardsMod.push(objectThree);
          });

          return (state.theme.themeCards = newThemeCardsMod);
        }
      });
    },
    async getThemeStyle({state}) {
      await state.theme.themeCards.forEach((item, index) => {
        let dataItem = item.idx;
        if (dataItem >= 0) {
          item.style.left = 50 + 5 * dataItem + "%";
          item.style.zIndex = 50 - dataItem;
          item.style.opacity = 1 - 0.25 * dataItem;
        } else {
          item.style.left = 50 + 5 * dataItem + "%";
          item.style.zIndex = 50 + dataItem;
          item.style.opacity = 1 + 0.25 * dataItem;
        }
      });
    },
  },
};
