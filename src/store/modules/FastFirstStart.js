import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
export default {
    state: {
        firstStart: {
            title: `Лучшее <span class="title-gradient">ToDo</span> приложение для планирования вашего дня!`,
            subtitle: "Вы можете создавать задачи на целый день, групировать по категориям, отмечать как сделаные или просто удалять.",
            btnText: "Продолжить",
            animSection: true,
        },
    },
    getters: {
        firstStart(state) {
            return state.firstStart;
        },
    },
    mutations: {

    },
    actions: {
        animFirstStart({ commit, state }, payload) {
            if (window.innerWidth >= 768) {
                if (state.firstStart.animSection) {
                    gsap.from('.first-start__bg', {
                        opacity: 0,
                        duration: 1,
                        scale: 0
                    });

                    gsap.from('.first-start__info', {
                        opacity: 0,
                        duration: 1,
                        scale: 0
                    });
                } else {
                    gsap.to('.first-start__bg', {
                        opacity: 0,
                        duration: 1,
                        scale: 0
                    });

                    gsap.to('.first-start__info', {
                        opacity: 0,
                        duration: 1,
                        scale: 0
                    });
                }
            }
        },
    }
}