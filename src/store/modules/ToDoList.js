export default {
    state: {
        todolist: {
            title: "Log in to your account before using the app...",
        },
    },
    getters: {
        todolist(state) {
            return state.todolist;
        },
    },
    mutations: {
        todolist(state, payload) {
            console.log(state.todolist);
        },
    },
    actions: {
        todolist({ commit, state }, products) {
            console.log(commit.todolist);
        }
    }
}