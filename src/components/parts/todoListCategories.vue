<template lang="pug">
.todolist__categories
  categoriesCard(
    v-for="(item, index) in categoriesCard.list",
    :key="item",
    :id="item.id",
    :categoriesTitle="item.title",
    :categoriesImg="item.img"
    :thisCardIndex="index"
    :categoriesCardLast="categoriesCardLast"
    :categoriesCardDirection="categoriesCardDirection"
    @actionMouseOver="categoriesCardAnim($event, index)"
    @actionMouseLeave="categoriesCardFindNumber($event, index)"
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
    ...mapGetters(["categoriesCard", "categoriesCardLast", "categoriesCardDirection"]),
  },
  methods: {
    categoriesCardFindNumber(btn, index) {
      this.$store.commit("categoriesCardFindNumber", {btn, index})
    },
    categoriesCardAnim(btn, index) {
      this.$store.commit("categoriesCardAnim", {btn, index})
    }
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

  &::before {
    position: absolute;
    content: "";
    width: 450px;
    height: 450px;
    top: -112.5px;
    left: -112.5px;
    background: rgba(203, 71, 160, 0.3);
    filter: blur(100px);
    border-radius: 50%;
    z-index: -1;
  }

  &::after {
    position: absolute;
    content: "";
    width: 450px;
    height: 450px;
    top: -112.5px;
    right: -112.5px;
    background: rgba(0, 255, 133, 0.2);
    filter: blur(100px);
    border-radius: 50%;
    z-index: -1;
  }
}
</style>