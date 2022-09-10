<template lang="pug">
.todolist__theme-control
  themeControlCard(
    v-for="(item, index) in themeControl.list",
    :key="item",
    :id="item.id",
    :themeControlTitle="item.title",
    :themeControlImg="item.img",
    @actionClick="activeWorkPlace($event)"
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
  },
};
</script>
<style scoped lang="scss">
.todolist__theme-control {
  position: relative;
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: var(--linearSectionMain);
}
</style>