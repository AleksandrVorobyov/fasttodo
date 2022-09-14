<template lang="pug">
#todoListWorkPlaceGetTheme.todolist__workplace-get-theme
  .todolist__workplace-col(v-for="item in todolistWorkplace.col", :key="item")
    template(v-for="(comp, index) in item.component", :key="item")
      component(:is="comp.name", :data="comp")
</template>
<script>
import { mapGetters } from "vuex";
import workplaceFileInput from "./workplaceFileInput.vue";
import workplaceInput from "./workplaceInput.vue";
import workplaceBtn from "./workplaceBtn.vue";
import workplaceTitle from "./workplaceTitle.vue";
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
.todolist__workplace-get-theme {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  width: 100%;
  height: 100%;
  z-index: 50;

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
    background: url("~@/assets/img/workplace/arrow-dash-second.png") top center /
      contain no-repeat;
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