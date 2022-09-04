<template lang="pug">
section.first-start
  .container
    .first-start-wrap
      .first-start__info
        h1.first-start__info-title(v-html="firstStart.title")
        h3.first-start__info-subtitle {{ firstStart.subtitle }}
        mainBtn(
          :elText="firstStart.btnText",
          elClass="first-start__info-btn",
          @clickAction="(firstStart.animSection = false), animFirstStart(), loginToRouter()"
        )
      .first-start__bg
        .first-start__bg-circle(v-for="item in 4", :key="item")
</template>
<script>
import { mapGetters } from "vuex";
import mainBtn from "./parts/mainBtn.vue";
export default {
  components: {
    mainBtn,
  },
  computed: {
    ...mapGetters(["firstStart"]),
  },
  methods: {
    animFirstStart() {
      this.$store.dispatch("animFirstStart");
    },
    loginToRouter() {
      this.$store.dispatch("loginToRouter");
    },
  },
  mounted() {
    this.firstStart.animSection = true;
    this.animFirstStart();
  },
};
</script>
<style scoped lang="scss">
.first-start {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 500;
}

.first-start-wrap {
  position: relative;
  display: grid;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 100%;
  height: calc(100vh - 60px);
  padding: 0px;
  margin: 30px 0;

  @media (min-width: 720px) {
    height: calc(100vh - 100px);
    gap: 50px;
    margin: 50px 0;
  }

  @media (min-width: 1170px) {
    display: flex;
    gap: 0;
    height: calc(100vh - 200px);
    padding: 50px;
    margin: 100px 0;
  }
}

.first-start__info {
  max-width: 500px;
  z-index: 50;
}

.first-start__info-title {
  display: inline-block;
  margin-bottom: 15px;
  font-size: 42px;
  line-height: 48px;
  letter-spacing: 1px;
  font-weight: 700;
  color: white;

  @media (min-width: 720px) {
    margin-bottom: 20px;
    font-size: 48px;
    line-height: 56px;
  }

  @media (min-width: 1170px) {
    margin-bottom: 30px;
    font-size: 54px;
    line-height: 68px;
  }
}

.first-start__info-subtitle {
  display: inline-block;
  margin-bottom: 15px;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.5px;
  font-weight: 400;
  color: white;

  @media (min-width: 720px) {
    margin-bottom: 20px;
  }

  @media (min-width: 1170px) {
    margin-bottom: 30px;
  }
}

.first-start__info-btn {
  position: relative;
}

.first-start__bg {
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  z-index: 40;
  margin: 0 auto;

  @media (min-width: 720px) {
    width: 350px;
    height: 350px;
  }

  @media (min-width: 1170px) {
    width: 500px;
    height: 500px;
    margin: 0;
  }

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: var(--bgAvatarFirstStart);
    content: "";
    border-radius: 50%;
  }
}

.first-start__bg-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  background: linear-gradient(var(--bgMain) 0 0) padding-box,
    var(--linearMain) border-box;
  border: 10px solid transparent;
  border-radius: 50%;
  filter: blur(3px);

  @media (min-width: 1170px) {
    width: 500px;
    height: 500px;
  }
}

.first-start__bg > .first-start__bg-circle:nth-child(1) {
  transform: translate(-50%, -50%) scale(1.2);
  z-index: -1;
  opacity: 0.5;

  @media (min-width: 720px) {
    opacity: 0.7;
  }
}

.first-start__bg > .first-start__bg-circle:nth-child(2) {
  transform: translate(-50%, -50%) scale(1.4);
  z-index: -2;
  opacity: 0.4;

  @media (min-width: 720px) {
    opacity: 0.6;
  }
}

.first-start__bg > .first-start__bg-circle:nth-child(3) {
  transform: translate(-50%, -50%) scale(1.6);
  z-index: -3;
  opacity: 0.3;

  @media (min-width: 720px) {
    opacity: 0.5;
  }
}

.first-start__bg > .first-start__bg-circle:nth-child(4) {
  transform: translate(-50%, -50%) scale(1.8);
  z-index: -4;
  opacity: 0.2;

  @media (min-width: 720px) {
    opacity: 0.4;
  }
}
</style>