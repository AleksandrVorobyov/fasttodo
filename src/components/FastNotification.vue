<template lang="pug">
.notifications-wrap(v-if="notification.visible")
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
</style>