<template lang="pug">
Preloader
router-view
</template>

<script>
import Preloader from "./components/FastPreloader.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Preloader,
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    async authLocalVerification() {
      await this.$store.dispatch("authLocalVerification");
    },
  },
  created() {
      setTimeout(() => {
        document.querySelector(".preloader").classList.add("preloader-remove");
        let lastPageRoute = localStorage.getItem('lastPageRoute');
        if (this.user.selected == false) {
          if (lastPageRoute) { return this.$router.push(lastPageRoute == "/" ? "/start" : lastPageRoute); }
          return this.$router.push("/start");
        } else {
          this.$router.push("/");
        }
      }, 1000);
    this.authLocalVerification();
  },
};
</script>


<style lang="scss">
:root {
  --bgMain: #0a0c26;
  --grayMain: #e6e1e1;
  --grayBorder: #ada8a8;
  --activeMain: #6947cb;
  --linearMain: linear-gradient(97.62deg, #eb11aa -15.99%, #2e81e2 104.3%);
  --linearMainSecond: linear-gradient(
    89.96deg,
    #cb47a0 0.02%,
    #6947cb 49.47%,
    #00ff85 99.97%
  );
  --bgPreloaderOne: url("~@/assets/img/payload/rock-bg.png") top left / cover
    no-repeat;
  --bgPreloaderTwo: url("~@/assets/img/payload/blue.jpg") top left / cover
    no-repeat;
  --bgAvatarFirstStart: url("~@/assets/img/firstStart/avatar.png") center center /
    contain no-repeat;
  --clockHourArrow: #eb11aa;
  --clockMinArrow: #fff;
  --clockSecArrow: #6947cb;
  --clockLight: purple;
}

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  user-select: none;
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
  font-family: "Strong";
  font-size: 16px;
  font-weight: 400;
  background: var(--bgMain);
}

body::before {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: "";
  background: url("~@/assets/img/bg/lines.png") top center / cover no-repeat;
  filter: hue-rotate(60deg) opacity(30%);
  background-attachment: fixed;
}

body.hidden,
.app-hidden {
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

.title-gradient {
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  background-image: var(--linearMain);
  font-family: "Pixel";
}
</style>
