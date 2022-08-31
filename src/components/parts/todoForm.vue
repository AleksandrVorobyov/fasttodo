<template lang="pug">
.todolist__form
  form.todolist__form-nav(action="", method="get", @submit.prevent)
    input#todoFormInput.todolist__form-nav-search(
      type="text",
      :placeholder="todoForm.inputPlaceholder",
      @keyup.enter="getNewRecord()"
    )
    mainBtn(
      :elText="todoForm.btnText",
      elClass="todolist__form-nav-btn",
      @moveAction="mainBtnAnimMove($event)",
      @leaveAction="mainBtnAnimLeave($event)",
      @clickAction="getNewRecord()"
    )
  hr(v-if="personRecord.length != 0")
  .todolist__form-body
    h3.todolist__form-body-title(v-if="personRecord.length == 0") {{ todoForm.title }}
    draggable#list.todolist__form-body-list(
      v-else,
      v-model="personRecord",
      tag="ul",
      @end="dragSave()",
      v-bind="todoOptions",
      :move="checkMove",
      ghost-class="ghost"
    )
      transition-group(type="transition", name="flip-list")
        li.todolist__form-body-item(
          v-for="(item, index) in personRecord",
          :key="item.id"
        )
          span {{ index + 1 + ')' + ' ' + item.text }}
          button.todolist__form-body-drag(
            type="button",
            @mouseover="dragCheck($event)",
            @mouseout="dragCheck($event)"
          )
            span
          button.todolist__form-body-del(
            type="button",
            @click="delRecord(index)"
          ) Х
  hr
</template>
<script>
import { mapGetters } from "vuex";
import { VueDraggableNext } from "vue-draggable-next";
import mainBtn from "./mainBtn.vue";
export default {
  computed: {
    ...mapGetters(["todoForm", "todoOptions", "personRecord"]),
  },
  components: {
    draggable: VueDraggableNext,
    mainBtn: mainBtn,
  },
  data() {
    return {
      checkMove: function (evt) {
        return console.log(evt.draggedContext.element);
      },
    };
  },
  methods: {
    async delRecord(elemIndex) {
      await this.$store.dispatch("delRecord", elemIndex);
    },
    loadTodoList() {
      this.$store.dispatch("loadTodoList");
    },
    async getNewRecord() {
      const message = document.getElementById("todoFormInput").value;
      await this.$store.dispatch("getNewRecord", message);
    },
    dragSave() {
      this.$store.commit("dragSave");
    },
    dragCheck(event) {
      this.$store.commit("dragCheck", event);
    },
    mainBtnAnimMove(btn) {
      this.$store.commit("mainBtnAnimMove", btn);
    },
    mainBtnAnimLeave(btn) {
      this.$store.commit("mainBtnAnimLeave", btn);
    },
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

.todolist__form-nav {
  position: relative;
  margin-bottom: 20px;
  display: grid;
  justify-content: center;
  gap: 20px;
  overflow: hidden;
  border-radius: 2px;
}

.todolist__form-nav-search {
  position: relative;
  width: 600px;
  height: 50px;
  padding: 0px 10px;
  margin: 0;
  background: rgba(46, 47, 64, 0.3);
  border: none;
  outline: none;
  color: #fff;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.5px;

  &::placeholder {
    color: #fff;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.5px;
  }
}

.todolist__form-nav-btn {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  cursor: pointer;
}

.todolist__form-body-title {
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 0.5px;
  color: #fff;
  margin: 15px 0;
  text-align: center;
}

.todolist__form-body-list {
  display: grid;
  gap: 5px;
  list-style: none;
  text-align: left;
  padding: 10px 40px;
}

.todolist__form-body-item {
  position: relative;
  padding: 10px 5px;
  border-radius: 6px;
  width: 100%;
  background: var(--grayMain);
  transition: background 0.4s linear, transform 0.4s linear,
    box-shadow 0.4s linear;
  z-index: 10;

  span {
    color: #000;
    font-size: 18px;
    line-height: 18px;
    font-family: "Benae";
    font-weight: 400;
  }

  &:hover {
    background: #c8ebfb;

    .todolist__form-body-drag,
    .todolist__form-body-del {
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

.todolist__form-body-del,
.todolist__form-body-drag {
  opacity: 0;
  transition: opacity 0.4s linear;
}

.todolist__form-body-drag {
  position: absolute;
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