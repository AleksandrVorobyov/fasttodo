<template lang="pug">
.preloader
  .preloader-wrap
    div(v-for="item in 9")
</template>

<style scoped lang="scss">
.preloader {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(231, 224, 224);
  transition: all 0.5s;
  opacity: 1;
}

.preloader-remove {
  opacity: 0;
  z-index: -10;
}

.preloader-wrap {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-gap: 2px;
  width: 100px;
  height: 100px;
  margin: 30px auto;
}

.preloader-wrap > div {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--linearMain);
  transform: scale(0);
  transform-origin: center center;
  animation: preloader-anim 2s infinite linear;
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