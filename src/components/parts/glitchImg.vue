<template lang="pug">
.glitch
  img(:src="require('@/assets/img/' + glitchImg)")
  div(:class="glitchClass")
</template>
<script>
export default {
  props: {
    glitchImg: String,
    glitchClass: String,
  },
};
</script>
<style scoped lang="scss">
.glitch {
  position: relative;
  width: 250px;
  height: 250px;
  border: 5px solid transparent;
  box-sizing: content-box;
  border-image: var(--linearMain);
  border-image-slice: 1;
}

.glitch div {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  content: "";
}

.glitch .glitch-one {
  background: url("~@/assets/img/clock/bg-1.png") no-repeat 50% 50% / contain;
}

.glitch .glitch-two {
  background: url("~@/assets/img/clock/bg-2.png") no-repeat 50% 50% / contain;
}

.glitch .glitch-one {
  background-color: var(--glitch-blend-color);
  background-blend-mode: var(--glitch-blend-mode);
  animation-duration: var(--glitch-time-anim-1);
  animation-delay: var(--glitch-delay-anim-1);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-name: glitch-anim-1;
}

.glitch .glitch-two {
  background-color: var(--glitch-blend-color);
  background-blend-mode: var(--glitch-blend-mode);
  animation-duration: var(--glitch-time-anim-2);
  animation-delay: var(--glitch-delay-anim-2);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-name: glitch-anim-1;
}

@keyframes glitch-anim-1 {
  0% {
    opacity: 1;
    transform: translate3d(var(--glitch-horizontal), 0, 0);
    clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
  }
  2% {
    clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
  }
  4% {
    clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
  }
  6% {
    clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
  }
  8% {
    clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
  }
  10% {
    clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
  }
  12% {
    clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
  }
  14% {
    clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
  }
  16% {
    clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
  }
  18% {
    clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
  }
  20% {
    clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
  }
  21.9% {
    opacity: 1;
    transform: translate3d(var(--glitch-horizontal), 0, 0);
  }
  22%,
  100% {
    opacity: 0;
    transform: translate3d(0, 0, 0);
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  }
}
</style>