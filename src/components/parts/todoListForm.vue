<template lang="pug">
.todolist__form
  form.todolist__form-nav(action="#", method="get", @submit.prevent)
    input#todoFormInput.todolist__form-nav-search(
      type="text",
      :placeholder="todoForm.inputPlaceholder",
      @keyup.enter="getNewRecord()"
    )
    main-btn(
      :elText="todoForm.btnText",
      elClass="todolist__form-nav-btn",
      @clickAction="getNewRecord()"
    )
  hr(v-if="personRecord.length != 0")
  .todolist__form-body
    h3.todolist__form-body-title(v-if="personRecord.length == 0") {{ todoForm.title }}
    div(v-else)
      draggable#list.todolist__form-body-list.list-group(
        tag="ul",
        :component-data="{ tag: 'transition-group', type: 'transition-group', name: 'flip-list' }",
        v-model="personList",
        v-bind="dragOptions",
        @end="dragRecordSave()",
        item-key="id",
        handle=".handle"
      )
        template(#item="{ element, index }")
          li.todolist__form-body-item.list-group-item
            span {{ index + 1 + ')' }}
            span {{ element.text }}
            button.todolist__form-body-drag.handle(type="button")
              span
            .todolist__form-body-del
              btn-del-trash(@clickAction="delRecord(index)")
  hr
</template>
<script>
import { mapGetters } from "vuex";
import draggable from "vuedraggable";

export default {
  name: "todolist-form",
  components: {
    draggable,
  },
  computed: {
    ...mapGetters(["todoForm", "personRecord"]),
    dragOptions() {
      return {
        animation: 200,
        group: "todolist-group",
        disabled: false,
        ghostClass: "ghost",
      };
    },
    personList: {
      get() {
        return this.personRecord;
      },
      set(newValue) {
        this.$store.commit("updatePersonRecord", newValue);
      },
    },
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
.todolist__form > hr {
  border: 3px solid transparent;
  border-image: var(--linearMain);
  border-image-slice: 1;
}

.flip-list-move {
  transition: transform 0.5s;
}

.todolist__form-nav {
  position: relative;
  padding: 0 10px;
  margin-bottom: 10px;
  display: grid;
  gap: 20px;
  overflow: hidden;
  border-radius: 2px;

  @media (min-width: 460px) {
    padding: 0 20px;
    margin-bottom: 20px;
  }

  @media (min-width: 540px) {
    justify-content: center;
  }
}

.todolist__form-nav-search {
  position: relative;
  width: 100%;
  height: 50px;
  padding: 0px 10px;
  margin: 0;
  background: var(--bgInputMain);
  border: none;
  outline: none;
  color: #fff;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 0.3px;

  &::placeholder {
    color: #fff;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.3px;
  }

  @media (min-width: 540px) {
    width: 400px;
    font-size: 18px;
    line-height: 22px;

    &::placeholder {
      font-size: 18px;
      line-height: 22px;
      letter-spacing: 0.5px;
    }
  }

  @media (min-width: 720px) {
    width: 600px;
  }
}

.todolist__form-nav-btn {
  width: 100%;
  margin: 0 auto;
  cursor: pointer;

  @media (min-width: 460px) {
    max-width: 300px;
  }
}

.todolist__form-body-title {
  padding: 0 15px;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.5px;
  color: #fff;
  margin: 15px 0;
  text-align: center;

  @media (min-width: 540px) {
    font-size: 22px;
    line-height: 26px;
  }
}

.todolist__form-body-list {
  display: grid;
  gap: 5px;
  list-style: none;
  text-align: left;
  padding: 10px;

  @media (min-width: 460px) {
    padding: 20px 40px;
  }
}

.todolist__form-body-item {
  position: relative;
  padding: 10px 50px 10px 5px;
  width: 100%;
  background: linear-gradient(var(--bgInputMain) 0 0) padding-box,
    var(--linearMain) border-box;
  border: 2px solid transparent;
  z-index: 10;

  span {
    color: rgb(255, 255, 255);
    font-size: 16px;
    line-height: 18px;
    font-family: "Benae";
    font-weight: 400;
  }

  @media (min-width: 540px) {
    span {
      font-size: 18px;
      line-height: 22px;
    }
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

.todolist__form-body-del {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
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

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>