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
  methods: {},
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
  background: var(--linearSectionMain);
}
</style>