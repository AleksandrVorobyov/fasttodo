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
      errors: {
        emailNotValid: "Неверная почта!",
        emailEmpty: "Введите свою почту!",
        passwordNotValid: "Неверный пароль!",
        passwordEmpty: "Введите пароль!",
        emailNotValidReg: "Неверная почта!",
        passwordNotValidReg: "Неверный пароль!",
        passwordConfNotValidReg: "Неверно введен повторный пароль!",
        nameNotValidReg: "Неверное имя пользователя!",
        emailDubleOrHosting: "Пользователь с такой почтой уже зарегистрирован!"
      },
      errCode: {
        dubleEmail: "auth/email-already-in-use"
      }
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
    passwordValid(state, password) {
      let regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (regularExpression.test(password) == true) {
        return true;
      }
      return false;
    },
    emailEmpty(state, email) {
      if (email === "") {
        return false;
      }
      return true;
    },
    passwordEmpty(state, password) {
      if (password === "") {
        return false;
      }
      return true;
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
      try {
        let email = localStorage.getItem("fastTodoEmail");
        let password = localStorage.getItem("fastTodoPssword");

        if (!email && !password) {
          throw new SyntaxError("Войдите в аккаунт");
        }

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
      } catch (err) {
        return router.push("/start"), console.log("error", err.message);
      }
    },
    getInputReadonly({ state }, boolean) {
      let allInput = document.querySelectorAll("form > input");
      allInput.forEach((item) => {
        item.readOnly = boolean;
      });
    },
    async registerPerson({ commit, state, dispatch, getters }, { name, email, password, passwordConfirm }) {
      await dispatch("getInputReadonly", true);
      try {
        const emailEmpty = await dispatch("emailEmpty", email);
        const passwordEmpty = await dispatch("passwordEmpty", password);
        const nameValide = await dispatch("nameValid", name);
        const emailValidate = await dispatch("emailValid", email);
        const passwordValide = await dispatch("passwordValid", password);
        const confirmPasswordValide = await dispatch("confirmPasswordValid", {
          password,
          passwordConfirm,
        });

        if (!emailEmpty) {
          throw new SyntaxError(state.user.errors.emailEmpty);
        }

        if (!passwordEmpty) {
          throw new SyntaxError(state.user.errors.passwordEmpty);
        }

        if (!nameValide) {
          throw new SyntaxError(state.user.errors.nameNotValidReg);
        }

        if (!emailValidate) {
          throw new SyntaxError(state.user.errors.emailNotValidReg);
        }

        if (!passwordValide) {
          throw new SyntaxError(state.user.errors.passwordNotValidReg);
        }

        if (!confirmPasswordValide) {
          throw new SyntaxError(state.user.errors.passwordConfNotValidReg);
        }

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
      } catch (err) {
        if (err.code === state.user.errCode.dubleEmail) {
          return await dispatch("getNotificationError", state.user.errors.emailDubleOrHosting), await dispatch("getInputReadonly", false);
        } else {
          return await dispatch("getNotificationError", err.message), await dispatch("getInputReadonly", false);
        }
      }
    },
    async loginFirebase({ dispatch, commit, state, getters }, { email, password }) {
      await dispatch("getInputReadonly", true);
      try {
        const emailEmpty = await dispatch("emailEmpty", email);
        const passwordEmpty = await dispatch("passwordEmpty", password);
        const emailValidate = await dispatch("emailValid", email);
        const passwordValide = await dispatch("passwordValid", password);

        if (!emailEmpty) {
          throw new SyntaxError(state.user.errors.emailEmpty);
        }

        if (!passwordEmpty) {
          throw new SyntaxError(state.user.errors.passwordEmpty);
        }

        if (!emailValidate) {
          throw new SyntaxError(state.user.errors.emailNotValid);
        }

        if (!passwordValide) {
          throw new SyntaxError(state.user.errors.passwordNotValid);
        }

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
          })
        await dispatch("changeActiveThemeToServerDef");
        await dispatch("loadActiveThemeFromServer");
        await dispatch("loadPersonRecord");
        await dispatch("loadUserName");
        await dispatch("loadTheme");
        await dispatch("getNotificationSuccess", state.user.loginSuccess);
        router.push("/");
        await dispatch("loadAvatarImage");
        await dispatch("changeThemeStyle");
        return;
      } catch (err) {
        return (
          await dispatch("getNotificationError", err.message),
          await dispatch("getInputReadonly", false)
        );
      }
    },
    async logout() {
      await firebase.auth().signOut();
      localStorage.clear();
    },
    async loadUserName({ state, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const dbRef = ref(getDatabase());

        await get(child(dbRef, `users/${uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            let user = snapshot.val().info.username;
            return (state.webUser.username = user);
          }
        });
      } catch (err) {
        return await dispatch("getNotificationError", err);
      }
    },
  },
};
