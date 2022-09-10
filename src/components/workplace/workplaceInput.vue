<template lang="pug">
formInput(
  :elType="data.type",
  :elValue="data.value",
  :elPlaceholder="data.place",
  :elClass="data.class",
  :elId="data.id",
  @inputAction="col(data.id)"
)
</template>
<script>
import formInput from "../parts/formInput.vue";
export default {
  components: {
    formInput,
  },
  props: {
    data: Object,
  },
  methods: {
    col(id) {
        console.log(id);
    }
  }
};
</script>
<style scoped lang="scss">

</style>