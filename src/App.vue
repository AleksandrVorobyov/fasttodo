<template lang="pug">
Preloader
router-view
</template>

<script>
import Preloader from "./components/FastPreloader.vue";
import { mapGetters } from "vuex";

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
  },
  created() {
    setTimeout(() => {
      document.querySelector(".preloader").classList.add("preloader-remove");
      let lastPageRoute = localStorage.getItem("lastPageRoute");
      if (this.user.selected == false) {
        if (lastPageRoute) {
          return this.$router.push(
            lastPageRoute == "/" ? "/start" : lastPageRoute
          );
        }
        return this.$router.push("/start");
      } else {
        this.$router.push("/");
      }
    }, 1000);
    this.authLocalVerification();
  },
};
</script>


<style lang="scss">
@import url("./assets/scss/variables.scss");
@import url("./assets/scss/theme.scss");
</style>
