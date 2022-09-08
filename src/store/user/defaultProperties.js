export default {
  state: {
    defaultProperties: {
      themeCardsDefault: [
        {
          title: "Повседневные дела",
          src: "categories/themeCards/everyday-affairs.jpg",
          idx: 0,
        },
        {
          title: "Спорт",
          src: "categories/themeCards/sport.jpg",
          idx: 1,
        },
        {
          title: "Кулинария",
          src: "categories/themeCards/cooking.jpg",
          idx: 2,
        },
        {
          title: "Работа",
          src: "categories/themeCards/work.jpg",
          idx: 3,
        },
        {
          title: "Отдых",
          src: "categories/themeCards/recreation.jpg",
          idx: 4,
        },
      ],
    },
  },
  getters: {
    defaultProperties(state) {
      return state.defaultProperties;
    },
  },
};