<template lang="pug">
Preloader
FastNotification 
router-view
</template>

<script>
import { mapGetters } from "vuex";
import Preloader from "@/components/FastPreloader.vue";
import FastNotification from "@/components/FastNotification.vue";

export default {
  components: {
    Preloader,
    FastNotification,
  },
  computed: {
    ...mapGetters(["user", "hiddenBody", "scrollBody"]),
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
    window.addEventListener("scroll", () => {
      if (this.hiddenBody) {
        let scrollTop = this.scrollBody.y;
        let scrollLeft = this.scrollBody.x;
        window.scrollTo(scrollLeft, scrollTop);
      }
    });
  },
};
</script>


<style lang="scss">
@import url("./assets/scss/variables.scss");
@import url("./assets/scss/theme.scss");
</style>
