export default {
    state: {
        todolist: {
            title: `fast<span class="title-gradient">todo</span>`,
            list: [
            ]
        },
        todoOptions: {
            animation: 0,
            group: "description",
            disabled: true,
            ghostClass: "ghost",
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
            all: []
        },
        clientTime: "",
        theme: {
            activeTheme: "Спорт",
            themeDropList: ["Спорт", "Кулинария"]
        },
        categoriesCardLast: 0,
        categoriesCardDirection: "left",
    },
    getters: {
        todolist(state) {
            return state.todolist;
        },
        todoOptions(state) {
            return state.todoOptions;
        },
        categoriesCard(state) {
            return state.categoriesCard;
        },
        theme(state) {
            return state.theme;
        },
        clientTime(state) {
            return state.clientTime
        },
        categoriesCardLast(state) {
            return state.categoriesCardLast
        },
        categoriesCardDirection(state) {
            return state.categoriesCardDirection
        },
    },
    mutations: {
        updateElements(state, payload) {
            state.todolist.list = payload;
        },
        todoAdd(state, elem) {
            const productInput = document.getElementById("toDoList");

            if (productInput.value != "") {
                state.todolist.list.push(productInput.value);
                localStorage.setItem(`todoList-${state.todolist.list.length + 1}`, JSON.stringify(productInput.value));
                productInput.value = "";
            }
        },
        todoDel(state, elemIndex) {
            state.todolist.list.splice(elemIndex, 1)
            localStorage.clear()
            let content = state.todolist.list
            for (let index = 0; index < content.length; index++) {
                const element = content[index];
                localStorage.setItem(`todoList-${index}`, JSON.stringify(element));
            }
        },
        dragSave(state) {
            localStorage.clear()
            let content = state.todolist.list
            for (let index = 0; index < content.length; index++) {
                const element = content[index];
                localStorage.setItem(`todoList-${index}`, JSON.stringify(element));
            }
        },
        dragCheck(state, payload) {
            state.todoOptions.disabled = !state.todoOptions.disabled;
            payload.target.closest('.todolist__form-body-item').classList.toggle("todolist__form-body-item--active")
        },
        activeThemeBtn() {
            document
                .getElementById("theme-drop-list")
                .classList.toggle("theme-dropdown__list--hidden");
        },

        categoriesCardFindNumber(state, {btn, index}) {
            state.categoriesCardLast = index
            if (index == 0) {
              return btn.dataset.direction = "left"
            }
            if (index == 2) {
              return btn.dataset.direction = "right"
            }
        },
      
        categoriesCardAnim(state, {btn, index}) {
            if (state.categoriesCardLast == index) {
                return
            }
            if (state.categoriesCardLast > index) {
                return btn.dataset.direction = "right"
            } 
            return btn.dataset.direction = "left"
        }
    },
    actions: {
        updateElements({ commit }, payload) {
            commit("updateElements", payload);
        },
        loadTodoList({ state }) {
            if (state.todolist.list == "") {
                for (let index = 0; index < 99; index++) {
                    try {
                        let content = JSON.parse(localStorage.getItem(`todoList-${index}`));
                        if (content) {
                            state.todolist.list.push(content)
                        }
                    } catch (error) {
                        return false
                    }
                }
            }
        },
        chengeThemeBtn({ state, commit }, theme) {
            commit("activeThemeBtn")
            state.theme.activeTheme = theme
            return
        },
    }
}
