import { gsap } from "gsap";
import router from '@/router'
export default {
    state: {
        login: {
            animSection: false,
            register: false,
            avatar: {
                img: "login/no-profile.jpg"
            },
            title: `Зайдите в свой <span class="title-gradient">Account</span>!`,
            btnText: "Авторизоваться",
            btnRegister: `Вы все еще не зарегистрировались?`,
            input: [
                {
                    id: "login-form-input-email",
                    type: "email",
                    class: "login__form-input",
                    value: "",
                    placeholder: "Enter your email...",
                },
                {
                    id: "login-form-input-password",
                    type: "password",
                    class: "login__form-input",
                    value: "",
                    placeholder: "Enter your password...",
                },
            ],
        },
    },
    getters: {
        login(state) {
            return state.login;
        },
    },
    mutations: {
    },
    actions: {
        loginToRouter({ commit, state }, products) {
            if (window.innerWidth >= 768) {
                setTimeout(() => {
                    router.push('/login')
                }, 1000);
            } else {
                router.push('/login')
            }
        },
        animLogin({ commit, state }, payload) {
            if (window.innerWidth >= 768) {
                if (state.login.animSection) {
                    gsap.from('.login__form', {
                        opacity: 0,
                        duration: 1,
                        x: -1000
                    });
                } else {
                    gsap.to('.login__form', {
                        opacity: 0,
                        duration: 1,
                        x: 1000
                    });
                }
            }
        },
        loginInputSave({ state, getters }, id) {
            let content = document.getElementById(id).value;
            let elem = state.login.input.find((e) => e.id === id);
            return elem.value = content;
        },
    }
}