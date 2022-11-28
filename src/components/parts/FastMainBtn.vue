<template lang="pug">
button.main-btn(
  :type="elType",
  :id="elId",
  :class="elClass",
  @click="$emit('clickAction', $event)"
) 
  span.main-btn__text {{ elText }}
  span.main-btn__effect(
    @mousemove="mainBtnAnimMove($event)",
    @mouseleave="mainBtnAnimLeave($event)"
  )
</template>
<script>
export default {
  name: "mainBtn",
  props: {
    elText: String,
    elClass: String,
    elId: String,
    elType: {
      type: String,
      default: "button",
      required: false,
    },
  },
  emits: ["clickAction"],
  methods: {
    mainBtnAnimMove(e) {
      this.$store.commit("mainBtnAnimMove", e);
    },
    mainBtnAnimLeave(e) {
      this.$store.commit("mainBtnAnimLeave", e);
    },
  },
};
</script>
<style scoped lang="scss">
.main-btn {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 10px;
  background: linear-gradient(var(--bgMain) 0 0) padding-box,
    var(--linearMain) border-box;
  border: 2px solid transparent;
  border-radius: 0px;
  cursor: pointer;
  outline: none;
  transition: all 1s linear;
  z-index: 5;

  .main-btn__text {
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0.3px;
    color: white;
    z-index: 5;
    user-select: none;
    pointer-events: none;
  }

  @media (min-width: 540px) {
    .main-btn__text {
      font-size: 16px;
      line-height: 21px;
      letter-spacing: 0.5px;
    }
  }

  .main-btn__effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -4;
  }
}

button:focus {
  outline: none;
}
</style>

