export default {
    state: {
        navigation: {
            logo: {
                img: "logo/logo.png",
                title: ["Fast To Do",
                    "by Alex(Voojaxx)"]
            },
        },
    },
    getters: {
        navigation(state) {
            return state.navigation;
        },
    },
    mutations: {
        navigation(state, payload) {
            console.log(state.navigation);
        },
    },
    actions: {
        navigation({ commit, state }, products) {
            console.log(commit.navigation);
        }
    }
}