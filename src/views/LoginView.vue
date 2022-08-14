<template lang="pug">
.login-page
  main
    FastNotification
    Login
</template>

<script>
import Login from "@/components/FastLogin.vue";
import FastNotification from "@/components/FastNotification.vue";
export default {
  components: {
    Login,
    FastNotification,
  },
};
</script>