<template lang="pug">
.preloader
  .preloader-wrap
    div(v-for="item in 9")
</template>

<script>
export default {
  name: "preloader-section",
};
</script>

<style scoped lang="scss">
.preloader {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100vh;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bgMain);
  transition: all 0.5s;
  opacity: 1;
  overflow: hidden;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background: var(--bgPreloaderOne);
    opacity: 0.2;
    z-index: 10;
    filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.5));
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background: var(--bgPreloaderTwo);
    opacity: 0.2;
    z-index: 5;
  }
}

.preloader-remove {
  opacity: 0;
  z-index: -10;
}

.preloader-wrap {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-gap: 6px;
  width: 100px;
  height: 100px;
  margin: 30px auto;
  z-index: 100;
}

.preloader-wrap > div {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--linearMain);
  transform: scale(0);
  transform-origin: center center;
  animation: preloader-anim 2s infinite linear;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.7);
}

.preloader-wrap > div:nth-of-type(1),
.preloader-wrap > div:nth-of-type(5),
.preloader-wrap > div:nth-of-type(9) {
  animation-delay: 0.4s;
}

.preloader-wrap > div:nth-of-type(4),
.preloader-wrap > div:nth-of-type(8) {
  animation-delay: 0.2s;
}

.preloader-wrap > div:nth-of-type(2),
.preloader-wrap > div:nth-of-type(6) {
  animation-delay: 0.6s;
}

.preloader-wrap > div:nth-of-type(3) {
  animation-delay: 0.8s;
}

@keyframes preloader-anim {
  0% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
  80% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>