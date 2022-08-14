import router from '@/router'
import firebase from 'firebase/compat/app';
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";

router.beforeEach((to, from) => {
    localStorage.setItem('lastPageRoute', to.fullPath)
})

export default {
    state: {
        user: {
            selected: false
        },
        notification: {
            visible: false,
            type: null,
            text: null
        },
    },
    getters: {
        user(state) {
            return state.user;
        },
        notification(state) {
            return state.notification;
        },
    },
    mutations: {
    },
    actions: {
        emailValid(state, email) {
            let reg = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
            if (reg.test(email) == true) {
                return true;
            }
            return false
        },
        passwordValid(state, { password }) {
            let regularExpression = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
            if (regularExpression.test(password) == true) {
                return true
            }
            return false
        },
        confirmPasswordValid(state, { password, passwordConfirm }) {
            if (passwordConfirm === password) {
                return true
            }
            return false
        },
        nameValid(state, name) {
            if (name.length >= 3) {
                return true
            }
            return false
        },
        async authLocalVerification({ state }) {
            let email = localStorage.getItem('fastTodoEmail')
            let password = localStorage.getItem('fastTodoPssword')
            if (email && password) {
                try {
                    // await firebase.auth().signInWithEmailAndPassword(email, password)
                    state.user.selected = true
                    return router.push('/')
                } catch (error) {
                    return console.log("error", error);
                }
            }
        },
        getUid() {
            const auth = getAuth();
            const userId = auth.currentUser.uid;
            return userId
        },
        getInputReadonly({ state }, boolean) {
            let allInput = document.querySelectorAll("form > input");
            allInput.forEach((item) => {
                item.readOnly = boolean;
            })
        },
        getNotificationError({ state }, text) {
            state.notification.type = "notificationError"
            state.notification.text = text
            state.notification.visible = true
            setTimeout(() => {
                return state.notification.type, state.notification.text = null, state.notification.visible = false
            }, 4000);
        },
        async registerPerson({ commit, state, dispatch }, { name, email, password, passwordConfirm }) {
            const nameValide = await dispatch('nameValid', name);
            const emailValidate = await dispatch('emailValid', email);
            const passwordValide = await dispatch('passwordValid', { password });
            const confirmPasswordValide = await dispatch('confirmPasswordValid', { password, passwordConfirm });
            dispatch('getInputReadonly', true);

            if (emailValidate && passwordValide && nameValide && confirmPasswordValide) {
                try {
                    await firebase.auth().createUserWithEmailAndPassword(email, password);
                    const uid = await dispatch("getUid");
                    const db = getDatabase();
                    set(ref(db, `/users/${uid}/info`), {
                        username: name,
                        userId: uid,
                        email: email,
                        password: password,
                        bill: 10000,
                    });
                    state.user.selected = true;
                    let emailPerson = localStorage.setItem('fastTodoEmail', email)
                    let passwordPerson = localStorage.setItem('fastTodoPssword', password)
                    setTimeout(() => {
                        router.push('/')
                    }, 1500);
                    return
                }
                catch (e) {
                    return dispatch('getInputReadonly', false);
                }
            }
            dispatch('getInputReadonly', false);
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
                return await dispatch("getNotificationError", "Неверно введен повторный пароль!");
            }
        },
        async loginFirebase({ dispatch, commit, state, getters }, { email, password }) {
            const emailValidate = await dispatch('emailValid', email);
            const passwordValide = await dispatch('passwordValid', { password });
            dispatch('getInputReadonly', true);
            if (emailValidate && passwordValide) {
                try {
                    await firebase.auth().signInWithEmailAndPassword(email, password)
                    state.user.selected = true;
                    let emailPerson = localStorage.setItem('fastTodoEmail', email)
                    let passwordPerson = localStorage.setItem('fastTodoPssword', password)
                    setTimeout(() => {
                        router.push('/')
                    }, 1500);
                    return
                }
                catch (e) {
                    return await dispatch("getNotificationError", "Ошибка! Неверные почта или пароль!"), dispatch('getInputReadonly', false);
                }
            } else {
                return await dispatch("getNotificationError", "Ошибка! Проверьте введенные данные!"), dispatch('getInputReadonly');
            }
        },
        async logout() {
            await firebase.auth().signOut()
            localStorage.clear()
        }
    },
}