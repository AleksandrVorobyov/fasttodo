<template lang="pug">
.sad-face
  .face
    .eye
    .eye.right
    .mouth.sad
  .shadow.move
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: 'sad-face',
  computed: {
    ...mapGetters(["header"]),
  },
};
</script>
<style scoped lang="scss">
$white: #fcfcfc;
$dark: #777777;

.sad-face {
  position: relative;
  width: 100%;
  height: 100px;
}

.face {
  position: absolute;
  width: 60px;
  height: 60px;
  background: $white;
  border-radius: 50%;
  border: 1px solid $dark;
  top: 21%;
  left: 37.5%;
  z-index: 2;
  animation: roll 3s ease-in-out infinite;
}

.eye {
  position: absolute;
  width: 5px;
  height: 5px;
  background: $dark;
  border-radius: 50%;
  top: 40%;
  left: 20%;
}

.right {
  left: 68%;
}

.mouth {
  position: absolute;
  top: 43%;
  left: 41%;
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.sad {
  top: 49%;
  border: 2px solid;
  border-color: $dark transparent transparent $dark;
  transform: rotate(45deg);
}

.shadow {
  position: absolute;
  width: 15%;
  height: 25px;
  opacity: 0.5;
  background: $dark;
  left: 40%;
  top: 70%;
  border-radius: 50%;
  z-index: 1;
}

.move {
  animation: move 3s ease-in-out infinite;
}

@keyframes roll {
  0% {
    transform: rotate(0deg);
    left: 25%;
  }
  50% {
    left: 60%;
    transform: rotate(168deg);
  }
  100% {
    transform: rotate(0deg);
    left: 25%;
  }
}

@keyframes move {
  0% {
    left: 25%;
  }
  50% {
    left: 60%;
  }
  100% {
    left: 25%;
  }
}
</style>