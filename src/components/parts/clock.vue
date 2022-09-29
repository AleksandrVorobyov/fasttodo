<template lang="pug">
.clock
  #light
    span
  .hour
    #hr.hr
  .min
    #mn.mn
  .sec
    #sc.sc
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      clock: {},
    };
  },
  computed: {
    ...mapGetters(["fastToDoList"]),
  },
  methods: {
    runClock() {
      this.clock = setInterval(() => {
        this.$store.dispatch("runClock");
      }, 1000);
    },
  },
  mounted() {
    this.runClock();
  },

  beforeUnmount() {
    clearInterval(this.clock);
  },
};
</script>
<style scoped lang="scss">
.clock {
  display: none;

  @media (min-width: 720px) {
    position: relative;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 8px solid transparent;
    background: linear-gradient(var(--bgMain) 0 0) padding-box,
      var(--linearMain) border-box;
    border-radius: 50%;
    box-shadow: 0 -15px 15px rgba(255, 255, 255, 0.05),
      inset 0 -15px 15px rgba(255, 255, 255, 0.05),
      0 15px 15px rgba(0, 0, 0, 0.3), inset 0 15px 15px rgba(0, 0, 0, 0.3);
  }

  @media (min-width: 820px) {
    width: 230px;
    height: 230px;
  }

  @media (min-width: 1140px) {
    width: 300px;
    height: 300px;
  }
}

.clock:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 50%;
  background: url("~@/assets/img/clock/clock.png") center center / cover
    no-repeat;
  border: 8px solid transparent;
  filter: invert(1);
}

.clock:before {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  background: #fff;
  border-radius: 50%;
  z-index: 10000;
}

.clock .hour,
.clock .min,
.clock .sec {
  position: absolute;
}

.clock .hour,
.hr {
  width: 100px;
  height: 100px;
}
.clock .min,
.mn {
  width: 150px;
  height: 150px;
}
.clock .sec,
.sc {
  width: 190px;
  height: 190px;
}

.hr,
.mn,
.sc {
  display: flex;
  justify-content: center;
  position: absolute;
  border-radius: 50%;
}

.hr:before {
  content: "";
  position: absolute;
  width: 6px;
  height: 55px;
  background: var(--clockHourArrow);
  z-index: 10;
  border-radius: 6px 6px 0 0;
}

.mn:before {
  content: "";
  position: absolute;
  width: 4px;
  height: 80px;
  background: var(--clockMinArrow);
  z-index: 11;
  border-radius: 6px 6px 0 0;
}

.sc:before {
  content: "";
  position: absolute;
  width: 2px;
  height: 100px;
  background: var(--clockSecArrow);
  z-index: 12;
  border-radius: 6px 6px 0 0;
}

span {
  content: "";
  display: block;
  position: absolute;
  left: 50%;
  width: 9%;
  height: 4px;
  z-index: 25px;
  background: transparent;
  transform-origin: left;
  animation: animate 3s linear infinite;
}

span:after {
  content: "";
  position: absolute;
  width: 8px;
  height: 25px;
  border-radius: 50%;
  background: var(--clockLight);
  top: -6px;
  right: -8px;
  box-shadow: 0 0 20px rgb(107, 107, 240);
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>