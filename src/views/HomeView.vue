<template lang="pug">
.home-view
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