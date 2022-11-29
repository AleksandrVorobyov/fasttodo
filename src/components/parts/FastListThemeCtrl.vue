<template lang="pug">
.todolist__theme-control
  theme-ctrl-card(
    v-for="(item, index) in themeControl.list",
    :key="item",
    :id="item.id",
    :themeControlTitle="item.title",
    :themeControlImg="item.img",
    @actionClick="changeTodolistWorkplaceActiveComp($event, item.funcSection), activeWorkPlace($event).then(() => { checkTodolistWorkplaceGetThemeHeight(); })"
  )
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import themeCtrlCard from "./FastThemeCtrlCard.vue";

export default {
  name: "list-theme-control",
  components: {
    themeCtrlCard,
  },
  setup() {
    const store = useStore();

    return {
      themeControl: computed(() => store.getters.themeControl),
      activeWorkPlace: async (e) => await store.dispatch("activeWorkPlace", e),
      checkTodolistWorkplaceGetThemeHeight: () =>
        store.dispatch("checkTodolistWorkplaceGetThemeHeight"),
      changeTodolistWorkplaceActiveComp: (e, item) =>
        store.commit("changeTodolistWorkplaceActiveComp", {
          e,
          item,
        }),
    };
  },
};
</script>
<style scoped lang="scss">
.todolist__theme-control {
  position: relative;
  width: 100%;
  padding: 10px;
  display: grid;
  gap: 15px;
  background: var(--linearSectionMain);

  @media (min-width: 540px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 1140px) {
    gap: 20px;
  }
}
</style>