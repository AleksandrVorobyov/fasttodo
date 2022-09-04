import router from "@/router";
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
import notification from "./notification";
import defaultProperties from "./defaultProperties";

router.beforeEach((to, from) => {
  localStorage.setItem("lastPageRoute", to.fullPath);
});

export default {
  state: {
    user: {
      selected: false,
      uid: "",
    },
    webUser: {
      username: "",
      themeCards: "",
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
      let lastPageRoute = localStorage.getItem("lastPageRoute");

      if (email && password) {
        try {
          await firebase.auth().signInWithEmailAndPassword(email, password);
          const uid = await dispatch("getUid");
          await dispatch("loadProfileBase");
          await dispatch("loadPersonRecord");
          state.user.selected = true;
          state.user.uid = uid;
          return router.push("/");
        } catch (error) {
          if (lastPageRoute) {
            return router.push(lastPageRoute), console.log("error", error);
          }
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
      { commit, state, dispatch },
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
          const defProp = defaultProperties.state.defaultProperties;
          set(ref(db, `/users/${uid}/info`), {
            username: name,
            userId: uid,
            email: email,
            password: password,
            bill: 10000,
            defProp: defProp,
          });
          state.user.selected = true;
          state.user.uid = uid;
          let emailPerson = localStorage.setItem("fastTodoEmail", email);
          let passwordPerson = localStorage.setItem(
            "fastTodoPssword",
            password
          );
          await dispatch("loadPersonRecord");
          await dispatch("loadProfileBase");
          setTimeout(() => {
            router.push("/");
          }, 1500);
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
      console.log(email);
      console.log(password);

      dispatch("getInputReadonly", true);
      if (emailValidate && passwordValide) {
        try {
          await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
              console.log("yes");
            })
            .catch((error) => {
              console.log(error);
            });
          const uid = await dispatch("getUid");
          state.user.uid = uid;
          state.user.selected = true;
          let emailPerson = localStorage.setItem("fastTodoEmail", email);
          let passwordPerson = localStorage.setItem(
            "fastTodoPssword",
            password
          );
          await dispatch("loadPersonRecord");
          await dispatch("loadProfileBase");
          setTimeout(() => {
            router.push("/");
          }, 1500);
          return;
        } catch (e) {
          return (
            console.log(e),
            await dispatch(
              "getNotificationError",
              "Ошибка! Неверные почта или пароль!"
            ),
            dispatch("getInputReadonly", false)
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
    async loadProfileBase({ state, dispatch }) {
      const uid = await dispatch("getUid");
      const dbRef = ref(getDatabase());

      await get(child(dbRef, `users/${uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          let user = snapshot.val().info.username;
          let themeCards = snapshot.val().info.defProp.themeCardsDefault;
          return (
            (state.webUser.username = user),
            (state.webUser.themeCards = themeCards)
          );
        }
      });
    },
  },
  modules: {
    notification,
    defaultProperties,
  },
};
