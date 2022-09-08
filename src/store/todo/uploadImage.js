import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
export default {
  state: {
    userImage: {
      uploadImage: "",
      preloadingImage: "",
      success: "Вы успешно сменили аватар!",
    },
  },
  getters: {
    userImage(state) {
      return state.userImage;
    },
  },
  mutations: {},
  actions: {
    async uploadImage({ state, commit, dispatch }) {
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
    async preloadingImage({ state, commit, dispatch }, e) {
      try {
        const image = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        state.userImage.preloadingImage = image;
        await dispatch("loadProfileInputFile");

        const changeAvatarFormFileLabel = document.querySelector(
          ".change-avatar__form-file-label"
        );

        changeAvatarFormFileLabel.classList.add(
          "change-avatar__form-file-label--sucess"
        );
      } catch (error) {
        return await dispatch("getNotificationError", error);
      }
    },
    delPreloadImage({ state, commit, dispatch }) {
      const changeAvatarFormFileLabel = document.querySelector(
        ".change-avatar__form-file-label"
      );

      changeAvatarFormFileLabel.classList.remove(
        "change-avatar__form-file-label--sucess"
      );
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

          const img = document.getElementById("todoProfileImg");
          img.setAttribute("src", url);
          console.log("load confirm");
        })
        .catch((error) => {
          return dispatch("getNotificationError", error);
        });
    },
    async changeAvatar({ state, commit, dispatch }) {
      try {
        await dispatch("uploadImage")
          .then(() => {
            return dispatch("toggleChangeAvatarFormModule");
          })
          .then(() => {
            return dispatch("delPreloadImage");
          })
          .then(() => {
            return dispatch("loadAvatarImage");
          })
          .then(() => {
            return dispatch("getNotificationSuccess", state.userImage.success);
          });
      } catch (error) {
        return await dispatch("getNotificationError", error);
      }
    },
  },
};
