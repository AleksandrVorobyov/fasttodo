export default {
  state: {
    defaultProperties: {
      themeCardsDefault: [
        {
          title: "Повседневные дела",
          src: "categories/themeCards/everyday-affairs.jpg",
          idx: 0,
          id: "001def"
        },
        {
          title: "Спорт",
          src: "categories/themeCards/sport.jpg",
          idx: 1,
          id: "002def"
        },
        {
          title: "Кулинария",
          src: "categories/themeCards/cooking.jpg",
          idx: 2,
          id: "003def"
        },
        {
          title: "Работа",
          src: "categories/themeCards/work.jpg",
          idx: 3,
          id: "004def"
        },
        {
          title: "Отдых",
          src: "categories/themeCards/recreation.jpg",
          idx: 4,
          id: "005def"
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