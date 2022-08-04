<template lang="pug">
.notification__error
  h4.notification__error-text {{ notification.text }}
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["notification"]),
  },
  props: {
    textError: String,
  },
};
</script>
<style scoped lang="scss">
.notification__error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f8d7da;
  border: 2px solid #f598a1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification__error-text {
  display: inline-block;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.5px;
  color: #721c24;
}
</style>