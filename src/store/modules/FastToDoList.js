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
    themeControl: {
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
    todolistWorkplace: {
      col: [
        {
          component: [
            {
              name: "workplaceTitle",
              text: "Придумайте название новой темы",
            },
            {
              name: "workplaceInput",
              value: null,
              place: "Имя темы...",
              class: "todolist__workplace-input",
              id: "todolistWorkplaceInputThemeAdd",
              type: "text",
            },
          ],
        },
        {
          component: [
            {
              name: "workplaceTitle",
              text: "Выберите картинку для темы",
            },
            {
              name: "workplaceFileInput",
              class: "todolist__workplace-file-input",
              id: "workplaceFileInputAdd",
              labelClass: "workplaceFileInputAddLabel",
              labelId: "workplaceFileInputAddLabelName",
              load: false,
              success: "Картинка загружена!",
              file: "Перетащите картинку для темы...",
            },
          ],
        },
        {
          component: [
            {
              name: "workplaceTitle",
              text: "Можете отправить тему",
            },
            {
              name: "workplaceBtn",
              text: "Отправить",
              id: "workplaceBtnThemeAdd",
              class: "todolist__workplace-btn",
            },
          ],
        },
      ],
    },
  },
  getters: {
    fastToDoList(state) {
      return state.fastToDoList;
    },
    themeControl(state) {
      return state.themeControl;
    },
    clientTime(state) {
      return state.clientTime;
    },
    todolistWorkplace(state) {
      return state.todolistWorkplace;
    },
  },
  mutations: {
    activeWorkPlace(state, e) {
      document
        .getElementById("todoListWorkPlace")
        .classList.toggle("todolist__workplace--active");
    },
  },
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
