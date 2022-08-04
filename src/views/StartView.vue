<template lang="pug">
.start-page
  main
    FastFirstStart
</template>

<script>
import FastFirstStart from "@/components/FastFirstStart.vue";
import { mapGetters } from "vuex";
export default {
  name: "HomeView",
  components: {
    FastFirstStart,
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    if (this.user.selected == true) {
      this.$router.push("/");
    }
  },
};
</script>
