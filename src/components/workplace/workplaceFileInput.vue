<template lang="pug">
imageFileInput(
  :inputClass="data.class",
  :inputId="data.id",
  :inputName="data.name",
  :labelClass="data.labelClass",
  :labelId="data.labelId",
  :inputLoad="data.load",
  :inputFileSucess="data.success",
  :inputFile="data.file"
)
</template>
<script>
import imageFileInput from "../parts/imageFileInput.vue";
export default {
  components: {
    imageFileInput,
  },
  props: {
    data: Object
  }
};
</script>
<style scoped lang="scss">
</style>