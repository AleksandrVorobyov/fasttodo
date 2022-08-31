export default {
    state: {
        profile: {
            username: "User-8282",
            avatarImg: {
                default: "avatar/main.png",
                userСhoice: ""
            },
            menu: {
                show: false,
                btn: {
                    renameTextBtn: "Сменить имя",
                    renameImgBtn: "Сменить аватарку",
                    exitBtn: "Выйти из профиля?",
                }
            }
        },
    },
    getters: {
        profile(state) {
            return state.profile;
        },
    },
    mutations: {
        todoMenuActive(state, payload) {
            const hamburger = document.getElementById("todo-profile");
            const menu = document.getElementById("todo-profile__menu");
            menu.classList.toggle("todo-profile__menu--active");
            hamburger.classList.toggle("todo-profile--active");
            state.profile.menu.show = !state.profile.menu.show;
        },
    },
    actions: {
        todoMenuSmartHiding({ state, commit, dispatch }, e) {
            if (document.getElementById("todo-profile")) {
                const hamburger = document.getElementById("todo-profile");
                const menu = document.getElementById("todo-profile__menu");
                let target = e.target;
                let its_menu = target == menu || menu.contains(target);

                if (hamburger.contains(target) || (!its_menu && state.profile.menu.show == true)) {
                    return commit("todoMenuActive")
                }
                return
            }
        }
    }
}