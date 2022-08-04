<template lang="pug">
.registration-page
  main
    FastNotification
    FastRegistration
</template>

<script>
import FastRegistration from "@/components/FastRegistration.vue";
import FastNotification from "@/components/FastNotification.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    FastRegistration,
    FastNotification,
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