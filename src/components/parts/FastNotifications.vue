<template lang="pug">
.notification(:class="`notification--${notificationInfo.type}`")
  .notification__img
    Icon(:name="notificationInfo.type")
  h4.notification__text {{ notificationInfo.text }}
</template>
<script>
import Icon from "../SvgIcon.vue";
export default {
  name: "notification",
  props: {
    notificationInfo: Object,
  },
  components: {
    Icon,
  },
};
</script>
<style scoped lang="scss">
.notification {
  position: fixed;
  width: 80%;
  padding: 10px 5px;
  padding-left: 60px;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  user-select: none;
  z-index: 4000;
  border-radius: 0px 0px 0px 6px;

  @media (min-width: 540px) {
    width: 400px;
    min-height: 60px;
    padding: 5px;
    padding-left: 60px;
  }
}

.notification.notification--error {
  background: var(--notifErrorMain);
  animation: bounce 2s ease;
}

.notification.notification--success {
  background: var(--notifSuccessMain);
  animation: bounce 2s ease;
}

.notification__img {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  display: block;
  width: 24px;
  height: 24px;

  @media (min-width: 540px) {
    width: 30px;
    height: 30px;
  }

  &::before {
    position: absolute;
    right: -10px;
    top: 0;
    height: 100%;
    width: 2px;
    content: "";
    background: var(--notifColor);
  }

  svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    color: var(--notifColor);
  }
}

.notification__text {
  display: inline-block;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.2px;
  text-align: left;
  color: var(--notifColor);

  @media (min-width: 540px) {
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.5px;
  }
}

@keyframes bounce {
  0% {
    transform: translateX(0%);
  }
  5% {
    transform: translateX(-15%);
  }
  10% {
    transform: translateX(0%);
  }
  15% {
    transform: translateX(-7%);
  }
  20% {
    transform: translateX(0%);
  }
}
</style>