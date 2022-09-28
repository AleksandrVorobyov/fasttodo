import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
  deleteObject
} from "firebase/storage";
export default {
  state: {
    userImage: {
      uploadImage: "",
      preloadingImage: "",
      success: "Вы успешно сменили аватар!",
    },
    themes: {
      uploadImage: "",
      preloadingImage: "",
      success: "Вы успешно загрузили картинку!",
    },
  },
  getters: {
    userImage(state) {
      return state.userImage;
    },
    themes(state) {
      return state.themes;
    },
  },
  mutations: {
  },
  actions: {
    async uploadImageAvatar({ state, commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const image = state.userImage.preloadingImage;

        const storage = getStorage();
        const spaceRef = ref(storage, `users/${uid}/avatar/`);

        const metadata = {
          contentType: "image/jpeg",
        };

        await uploadBytes(spaceRef, image, metadata).then((snapshot) => {
          console.log("Uploaded a blob or file!");
        });
      } catch (err) {
        return await dispatch("getNotificationError", err);
      }
    },
    async preloadingImageAvatar({ state, commit, dispatch }, e) {
      try {
        const image = e.target.files[0];
        state.userImage.preloadingImage = image;
        await dispatch("loadProfileInputFile");

        let inputDiv = e.target.closest("div");
        let labelDiv = inputDiv.querySelector("label");

        labelDiv.classList.add("image-file-input__label--sucess");
      } catch (err) {
        return await dispatch("getNotificationError", err);
      }
    },
    delPreloadImageAvatar({ state, commit, dispatch }, e) {
      if (e) {
        let inputDiv = e.target.closest("form");
        let labelDiv = inputDiv.querySelector("label");

        return labelDiv.classList.remove("image-file-input__label--sucess");
      }
      return document
        .getElementById("changeAvatarFormFileLabel")
        .classList.remove("image-file-input__label--sucess");
    },
    async loadAvatarImage({ state, commit, dispatch }) {
      const uid = await dispatch("getUid");
      const storage = getStorage();
      const httpsReference = ref(
        storage,
        `gs://fasttodo-91684.appspot.com/users/${uid}/avatar`
      );

      await getDownloadURL(ref(storage, httpsReference))
        .then((url) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.open("GET", url);

          const img = document.getElementById("todolistProfileImg");
          img.setAttribute("src", url);
          console.log("load confirm");
        })
        .catch((error) => {
          return dispatch("getNotificationError", error);
        });
    },
    async changeAvatar({ state, commit, dispatch }) {
      try {
        await dispatch("uploadImageAvatar")
          .then(() => {
            return dispatch("loadAvatarImage");
          })
          .then(() => {
            return dispatch("toggleChangeAvatarFormModule");
          })
          .then(() => {
            return dispatch("delPreloadImageAvatar");
          })
          .then(() => {
            return dispatch("getNotificationSuccess", state.userImage.success);
          });
      } catch (err) {
        return await dispatch("getNotificationError", err);
      }
    },
    async preloadingImageThemeAdd({ state, commit, dispatch }, e) {
      try {
        const image = e.target.files[0];
        state.themes.preloadingImage = image;
        await dispatch("loadThemeCreateInputLoad");

        let inputDiv = e.target.closest("div");
        let labelDiv = inputDiv.querySelector("label");

        labelDiv.classList.add("image-file-input__label--sucess");
      } catch (err) {
        return await dispatch("getNotificationError", err);
      }
    },
    async uploadThemeRenameImgFormModule({ state, getters, commit, dispatch }, e) {
      try {
        const image = await getters.theme.rename.img.file;
        const uid = await dispatch("getUid");
        const storage = getStorage();
        const themeId = await getters.theme.rename.saveTheme
        const success = await getters.theme.rename.img.success

        const spaceRef = ref(storage, `users/${uid}/theme/${themeId}`);

        const metadata = {
          contentType: "image/jpeg",
        };

        await uploadBytes(spaceRef, image, metadata).then((snapshot) => {
          console.log("Uploaded a blob or file!");
        });

        await dispatch("getNotificationSuccess", success);

        return await dispatch("loadThemeImg", themeId)
      } catch (err) {
        return await dispatch("getNotificationError", err);
      }
    },
    delPreloadImageThemeAdd({ state, commit, dispatch }, e) {
      if (e) {
        let inputDiv = e.target.closest("form");
        let labelDiv = inputDiv.querySelector("label");

        return labelDiv.classList.remove("image-file-input__label--sucess");
      }
      return document
        .getElementById("workplaceFileInputAddLabelName")
        .classList.remove("image-file-input__label--sucess");
    },
    async uploadImageThemeAdd({ state, commit, dispatch }, themeRef) {
      try {
        const uid = await dispatch("getUid");
        const image = state.themes.preloadingImage;

        const storage = getStorage();
        const spaceRef = ref(storage, `users/${uid}/theme/${themeRef}`);

        const metadata = {
          contentType: "image/jpeg",
        };

        await uploadBytes(spaceRef, image, metadata).then((snapshot) => {
          console.log("Uploaded a blob or file!");
        });
      } catch (err) {
        return await dispatch("getNotificationError", err);
      }
    },
    async createNewTheme({ state, commit, dispatch, getters }, themeRef) {
      try {
        await dispatch("uploadImageThemeAdd", themeRef)
        await commit("hiddenWorkPlace");
        await commit("clearInputCreateNameTheme");
        await dispatch("delPreloadImageThemeAdd");
        await dispatch("getNotificationSuccess", state.themes.success);
      } catch (err) {
        return await dispatch("getNotificationError", err);
      }
    },
    async defaultUploadAvatarImg({ state, commit, dispatch, getters }) {
      try {
        const uid = await dispatch("getUid");
        const defaultImg = new Image();
        defaultImg.src = require("@/assets/img/avatar/main.png");

        const storage = getStorage();
        const spaceRef = ref(storage, `users/${uid}/avatar/`);

        await uploadString(spaceRef, defaultImg.src, "data_url").then(
          (snapshot) => {
            console.log("Uploaded a data_url string!");
          }
        );
      } catch (err) {
        return await dispatch("getNotificationError", err);
      }
    },
    async uploadDefaultThemeImg(
      { dispatch },
      { itemImg, itemRef }
    ) {
      try {
        const uid = await dispatch("getUid");
        const storage = getStorage();
        const spaceRef = ref(storage, `users/${uid}/theme/${itemRef}/`);

        const defaultImg = new Image();
        defaultImg.src = require(`@/assets/img/${itemImg}`);

        await fetch(defaultImg.src)
          .then((res) => res.blob())
          .then((blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              uploadString(spaceRef, reader.result, "data_url").then(
                (snapshot) => {
                  console.log("Uploaded a data_url string!");
                }
              );
            };
            reader.readAsDataURL(blob);
          });

      } catch (err) {
        return await dispatch("getNotificationError", err);
      }
    },
    async loadThemeImg({ state, dispatch, getters }, themeId) {
      try {
        const uid = await dispatch("getUid");
        const storage = getStorage();
        const httpsReference = ref(
          storage,
          `gs://fasttodo-91684.appspot.com/users/${uid}/theme/${themeId}`
        );
        await getDownloadURL(ref(storage, httpsReference))
          .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.open("GET", url)
            const themeImg = new Image();
            themeImg.src = url;
            dispatch("getThemeImg", {
              url: url,
              id: themeId
            })
          })
      } catch (err) {
        return await dispatch("getNotificationError", err);
      }
    },
    async delThemeImg({ state, dispatch, getters }, themeId) {
      try {
        const uid = await dispatch("getUid");
        const storage = getStorage();
        const desertRef = ref(storage, `users/${uid}/theme/${themeId}`);

        await deleteObject(desertRef).then(() => {
          console.log("File deleted successfully");
        })
      } catch (err) {
        return await dispatch("getNotificationError", err);
      }
    }
  },
};
