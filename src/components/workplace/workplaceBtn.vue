<template lang="pug">
mainBtn(
  :elText="data.text",
  :elClass="data.class",
  :elId="data.id",
  @clickAction="getNewTheme()"
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
    async getNewTheme() {
      await this.$store.dispatch("getNewTheme");
    },
  },
};
</script>
<style scoped lang="scss">
</style>