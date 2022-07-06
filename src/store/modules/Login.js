export default {
    state: {
        login: {
            userSelected: false,
            name: "Alex",
            avatar: "avatar/main.png",
            navBtn: {
                text: "Login",
                iconName: "login"
            },
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
        login({ commit, state }, products) {
            console.log(commit.login);
        }
    }
}