<template lang="pug">
section#todoListWorkPlace.todolist__workplace
  .todolist__workplace-col(v-for="item in todolistWorkplace.col", :key="item")
    template(v-for="(comp, index) in item.component", :key="item")
      component(:is="comp.name", :data="comp")
</template>
<script>
import { mapGetters } from "vuex";
import workplaceFileInput from "../workplace/workplaceFileInput.vue";
import workplaceInput from "../workplace/workplaceInput.vue";
import workplaceBtn from "../workplace/workplaceBtn.vue";
import workplaceTitle from "../workplace/workplaceTitle.vue";
export default {
  computed: {
    ...mapGetters(["todolistWorkplace"]),
  },
  components: {
    workplaceFileInput,
    workplaceInput,
    workplaceBtn,
    workplaceTitle,
  },
};
</script>
<style scoped lang="scss">
.todolist__workplace {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  width: 100%;
  height: 0px;
  visibility: hidden;
  border: 0px solid transparent;
  background: linear-gradient(var(--bgMain) 0 0) padding-box,
    var(--linearSectionMain) border-box;
  z-index: 50;
  transition: height 0.5s linear .3s, border 0s linear 0.8s,
    visibility 0s linear 0.8s;
  overflow: hidden;

  &::before,
  &::after {
    position: absolute;
    bottom: 10px;
    content: "";
    height: 140px;
    width: 350px;
    opacity: 0;
    transition: opacity .3s linear;
  }

  &::before {
    left: 10px;
    background: url("~@/assets/img/workplace/arrow-dash-first.png") top center /
      contain no-repeat;
  }

  &::after {
    right: 10px;
    background: url("~@/assets/img/workplace/arrow-dash-second.png") top center /
      contain no-repeat;
  }
}

.todolist__workplace--active {
  height: var(--workplaceHeight);
  visibility: visible;
  border: 5px solid transparent;
  border-top: 0px;
  transition: height linear 0.5s;

  &::before,
  &::after {
    opacity: 1;
    transition: opacity .3s linear .5s;
  }
}

.todolist__workplace-col {
  display: flex;
  flex-direction: column;
  padding: 30px 10px;
  gap: 20px;
  height: 100%;
  width: 100%;
}
</style>