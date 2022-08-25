import router from '@/router'
import firebase from 'firebase/compat/app';
import { getDatabase, ref, set, get, child, push, update, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import notification from "./notification"
import { Number } from 'core-js';

router.beforeEach((to, from) => {
    localStorage.setItem('lastPageRoute', to.fullPath)
})

export default {
    state: {
        user: {
            selected: false
        },
        personRecord: []
    },
    getters: {
        user(state) {
            return state.user;
        },
        personRecord(state) {
            return state.personRecord;
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
        getUid() {
            const auth = getAuth();
            const userId = auth.currentUser.uid;
            return userId
        },
        getUpperFirstletter(state, text) {
            const splitted = text.split("")
            const first = splitted[0].toUpperCase()
            const rest = [...splitted]
            rest.splice(0, 1)
            const result = [first, ...rest].join("")
            return result
        },
        async authLocalVerification({ state, dispatch }) {
            let email = localStorage.getItem('fastTodoEmail')
            let password = localStorage.getItem('fastTodoPssword')
            if (email && password) {
                try {
                    await firebase.auth().signInWithEmailAndPassword(email, password)
                    await dispatch("loadPersonRecord")
                    state.user.selected = true
                    return router.push('/')
                } catch (error) {
                    return console.log("error", error);
                }
            }
        },
        getInputReadonly({ state }, boolean) {
            let allInput = document.querySelectorAll("form > input");
            allInput.forEach((item) => {
                item.readOnly = boolean;
            })
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
                    await dispatch("loadPersonRecord")
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
                    await dispatch("loadPersonRecord")
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
        },
        async loadPersonRecord({ state, dispatch }) {
            const uid = await dispatch("getUid");
            const dbRef = ref(getDatabase());

            await get(child(dbRef, `users/${uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    let allTheme = snapshot.val().info.recordList
                    let result = Object.entries(allTheme);
                    let keys = []

                    for (let idx = 0; idx < result.length; idx++) {
                        let obj = Object.assign({}, result[idx]);
                        keys.push(obj);
                    }

                    keys = keys.map(function (obj) {
                        obj['id'] = obj['0'];
                        obj['text'] = obj['1'];
                        delete obj['0'];
                        delete obj['1'];
                        return obj;
                    });

                    localStorage.setItem("webListTodo", JSON.stringify(keys))

                    return state.personRecord = keys;
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                return false
            });
        },
        async getNewRecord({ state, dispatch, commit }, message) {
            const productInput = document.getElementById("todoFormInput");
            if (productInput.value != "") {
                const yourMessage = await dispatch("getUpperFirstletter", message)
                const db = getDatabase();
                const uid = await dispatch("getUid");

                const newPostKey = push(child(ref(db), 'recordList')).key;
                const updates = {};

                updates[`users/${uid}/info/recordList/${newPostKey}`] = yourMessage;

                let content = []

                if (JSON.parse(localStorage.getItem("webListTodo"))) {
                    content = JSON.parse(localStorage.getItem("webListTodo"))
                }

                let item = {
                    id: newPostKey,
                    text: yourMessage
                }

                content.push(item)

                localStorage.setItem("webListTodo", JSON.stringify(content))

                productInput.value = ""

                state.personRecord.push(item)

                return update(ref(db), updates);
            } else {
                return alert("Gecnjt поле!")
            }
        },
        async delRecord({ state, dispatch }, record) {
            const db = getDatabase();
            const uid = await dispatch("getUid");

            state.personRecord.splice(record, 1)

            let content = JSON.parse(localStorage.getItem("webListTodo"));

            let delElem = content.splice(record, 1)

            localStorage.setItem("webListTodo", JSON.stringify(content))
            const updates = {};
            updates[`users/${uid}/info/recordList/${delElem[0].id}`] = null;
            await update(ref(db), updates);
        }
    },
    modules: {
        notification
    }
}