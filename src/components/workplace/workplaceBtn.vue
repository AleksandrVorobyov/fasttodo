<template lang="pug">
mainBtn(
  :elText="data.text",
  :elClass="data.class",
  :elId="data.id",
  @clickAction="checkWorkPlaceInnerWidth(data.id)"
)
</template>
<script>
import mainBtn from "../parts/mainBtn.vue";
export default {
  components: {
    mainBtn,
  },
  props: {
    data: Object,
  },
  methods: {
    async checkWorkPlaceInnerWidth(id) {
      if (window.innerWidth >= 1140 || id == "workplaceBtnThemeAdd") {
        await this.$store.dispatch("getNewTheme");
      } else {
        await this.$store.dispatch("nextSectionWorkPlaceGetTheme");
        await this.$store.commit("checkTodolistWorkplaceGetThemeHeight");
      }
    },
  },
};
</script>
<style scoped lang="scss">
</style>