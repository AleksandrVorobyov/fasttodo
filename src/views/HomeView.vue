<template lang="pug">
.home-page
  header
  main
    FastToDoList
  footer
</template>

<script>
import FastToDoList from "@/components/FastToDoList.vue";

export default {
  name: "HomeView",
  components: {
    FastToDoList,
  },
};
</script>