<template lang="pug">
.notification(v-show="notification.visible")
  component(:is="notification.type")
</template>
<script>
import { mapGetters } from "vuex";
import notificationError from "./parts/notificationError.vue";
export default {
  computed: {
    ...mapGetters(["notification"]),
  },
  components: {
    notificationError,
  },
};
</script>
<style scoped lang="scss">
.notification {
  position: fixed;
  width: 400px;
  height: 60px;
  top: 0;
  right: 0;
  z-index: 4000;
}
</style>