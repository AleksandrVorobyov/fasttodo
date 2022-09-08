<template lang="pug">
.notification(
  :class="notificationInfo.type == 'error' ? 'notification--error' : 'notification--success'"
)
  h4.notification__text {{ notificationInfo.text }}
</template>
<script>
export default {
  props: {
    notificationInfo: Object,
  },
};
</script>
<style scoped lang="scss">
.notification {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification.notification--error {
  background: #f8d7da;
  border: 2px solid #f598a1;

  .notification__text {
    color: #721c24;
  }
}

.notification.notification--success {
  background: #c9f0ba;
  border: 2px solid #98f5b4;

  .notification__text {
    color: #0fb318;
  }
}

.notification__text {
  display: inline-block;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.5px;
  text-align: center;
}
</style>