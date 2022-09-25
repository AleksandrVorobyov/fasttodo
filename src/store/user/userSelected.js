import router from "@/router";
import firebase from "firebase/compat/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getAuth } from "firebase/auth";

export default {
  state: {
    user: {
      selected: false,
      uid: "",
      loginSuccess: "Вы успешно вошли в аккаунт!",
      registerSuccess: "Вы успешно зарегистрировали аккаунт!",
    },
    webUser: {
      username: "",
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    webUser(state) {
      return state.webUser;
    },
  },
  mutations: {},
  actions: {
    emailValid(state, email) {
      let reg = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
      if (reg.test(email) == true) {
        return true;
      }
      return false;
    },
    passwordValid(state, { password }) {
      let regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (regularExpression.test(password) == true) {
        return true;
      }
      return false;
    },
    confirmPasswordValid(state, { password, passwordConfirm }) {
      if (passwordConfirm === password) {
        return true;
      }
      return false;
    },
    nameValid(state, name) {
      if (name.length >= 3) {
        return true;
      }
      return false;
    },
    getUid() {
      const auth = getAuth();
      const userId = auth.currentUser.uid;
      return userId;
    },
    async authLocalVerification({ state, dispatch }) {
      let email = localStorage.getItem("fastTodoEmail");
      let password = localStorage.getItem("fastTodoPssword");

      if (email && password) {
        try {
          await firebase.auth().signInWithEmailAndPassword(email, password);
          await dispatch("loadUserName");
          await dispatch("loadTheme");
          await dispatch("changeActiveThemeToServerDef");
          await dispatch("loadActiveThemeFromServer");
          await dispatch("loadPersonRecord");
          const uid = dispatch("getUid");
          state.user.selected = true;
          state.user.uid = uid;
          router.push("/");
          await dispatch("loadAvatarImage");
          await dispatch("changeThemeStyle");
        } catch (error) {
          return router.push("/start"), console.log("error", error);
        }
      } else {
        return router.push("/start");
      }
    },
    getInputReadonly({ state }, boolean) {
      let allInput = document.querySelectorAll("form > input");
      allInput.forEach((item) => {
        item.readOnly = boolean;
      });
    },
    async registerPerson(
      { commit, state, dispatch, getters },
      { name, email, password, passwordConfirm }
    ) {
      const nameValide = await dispatch("nameValid", name);
      const emailValidate = await dispatch("emailValid", email);
      const passwordValide = await dispatch("passwordValid", { password });
      const confirmPasswordValide = await dispatch("confirmPasswordValid", {
        password,
        passwordConfirm,
      });
      dispatch("getInputReadonly", true);
      if (
        emailValidate &&
        passwordValide &&
        nameValide &&
        confirmPasswordValide
      ) {
        try {
          await firebase.auth().createUserWithEmailAndPassword(email, password);
          const uid = await dispatch("getUid");
          const db = getDatabase();
          await set(ref(db, `/users/${uid}/info`), {
            username: name,
            userId: uid,
            email: email,
            password: password,
            activeTheme: getters.theme.activeTheme,
          })
            .then(() => {
              dispatch("defaultUploadDefPropTheme");
            })
            .then(() => {
              dispatch("defaultUploadAvatarImg");
              state.user.selected = true;
              state.user.uid = uid;
              let emailPerson = localStorage.setItem("fastTodoEmail", email);
              let passwordPerson = localStorage.setItem(
                "fastTodoPssword",
                password
              );
            })
            .then(() => {
              dispatch("loadPersonRecord");
              dispatch("uploadActiveThemeToServer", uid);
              dispatch("loadUserName");
              dispatch("loadTheme");
              dispatch("getNotificationSuccess", state.user.registerSuccess);
            })
            .then(() => {
              setTimeout(() => {
                router.push("/");
              }, 1500);
            })
            .then(() => {
              dispatch("changeThemeStyle");
            });
          return;
        } catch (e) {
          return dispatch("getInputReadonly", false);
        }
      }
      dispatch("getInputReadonly", false);
      if (!nameValide) {
        return await dispatch("getNotificationError", "Неверное имя!");
      }
      if (!emailValidate) {
        return await dispatch("getNotificationError", "Неверная почта!");
      }
      if (!passwordValide) {
        return await dispatch("getNotificationError", "Неверный пароль!");
      }
      if (!confirmPasswordValide) {
        return await dispatch(
          "getNotificationError",
          "Неверно введен повторный пароль!"
        );
      }
    },
    async loginFirebase(
      { dispatch, commit, state, getters },
      { email, password }
    ) {
      const emailValidate = await dispatch("emailValid", email);
      const passwordValide = await dispatch("passwordValid", { password });
      await dispatch("getInputReadonly", true);

      if (emailValidate && passwordValide) {
        try {
          await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
              const uid = dispatch("getUid");
              state.user.uid = uid;
              state.user.selected = true;
              let emailPerson = localStorage.setItem("fastTodoEmail", email);
              let passwordPerson = localStorage.setItem(
                "fastTodoPssword",
                password
              );
              dispatch("changeActiveThemeToServerDef");
              dispatch("loadActiveThemeFromServer");
              dispatch("loadPersonRecord");
              dispatch("loadUserName");
              dispatch("loadTheme");
              dispatch("getNotificationSuccess", state.user.loginSuccess);
              router.push("/");
            })
            .then(() => {
              dispatch("loadAvatarImage");
            })
            .then(() => {
              dispatch("changeThemeStyle");
            })
            .catch((error) => {
              dispatch("getNotificationError", error);
            });
          return;
        } catch (e) {
          return (
            console.log(e),
            await dispatch(
              "getNotificationError",
              "Ошибка! Неверные почта или пароль!"
            ),
            await dispatch("getInputReadonly", false)
          );
        }
      } else {
        return (
          await dispatch(
            "getNotificationError",
            "Ошибка! Проверьте введенные данные!"
          ),
          dispatch("getInputReadonly")
        );
      }
    },
    async logout() {
      await firebase.auth().signOut();
      localStorage.clear();
    },
    async loadUserName({ state, dispatch }) {
      const uid = await dispatch("getUid");
      const dbRef = ref(getDatabase());

      await get(child(dbRef, `users/${uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          let user = snapshot.val().info.username;
          return (state.webUser.username = user);
        }
      });
    },
  },
};
