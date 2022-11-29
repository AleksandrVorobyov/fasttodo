<template lang="pug">
.notification-wrap(v-if="notification.visible")
  notifications(:notificationInfo="notification")
</template>
<script>
import { mapGetters } from "vuex";
import notifications from "./parts/FastNotifications.vue";
export default {
  name: "notification-section",
  computed: {
    ...mapGetters(["notification"]),
  },
  components: {
    notifications,
  },
};
</script>