<template lang="pug">
.todolist__form
  form.todolist__form-nav(action="", method="get", @submit.prevent)
    input#toDoList.todolist__form-nav-search(
      type="search",
      placeholder="Search...",
      @keyup.enter="todoAdd()"
    )
    button.todolist__form-nav-btn(type="button", @click="todoAdd()") Добавить
    hr
  .todolist__form-body
    draggable#list.todolist__form-body-list(
      v-model="myList",
      tag="ul",
      @end="dragSave()",
      v-bind="todoOptions",
      :move="checkMove",
      ghost-class="ghost"
    )
      transition-group(type="transition", name="flip-list")
        li.todolist__form-body-item(
          v-for="(item, index) in myList",
          :key="item"
        )
          span {{ index + 1 + ')' + ' ' + item }}
          button.todolist__form-body-drag(
            type="button",
            @mouseover="dragCheck($event)",
            @mouseout="dragCheck($event)"
          )
            span
          button.todolist__form-body-del(
            type="button",
            @click="todoDel(index)"
          ) Х
</template>
<script>
import { mapGetters } from "vuex";
import { VueDraggableNext } from "vue-draggable-next";
export default {
  computed: {
    ...mapGetters(["todolist", "todoOptions"]),
    myList: {
      get() {
        return this.todolist.list;
      },
      set(value) {
        this.$store.dispatch("updateElements", value);
      },
    },
  },
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    return {
      checkMove: function (evt) {
        return console.log(evt.draggedContext.element);
      },
    };
  },
  methods: {
    todoAdd() {
      this.$store.commit("todoAdd");
    },
    todoDel(elemIndex) {
      this.$store.commit("todoDel", elemIndex);
    },
    loadTodoList() {
      this.$store.dispatch("loadTodoList");
    },
    dragSave() {
      this.$store.commit("dragSave");
    },
    dragCheck(event) {
      this.$store.commit("dragCheck", event);
    },
  },
  mounted() {
    this.loadTodoList();
  },
};
</script>
<style scoped lang="scss">
.todolist__form-nav {
  padding: 0 20px;
  display: grid;
}

form > hr {
  margin-top: 10px;
}

.todolist__form-nav-search {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  height: 30px;
  margin-bottom: 10px;
}

.todolist__form-nav-btn {
  height: 30px;
  width: 100%;
  max-width: 150px;
  margin: 0 auto;
  cursor: pointer;
}

.todolist__form-body-list {
  list-style: none;
  text-align: left;
  padding: 10px 40px;
}

.todolist__form-body-item {
  position: relative;
  padding: 10px 5px;
  border-radius: 6px;
  width: 100%;
  transition: background 0.4s linear, transform 0.4s linear,
    box-shadow 0.4s linear;
  z-index: 10;

  span {
    color: black;
    font-size: 18px;
    line-height: 18px;
    font-family: "Benae";
    font-weight: 400;
  }

  &:hover {
    background: #c8ebfb;

    .todolist__form-body-drag {
      opacity: 1;
    }
  }
}

.todolist__form-body-item--active {
  transform: scale(1.05);
  box-shadow: 0px 3px 6px #c8ebfd;
}

.todolist__form-body-del {
  position: absolute;
  top: 50%;
  right: 5px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 16px;
  transform: translateY(-50%);
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
}

.todolist__form-body-drag {
  position: absolute;
  opacity: 0;
  transition: opacity 0.4s linear;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 16px;
  width: 32px;
  background: transparent;
  border: none;
  cursor: move;
  padding: 5px;

  &::before,
  &::after,
  span::before {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: grey;
    pointer-events: none;
    user-select: none;
  }

  span {
    pointer-events: none;
    user-select: none;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }

  span::before {
    top: 50%;
    transform: translateY(-50%);
  }
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>