<template lang="pug">
formInput(
  :elType="data.type",
  :elValue="data.value",
  :elPlaceholder="data.place",
  :elClass="data.class",
  :elId="data.id",
  @inputAction="inputCreateNameTheme(data.id)"
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
    inputCreateNameTheme(id) {
        this.$store.commit("inputCreateNameTheme", id)
    }
  }
};
</script>
<style scoped lang="scss">

</style>