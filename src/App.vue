<template lang="pug">
Preloader
FastNotification
FastDisconnect(v-if="disconnect.status")
router-view(v-else)
</template>

<script>
import { mapGetters } from "vuex";
import Preloader from "@/components/FastPreloader.vue";
import FastNotification from "@/components/FastNotification.vue";
import FastDisconnect from "@/components/FastDisconnect.vue";

export default {
  data() {
    return {
      disconnect: {
        status: false,
      },
    };
  },
  components: {
    Preloader,
    FastNotification,
    FastDisconnect,
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
    changeDisconnectStatus() {
      this.$store.commit("changeDisconnectStatus");
    },
  },
  created() {
    this.authLocalVerification();
  },
  mounted() {
    const that = this;
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
    window.addEventListener("offline", () => {
      return that.disconnect.status = true, console.log(that.disconnect.status);;
    });

    window.addEventListener("online", () => {
      return that.disconnect.status = false, console.log(that.disconnect.status);;
    });
  },
};
</script>


<style lang="scss">
@import url("./assets/css/variables.css");
@import url("./assets/css/style.css");
</style>
