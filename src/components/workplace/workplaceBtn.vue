<template lang="pug">
main-btn(
  :elText="data.text",
  :elClass="data.class",
  :elId="data.id",
  @clickAction="checkWorkPlaceInnerWidth(data.id)"
)
</template>
<script>
export default {
  props: {
    data: Object,
  },
  methods: {
    async checkWorkPlaceInnerWidth(id) {
      if (window.innerWidth >= 1140 || id == "workplaceBtnThemeAdd") {
        await this.$store.dispatch("getNewTheme");
        await this.$store.dispatch("checkTodolistWorkplaceGetThemeHeight");
      } else {
        await this.$store.dispatch("nextSectionWorkPlaceGetTheme");
        await this.$store.dispatch("checkTodolistWorkplaceGetThemeHeight");
      }
    },
  },
};
</script>