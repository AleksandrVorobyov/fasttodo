import theme from "../todo/theme"
import todoForm from "../todo/todoForm"
import todoProfile from "../todo/todoProfile"

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
    },
    mutations: {},
    actions: {
    },
    modules: {
        theme,
        todoForm,
        todoProfile,
    }
}
