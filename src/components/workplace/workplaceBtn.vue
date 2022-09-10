<template lang="pug">
mainBtn(
  :elText="data.text",
  :elClass="data.class",
  :elId="data.id",
  @clickAction="col(data.id)"
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
    col(id) {
      console.log(id);
    },
  },
};
</script>
<style scoped lang="scss">
</style>