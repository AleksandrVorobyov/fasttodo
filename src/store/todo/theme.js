export default {
    state: {
        theme: {
            activeTheme: "Спорт",
            themeCardsDefault: [
                {
                    title: "Спорт",
                    src: "categories/themeCards/sport.jpg",
                    idx: 0
                },
                {
                    title: "Кулинария",
                    src: "categories/themeCards/cooking.jpg",
                    idx: 1
                },
                {
                    title: "Работа",
                    src: "categories/themeCards/work.jpg",
                    idx: 2
                },
                {
                    title: "Отдых",
                    src: "categories/themeCards/recreation.jpg",
                    idx: 3
                },
            ],
            title: "Активная тема:",
            btnIcon: "arrow"
        },
    },
    getters: {
        theme(state) {
            return state.theme;
        },
    },
    mutations: {
        getThemeStyle(state) {
            const todolistThemeCards = document.querySelectorAll(
                ".todolist__theme-cards > .todolist__theme-cards-item"
            );
            todolistThemeCards.forEach((item, index) => {
                let dataItem = item.dataset.theme
                if (dataItem >= 0) {
                    item.style.left = 50 + 5 * dataItem + "%";
                    item.style.zIndex = 50 - dataItem;
                    item.style.opacity = 1 - 0.25 * dataItem;
                } else {
                    item.style.left = 50 + 5 * dataItem + "%";
                    item.style.zIndex = 50 + dataItem;
                    item.style.opacity = 1 + 0.25 * dataItem;
                }
            });
        },
        findActiveTheme(state) {
            return state.activeTheme = state.theme.themeCardsDefault.find((e) => e.idx == 0).title
        }
    },
    actions: {
        themeIndexPlus({ state, commit }) {
            let last = state.theme.themeCardsDefault[state.theme.themeCardsDefault.length - 1]
            if (last.idx > 0) {
                state.theme.themeCardsDefault.forEach((item, index) => {
                    item.idx = item.idx - 1;
                });

                commit("findActiveTheme")

                setTimeout(() => {
                    commit("getThemeStyle")
                }, 200);
            }
        },
        themeIndexmin({ state, commit }) {
            let first = state.theme.themeCardsDefault[0]
            if (first.idx < 0) {
                state.theme.themeCardsDefault.forEach((item, index) => {
                    item.idx = item.idx + 1;
                });

                commit("findActiveTheme")

                setTimeout(() => {
                    commit("getThemeStyle")
                }, 200);
            }
        },
    }
}