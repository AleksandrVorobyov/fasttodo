<template lang="pug">
.todolist__categories
  categoriesCard(
    v-for="(item, index) in categoriesCard.list",
    :key="item",
    :id="item.id",
    :categoriesTitle="item.title",
    :categoriesImg="item.img"
  )
</template>
<script>
import { mapGetters } from "vuex";
import categoriesCard from "./categoriesCard.vue";
export default {
  components: {
    categoriesCard,
  },
  computed: {
    ...mapGetters(["categoriesCard"]),
  },
  methods: {
  }
};
</script>
<style scoped lang="scss">
.todolist__categories {
  position: relative;
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: linear-gradient(
      rgba(214, 237, 255, 0.3),
      rgba(214, 237, 255, 0.3)
    ),
    linear-gradient(
      89.96deg,
      rgba(203, 71, 160, 0.5) 0.02%,
      rgba(105, 71, 203, 0.5) 49.47%,
      rgba(0, 255, 133, 0.5) 99.97%
    );
}
</style>