<template lang="pug">
#todoListWorkPlaceGetTheme.todolist__workplace-get-theme
  .todolist__workplace-col(
    v-for="(item, index) in todolistWorkplace.col",
    :key="item",
    :data-slide="dataSlide(index)"
  )
    template(v-for="(comp, index) in item.component", :key="item")
      component(
        v-if="windowInner(comp.pref)",
        :is="comp.name",
        :data="comp"
      )
</template>
<script>
import { mapGetters } from "vuex";
import workplaceFileInput from "./workplaceFileInput.vue";
import workplaceInput from "./workplaceInput.vue";
import workplaceBtn from "./workplaceBtn.vue";
import workplaceTitle from "./workplaceTitle.vue";
import workplaceBtnBack from "./workplaceBtnBack.vue";
export default {
  computed: {
    ...mapGetters(["todolistWorkplace"]),
  },
  components: {
    workplaceFileInput,
    workplaceInput,
    workplaceBtn,
    workplaceTitle,
    workplaceBtnBack,
  },
  methods: {
    dataSlide(index) {
      return window.innerWidth >= 1140 ? "" : index + 1;
    },
    windowInner(pref) {
      if (window.innerWidth >= 1140 && pref == "mob") {
        return false
      }
      return true
    },
  },
};
</script>
<style scoped lang="scss">
.todolist__workplace-get-theme {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 50;

  @media (min-width: 1140px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;

    &::before,
    &::after {
      position: absolute;
      bottom: 10px;
      content: "";
      height: 140px;
      width: 350px;
      opacity: 0;
      transition: opacity 0.3s linear;
    }

    &::before {
      left: 10px;
      background: url("~@/assets/img/workplace/arrow-dash-first.png") top center /
        contain no-repeat;
    }

    &::after {
      right: 10px;
      background: url("~@/assets/img/workplace/arrow-dash-second.png") top
        center / contain no-repeat;
    }
  }
}

.todolist__workplace-col {
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: column;
  padding: 30px 10px;
  gap: 20px;
  width: 400px;
  height: auto;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  @media (min-width: 1140px) {
    position: relative;
    top: 0;
    left: 0;
    transform: translate(0);
    height: 100%;
    width: 100%;
    opacity: 1;
    visibility: visible;
    pointer-events: all;
  }
}

.todolist__workplace-col[data-slide="1"] {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
}
</style>