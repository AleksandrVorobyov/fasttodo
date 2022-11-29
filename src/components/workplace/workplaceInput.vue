<template lang="pug">
main-input(
  :elType="data.type",
  :elValue="data.value",
  :elPlaceholder="data.place",
  :elClass="data.class",
  :elId="data.id",
  @inputAction="inputCreateNameTheme(data.id)"
)
</template>
<script>
export default {
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