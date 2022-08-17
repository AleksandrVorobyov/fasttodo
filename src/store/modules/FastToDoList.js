import theme from "../todo/theme"
import todoForm from "../todo/todoForm"

export default {
    state: {
        fastToDoList: {
            title: `fast<span class="title-gradient">todo</span>`,
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
        categoriesCardLast: 0,
        categoriesCardDirection: "left",
    },
    getters: {
        fastToDoList(state) {
            return state.fastToDoList;
        },
        categoriesCard(state) {
            return state.categoriesCard;
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
        categoriesCardFindNumber(state, { btn, index }) {
            state.categoriesCardLast = index
            if (index == 0) {
                return btn.dataset.direction = "left"
            }
            if (index == 2) {
                return btn.dataset.direction = "right"
            }
        },

        categoriesCardAnim(state, { btn, index }) {
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
    },
    modules: {
        theme,
        todoForm
    }
}
