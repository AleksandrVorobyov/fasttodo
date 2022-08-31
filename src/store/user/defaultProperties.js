export default {
    state: {
        defaultProperties: {
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
        },
    },
    getters: {
        defaultProperties(state) {
            return state.defaultProperties;
        }
    }
}