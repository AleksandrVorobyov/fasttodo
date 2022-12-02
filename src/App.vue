<template lang="pug">
.app
  .app-nav
    fast-preloader(v-if="preload")
    fast-notification
  fast-disconnect(v-if="disconnect")
  router-view(v-else)
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import fastPreloader from "@/components/FastPreloader.vue";
import fastNotification from "@/components/FastNotification.vue";
import fastDisconnect from "@/components/FastDisconnect.vue";

export default {
  components: {
    fastPreloader,
    fastNotification,
    fastDisconnect,
  },
  setup() {
    const store = useStore();
    let disconnect = ref(false);
    let preload = ref(true);
    const hiddenBody = computed(() => store.getters.hiddenBody);
    const scrollBody = computed(() => store.getters.scrollBody);
    const authLocalVerification = async () =>
      await store.dispatch("authLocalVerification");
    const todoMenuSmartHiding = (e) => store.dispatch("todoMenuSmartHiding", e);

    authLocalVerification();

    onMounted(() => {
      document.addEventListener("DOMContentLoaded", () => {
        document.querySelector(".preloader").classList.add("preloader-remove");
        setTimeout(() => {
          preload.value = false;
        }, 500);
      });

      document.addEventListener("click", (e) => {
        todoMenuSmartHiding(e);
      });

      window.addEventListener("scroll", () => {
        if (hiddenBody.value) {
          let scrollTop = scrollBody.y;
          let scrollLeft = scrollBody.x;
          window.scrollTo(scrollLeft, scrollTop);
        }
      });

      window.addEventListener("offline", () => {
        return (disconnect.value = true), console.log(disconnect.value);
      });

      window.addEventListener("online", () => {
        return (disconnect.value = false), console.log(disconnect.value);
      });
    });

    return {
      user: computed(() => store.getters.user),
      preload,
      disconnect,
    };
  },
};
</script>


<style lang="scss">
@import url("./assets/css/variables.css");
@import url("./assets/css/style.css");
</style>
