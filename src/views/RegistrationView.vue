<template lang="pug">
.registration-page
  main
    FastNotification
    FastRegistration
</template>

<script>
import FastRegistration from "@/components/FastRegistration.vue";
import FastNotification from "@/components/FastNotification.vue";
export default {
  components: {
    FastRegistration,
    FastNotification,
  },
};
</script>