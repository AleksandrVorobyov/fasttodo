import { createStore } from 'vuex'
import Navigation from "./modules/Navigation"
import Login from "./modules/Login"
import ToDoList from "./modules/ToDoList"

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Navigation,
    Login,
    ToDoList,
  }
})
