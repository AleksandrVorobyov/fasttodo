import router from '@/router'
import { gsap } from "gsap";
export default {
    state: {
        registration: {
            animSection: false,
            title: "Введите свои данные!",
            avatarImg: "login/no-profile.jpg",
            input: [
                {
                    id: "registration-form-input-name",
                    type: "text",
                    class: "registration__form-input",
                    value: "",
                    placeholder: "Enter your name...",
                },
                {
                    id: "registration-form-input-email",
                    type: "email",
                    class: "registration__form-input",
                    value: "",
                    placeholder: "Enter your email...",
                },
                {
                    id: "registration-form-input-password",
                    type: "password",
                    class: "registration__form-input",
                    value: "",
                    placeholder: "Enter your password...",
                },
                {
                    id: "registration-form-input-password-confirm",
                    type: "password",
                    class: "registration__form-input",
                    value: "",
                    placeholder: "Confirm your password...",
                },
            ],
            btnText: "Регистрация",
            question: "У вас уже есть регистрация?"
        },
    },
    getters: {
        registration(state) {
            return state.registration;
        },
    },
    mutations: {
        registrationinputSave(state, id) {
            let content = document.getElementById(id).value;
            let elem = state.registration.input.find((e) => e.id === id);
            return elem.value = content;
        },
    },
    actions: {
        registrationTo({ commit, state }, products) {
            if (window.innerWidth >= 768) {
                setTimeout(() => {
                    router.push('/registration')
                }, 1000);
            } else {
                router.push('/registration')
            }
        },
        animRegistration({ commit, state }) {
            if (window.innerWidth >= 768) {
                if (state.registration.animSection) {
                    gsap.from('.registration__form', {
                        opacity: 0,
                        duration: 1,
                        x: -1000
                    });
                } else {
                    gsap.to('.registration__form', {
                        opacity: 0,
                        duration: 1,
                        x: 1000
                    });
                }
            }
        },
    }
}