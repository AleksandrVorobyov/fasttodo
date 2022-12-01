<template lang="pug">
img-file-input(
  :inputClass="data.class",
  :inputId="data.id",
  :inputName="data.name",
  :labelClass="data.labelClass",
  :labelId="data.labelId",
  :inputLoad="data.load",
  :inputFileSucess="data.success",
  :inputFile="data.file",
  @changeAction="preloadingImageThemeAdd($event)"
)
</template>
<script>
export default {
  props: {
    data: Object,
  },
  methods: {
    async preloadingImageThemeAdd(e) {
      await this.$store.dispatch("preloadingImageThemeAdd", e);
    },
  },
};
</script>
<style scoped lang="scss">
</style>