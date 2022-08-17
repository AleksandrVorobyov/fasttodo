export default {
    state: {
        todoForm: {
            list: [
            ],
            title: "Список дел в данной теме пуст! Добавьте новое дело!",
            inputPlaceholder: "Поле для ваших дел...",
            btnText: "Добавить",
            inputErrorEmpty: "Поле для ваших дел пустое! Заполните его!"
        },
        todoOptions: {
            animation: 0,
            group: "description",
            disabled: true,
            ghostClass: "ghost",
        },
    },
    getters: {
        todoForm(state) {
            return state.todoForm;
        },
        todoOptions(state) {
            return state.todoOptions;
        },
    },
    mutations: {
        updateElements(state, payload) {
            state.todoForm.list = payload;
        },
        todoDel(state, elemIndex) {
            state.todoForm.list.splice(elemIndex, 1)
            localStorage.clear()
            let content = state.todoForm.list
            for (let index = 0; index < content.length; index++) {
                const element = content[index];
                localStorage.setItem(`todoForm-${index}`, JSON.stringify(element));
            }
        },
        dragSave(state) {
            localStorage.clear()
            let content = state.todoForm.list
            for (let index = 0; index < content.length; index++) {
                const element = content[index];
                localStorage.setItem(`todoForm-${index}`, JSON.stringify(element));
            }
        },
        dragCheck(state, payload) {
            state.todoOptions.disabled = !state.todoOptions.disabled;
            payload.target.closest('.todolist__form-body-item').classList.toggle("todolist__form-body-item--active")
        },
    },
    actions: {
        updateElements({ commit }, payload) {
            commit("updateElements", payload);
        },
        loadTodoList({ state }) {
            if (state.todoForm.list == "") {
                for (let index = 0; index < 99; index++) {
                    try {
                        let content = JSON.parse(localStorage.getItem(`todoForm-${index}`));
                        if (content) {
                            state.todoForm.list.push(content)
                        }
                    } catch (error) {
                        return false
                    }
                }
            }
        },
        todoAdd({ state, dispatch }, elem) {
            const productInput = document.getElementById("todoFormInput");

            if (productInput.value != "") {
                state.todoForm.list.push(productInput.value);
                localStorage.setItem(`todoForm-${state.todoForm.list.length + 1}`, JSON.stringify(productInput.value));
                productInput.value = "";
            }
        },
    },
}