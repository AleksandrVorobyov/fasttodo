<template lang="pug">
.home-page
  FastToDoList
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