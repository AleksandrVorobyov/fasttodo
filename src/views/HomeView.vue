<template lang="pug">
.home-page
  header
    Navigation
  main
    ToDoList
  footer
    Footer
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import ToDoList from "@/components/ToDoList.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "HomeView",
  components: {
    Navigation,
    ToDoList,
    Footer,
  },
};
</script>
