<template lang="pug">
#fastDisconnect.fast-disconnect
  moduleView(
    viewClass="fast-disconnect__module",
    viewId="fastDisconnectModule"
  )
    moduleViewForm(formClass="fast-disconnect__form")
      .fast-disconnect-col
        moduleViewTitle(
          titleClass="fast-disconnect__title",
          :titleText="disconnect.title"
        )
      .fast-disconnect-col
        sad-face
      .fast-disconnect-col
        main-btn(
          elType="button",
          elId="fastDisconnectBtn",
          elClass="fast-disconnect__btn",
          @clickAction="rebootPage()",
          :elText="disconnect.btn"
        )
</template>
<script>
import { mapGetters } from "vuex";
import moduleView from "./moduleView/moduleView.vue";
import sadFace from "./parts/FastSadFace.vue";
import moduleViewTitle from "./moduleView/moduleViewTitle.vue";
import moduleViewForm from "./moduleView/moduleViewForm.vue";
export default {
  name: "disconnect-section",
  computed: {
    ...mapGetters(["disconnect"]),
  },
  components: {
    moduleView,
    moduleViewForm,
    sadFace,
    moduleViewTitle,
  },
  methods: {
    rebootPage() {
      this.$store.commit("rebootPage");
    },
  },
};
</script>
<style scoped lang="scss">
.fast-disconnect {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 33333;
}

.fast-disconnect > .module-view {
  opacity: 1;
  pointer-events: all;
  visibility: visible;
}
</style>