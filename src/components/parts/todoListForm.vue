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
      @clickAction="getNewRecord()"
    )
  hr(v-if="personRecord.length != 0")
  .todolist__form-body
    h3.todolist__form-body-title(v-if="personRecord.length == 0") {{ todoForm.title }}
    draggable#list.todolist__form-body-list.list-group(
      v-else,
      tag="ul",
      :list="personRecord",
      handle=".handle",
      item-key="name",
      @end="dragRecordSave()"
    )
      template(#item="{ element, index }")
        li.todolist__form-body-item
          span {{ index + 1 + ')'}}
          span {{element.text}}
          button.todolist__form-body-drag.handle(type="button")
            span
          .todolist__form-body-del
            buttonDelWithIcon(@clickAction="delRecord(index)")
  hr
</template>
<script>
import { mapGetters } from "vuex";
import draggable from "vuedraggable";
import mainBtn from "./mainBtn.vue";
import buttonDelWithIcon from "../parts/buttonDelWithIcon.vue";
export default {
  computed: {
    ...mapGetters(["todoForm", "personRecord"]),
  },
  components: {
    draggable,
    mainBtn: mainBtn,
    buttonDelWithIcon
  },
  methods: {
    async delRecord(elemIndex) {
      await this.$store.dispatch("delRecord", elemIndex);
    },
    async getNewRecord() {
      const message = document.getElementById("todoFormInput").value;
      await this.$store.dispatch("getNewRecord", message);
    },
    async dragRecordSave() {
      await this.$store.dispatch("dragRecordSave");
    },
  },
};
</script>
<style scoped lang="scss">
.todolist__form-nav {
  padding: 0 20px;
  display: grid;
}

.todolist__form > hr {
  border: 3px solid transparent;
  border-image: var(--linearMainSecond);
  border-image-slice: 1;
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
  background: var(--bgInputMain);
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
  padding: 20px 40px;
}

.todolist__form-body-item {
  position: relative;
  padding: 10px 5px;
  width: 100%;
  background: linear-gradient(var(--bgInputMain) 0 0) padding-box,
    var(--linearMain) border-box;
  border: 2px solid transparent;
  transition: background 0.4s linear, transform 0.4s linear,
    box-shadow 0.4s linear;
  z-index: 10;

  span {
    color: rgb(255, 255, 255);
    font-size: 18px;
    line-height: 18px;
    font-family: "Benae";
    font-weight: 400;
  }

  span + span {
    margin-left: 8px;
  }

  &:hover {
    background: linear-gradient(var(--bgInputMain) 0 0) padding-box,
      gray border-box;

    .todolist__form-body-drag,
    .todolist__form-body-del {
      opacity: 1;
    }
  }
}

.todolist__form-body-item--active {
  transform: scale(1.05);
  box-shadow: 0px 0px 3px gray;
}

.todolist__form-body-del,
.todolist__form-body-drag {
  opacity: 0;
  transition: opacity 0.5s linear;
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
</style>