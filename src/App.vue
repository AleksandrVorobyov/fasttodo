<template lang="pug">
Preloader
router-view
</template>

<script>
import { mapGetters } from "vuex";
import Preloader from "@/components/FastPreloader.vue";

export default {
  components: {
    Preloader,
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    async authLocalVerification() {
      await this.$store.dispatch("authLocalVerification");
    },
    todoMenuSmartHiding(e) {
      this.$store.dispatch("todoMenuSmartHiding", e);
    },
  },
  created() {
    this.authLocalVerification();
  },
  mounted() {
    setTimeout(() => {
      const preloader = document.querySelector(".preloader");
      preloader.classList.add("preloader-remove");
    }, 1000);
    document.addEventListener("click", (e) => {
      this.todoMenuSmartHiding(e);
    });
  },
};
</script>


<style lang="scss">
@import url("./assets/scss/variables.scss");
@import url("./assets/scss/theme.scss");
</style>
