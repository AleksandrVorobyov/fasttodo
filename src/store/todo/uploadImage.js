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
      } catch (error) {
        return await dispatch("getNotificationError", error);
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
      } catch (error) {
        return await dispatch("getNotificationError", error);
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
      } catch (error) {
        return await dispatch("getNotificationError", error);
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
      } catch (error) {
        return await dispatch("getNotificationError", error);
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
      } catch (error) {
        return await dispatch("getNotificationError", error);
      }
    },
    async createNewTheme({ state, commit, dispatch, getters }, themeRef) {
      try {
        try {
          await dispatch("uploadImageThemeAdd", themeRef)
        } catch (error) {
          console.log("error - uploadImageThemeAdd");
        }
        // await dispatch("uploadImageThemeAdd", themeRef)

        try {
          await commit("hiddenWorkPlace");
        } catch (error) {
          console.log("error - hiddenWorkPlace");
        }
        try {
          await commit("clearInputCreateNameTheme");
        } catch (error) {
          console.log("error - clearInputCreateNameTheme");
        }

        try {
          await dispatch("delPreloadImageThemeAdd");
        } catch (error) {
          console.log("error - delPreloadImageThemeAdd");
        }
        try {
          await dispatch("getNotificationSuccess", state.themes.success);
        } catch (error) {
          console.log("error - getNotificationSuccess");
        }

        // await commit("activeWorkPlace")
        // await commit("clearInputCreateNameTheme")
        // await dispatch("delPreloadImageThemeAdd")
        // await dispatch(
        //   "getNotificationSuccess",
        //   state.themes.success
        // )
      } catch (error) {
        return await dispatch("getNotificationError", error);
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
      } catch (error) {
        return await dispatch("getNotificationError", error);
      }
    },
    async uploadDefaultThemeImg(
      { state, commit, dispatch, getters },
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


      } catch (error) {
        return await dispatch("getNotificationError", error);
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
      } catch (error) {
        return await dispatch("getNotificationError", error);
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
      } catch (error) {
        return await dispatch("getNotificationError", error);
      }
    }
  },
};
