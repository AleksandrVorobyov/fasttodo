import theme from "../todo/theme";
import todoListForm from "../todo/todoListForm";
import todoListProfile from "../todo/todoListProfile";

export default {
  state: {
    fastToDoList: {
      title: `fast<span class="title-gradient">todo</span>`,
      glitchImgOne: "clock/bg-1.png",
      glitchImgTwo: "clock/bg-2.png",
    },
    categoriesCard: {
      list: [
        {
          id: "todo-categories-create",
          img: "create-group.png",
          title: "Создать новую тему",
        },
        {
          id: "todo-categories-rename",
          img: "rename-group.png",
          title: "Переименовать тему",
        },
        {
          id: "todo-categories-remove",
          img: "remove-group.png",
          title: "Удалить тему",
        },
      ],
      all: [],
    },
    clientTime: "",
  },
  getters: {
    fastToDoList(state) {
      return state.fastToDoList;
    },
    categoriesCard(state) {
      return state.categoriesCard;
    },
    clientTime(state) {
      return state.clientTime;
    },
  },
  mutations: {},
  actions: {
    runClock() {
      const deg = 6;
      const hr = document.getElementById("hr");
      const mn = document.getElementById("mn");
      const sc = document.getElementById("sc");

      let day = new Date();
      let hh = day.getHours() * 30;
      let mm = day.getMinutes() * deg;
      let ss = day.getSeconds() * deg;

      hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
      mn.style.transform = `rotateZ(${mm}deg)`;
      sc.style.transform = `rotateZ(${ss}deg)`;
    },
  },
  modules: {
    theme,
    todoListForm,
    todoListProfile,
  },
};
