<template lang="pug">
Preloader
router-view
</template>

<script>
import Preloader from "./components/AppPreloader.vue";

export default {
  components: {
    Preloader,
  },
  mounted() {
    window.onload = function () {
      setTimeout(() => {
        document.querySelector(".preloader").classList.add("preloader-remove");
      }, 1500);
    };
  },
};
</script>


<style lang="scss">
:root {
  --grayMain: #e6e1e1;
  --grayBorder: #ada8a8;
  --redMain: red;
  --linearMain: linear-gradient(45deg, #dfff28, #09f3e7);
}

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

html,
body {
  position: relative;
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  color: black;
  line-height: 1;
  font-size: 16px;
  font-weight: 400;
}

body.hidden {
  overflow: hidden;
}

input,
textarea {
  font-size: 16px;
  line-height: 1.5;
  resize: vertical;
  -webkit-appearance: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

img {
  display: block;
  max-width: 100%;
  user-select: none;
}

.container-big {
  max-width: 1470px;
  padding: 0 15px;
  margin: 0 auto;
}

.container {
  max-width: 1140px;
  padding: 0 15px;
  margin: 0 auto;
}

.display-block {
  display: block;
}

.relative {
  position: relative;
}
</style>
