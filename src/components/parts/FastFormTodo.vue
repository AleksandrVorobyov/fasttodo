<template lang="pug">
.todolist__form
  fast-form-list-create(
    :inputPlace="todoForm.inputPlaceholder",
    :btnText="todoForm.btnText",
    btnClass="todolist__form-nav-btn",
    @clickCreate="getNewRecord()"
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
          fast-form-list-item(
            :idx="index",
            :text="element.text",
            @delItem="delRecord(index)"
          )
  hr
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import draggable from "vuedraggable";
import fastFormListItem from "./FastFormListItem.vue";
import fastFormListCreate from "./FastFormListCreate.vue";

export default {
  name: "fast-form-todo",
  components: {
    draggable,
    fastFormListItem,
    fastFormListCreate,
  },
  setup() {
    const store = useStore();
    const personRecord = computed(() => store.getters.personRecord);
    const personList = computed({
      get() {
        return store.getters.personRecord;
      },
      set(newValue) {
        store.commit("updatePersonRecord", newValue);
      }
    })

    return {
      personRecord,
      personList,
      todoForm: computed(() => store.getters.todoForm),
      dragOptions: computed(() => {
        return {
          animation: 200,
          group: "todolist-group",
          disabled: false,
          ghostClass: "ghost",
        }
      }),
      delRecord: async (elIdx) => await store.dispatch("delRecord", elIdx),
      dragRecordSave: async () => await store.dispatch("dragRecordSave"),
      getNewRecord: async () => {
        const message = document.getElementById("todoFormInput").value;
        await store.dispatch("getNewRecord", message);
      },
    };
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
</style>