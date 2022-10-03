export default {
  state: {
    fastToDoList: {
      title: `fast<span class="title-gradient">todo</span>`,
      glitchImgOne: "clock/bg-1.png",
      glitchImgTwo: "clock/bg-2.png",
      time: "",
    },
    themeControl: {
      list: [
        {
          id: "todo-categories-create",
          img: "create-group.png",
          title: "Создать новую тему",
          funcSection: "workplaceGetTheme",
        },
        {
          id: "todo-categories-rename",
          img: "rename-group.png",
          title: "Переименовать тему",
          funcSection: "workplaceRenameTheme",
        },
        {
          id: "todo-categories-remove",
          img: "remove-group.png",
          title: "Удалить тему",
          funcSection: "workplaceRemoveTheme",
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
            {
              name: "workplaceBtn",
              text: "Далее",
              id: "workplaceBtnThemeAddTtl",
              class: "todolist__workplace-btn",
              pref: "mob",
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
            {
              name: "workplaceBtn",
              text: "Далее",
              id: "workplaceBtnThemeAddImgNext",
              class: "todolist__workplace-btn",
              pref: "mob",
            },
            {
              name: "workplaceBtnBack",
              text: "Назад",
              id: "workplaceBtnThemeAddImgPrev",
              class: "todolist__workplace-btn",
              pref: "mob",
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
            {
              name: "workplaceBtnBack",
              text: "Назад",
              id: "workplaceBtnThemeAddLast",
              class: "todolist__workplace-btn",
              pref: "mob",
            },
          ],
        },
      ],
      create: {
        themeInput: "",
        inputLoad: false,
      },
      activeComponent: "workplaceGetTheme",
      remove: {},
      rename: {
        themeListRenameBtnText: "Изменить",
      },
    },
    footer: {
      ttl: "© 2022 — Воробьев Александр",
      subTtl: "Веб-разработчик из Москвы, занимаюсь версткой и созданием сайтов."
    }
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
    footer(state) {
      return state.footer;
    },
    inputCreateNameThemeBoolean(state) {
      return state.todolistWorkplace.create.themeInput.length >= 3
        ? true
        : false;
    },
  },
  mutations: {
    hiddenWorkPlace(state) {
      document
        .getElementById("todoListWorkPlace")
        .classList.remove("todolist__workplace--active");
      let allControlCard = document.querySelectorAll(".theme-control-card");
      allControlCard.forEach((item) => {
        if (item.hasAttribute("data-disabled")) {
          item.removeAttribute("data-disabled");
        }
        if (item.classList.contains("theme-control-card--active")) {
          item.classList.remove("theme-control-card--active");
        }
      });
    },
    inputCreateNameTheme(state, id) {
      return (state.todolistWorkplace.create.themeInput =
        document.getElementById(id).value);
    },
    clearInputCreateNameTheme(state) {
      return (document.getElementById("todolistWorkplaceInputThemeAdd").value =
        "");
    },
    changeTodolistWorkplaceActiveComp(state, { e, item }) {
      let controlCard = e.target;
      if (!controlCard.hasAttribute("data-disabled")) {
        return (state.todolistWorkplace.activeComponent = item);
      }
    },
  },
  actions: {
    runClock({ state, getters }) {
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
      return (state.fastToDoList.time = `${day.getHours() >= 10 ? day.getHours() : "0" + day.getHours()
        } : ${day.getMinutes() >= 10 ? day.getMinutes() : "0" + day.getMinutes()
        } : ${day.getSeconds() >= 10 ? day.getSeconds() : "0" + day.getSeconds()
        }`);
    },
    loadThemeCreateInputLoad({ state }) {
      return (state.todolistWorkplace.create.inputLoad =
        !state.todolistWorkplace.create.inputLoad);
    },
    nextSectionWorkPlaceGetTheme() {
      const items = document.querySelectorAll(
        ".todolist__workplace-get-theme .todolist__workplace-col"
      );

      items.forEach((item) => {
        let indexItem = item.getAttribute("data-slide");
        return item.setAttribute("data-slide", Number(indexItem) - 1);
      });
    },
    prevSectionWorkPlaceGetTheme() {
      const items = document.querySelectorAll(
        ".todolist__workplace-get-theme .todolist__workplace-col"
      );

      items.forEach((item) => {
        let indexItem = item.getAttribute("data-slide");
        return item.setAttribute("data-slide", Number(indexItem) + 1);
      });
    },
    async activeWorkPlace({ state }, e) {
      let controlCard = e.target;

      if (!controlCard.hasAttribute("data-disabled")) {
        let allControlCard = document.querySelectorAll(".theme-control-card");
        await allControlCard.forEach((item) => {
          if (item.hasAttribute("data-disabled")) {
            return item.removeAttribute("data-disabled");
          }
          return item.setAttribute("data-disabled", true);
        });
        let todoListWorkPlace = document.getElementById("todoListWorkPlace");
        todoListWorkPlace.classList.toggle("todolist__workplace--active");

        controlCard.classList.toggle("theme-control-card--active");
        return controlCard.removeAttribute("data-disabled");
      }
    },
    checkTodolistWorkplaceGetThemeHeight({ state }) {
      let todoListWorkPlace = document.getElementById("todoListWorkPlace")
      if (
        todoListWorkPlace.classList.contains("todolist__workplace--active") &&
        todoListWorkPlace.querySelector("*").id == "todoListWorkPlaceGetTheme" &&
        window.innerWidth < 1140
      ) {

        let sectionHeight = todoListWorkPlace.querySelector(
          ".todolist__workplace-col[data-slide='1']"
        ).offsetHeight;

        todoListWorkPlace.style.height = sectionHeight + 'px';
      } else if (
        todoListWorkPlace.querySelector("*").id == "todoListWorkPlaceGetTheme" &&
        window.innerWidth < 1140
      ) {
        todoListWorkPlace.style.removeProperty('height');
      }
    },
  },
};
