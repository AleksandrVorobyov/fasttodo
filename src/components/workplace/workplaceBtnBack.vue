<template lang="pug">
mainBtnBack(
  :btnText="data.text",
  :btnClass="data.class",
  :btnId="data.id",
  @clickAction="prevSectionWorkPlaceGetTheme()"
)
</template>
<script>
import mainBtnBack from "../moduleView/moduleViewBtnExit.vue";
export default {
  components: {
    mainBtnBack,
  },
  props: {
    data: Object,
  },
  methods: {
    prevSectionWorkPlaceGetTheme() {
      this.$store.dispatch("prevSectionWorkPlaceGetTheme");
      this.$store.dispatch("checkTodolistWorkplaceGetThemeHeight");
    },
  },
};
</script>
<style scoped lang="scss">
</style>