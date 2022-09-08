<template lang="pug">
.notification(v-show="notification.visible")
  notifications(:notificationInfo="notification")
</template>
<script>
import { mapGetters } from "vuex";
import notifications from "./parts/notifications.vue";
export default {
  computed: {
    ...mapGetters(["notification"]),
  },
  components: {
    notifications,
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
  user-select: none;
}
</style>