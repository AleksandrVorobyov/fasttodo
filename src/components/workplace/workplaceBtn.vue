<template lang="pug">
mainBtn(
  :elText="data.text",
  :elClass="data.class",
  :elId="data.id",
  @clickAction="createNewTheme()"
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
    async createNewTheme() {
      await this.$store.dispatch("createNewTheme");
    },
  },
};
</script>
<style scoped lang="scss">
</style>