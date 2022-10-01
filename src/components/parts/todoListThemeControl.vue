<template lang="pug">
.todolist__theme-control
  themeControlCard(
    v-for="(item, index) in themeControl.list",
    :key="item",
    :id="item.id",
    :themeControlTitle="item.title",
    :themeControlImg="item.img",
    @actionClick="changeTodolistWorkplaceActiveComp($event, item.funcSection), activeWorkPlace($event), checkTodolistWorkplaceGetThemeHeight()"
  )
</template>
<script>
import { mapGetters } from "vuex";
import themeControlCard from "./themeControlCard.vue";
export default {
  components: {
    themeControlCard,
  },
  computed: {
    ...mapGetters(["themeControl"]),
  },
  methods: {
    activeWorkPlace(e) {
      this.$store.commit("activeWorkPlace", e);
    },
    checkTodolistWorkplaceGetThemeHeight() {
      this.$store.commit("checkTodolistWorkplaceGetThemeHeight");
    },
    changeTodolistWorkplaceActiveComp(e, item) {
      this.$store.commit("changeTodolistWorkplaceActiveComp", {
        e,
        item,
      });
    },
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