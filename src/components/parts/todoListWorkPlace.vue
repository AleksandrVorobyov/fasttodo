<template lang="pug">
section#todoListWorkPlace.todolist__workplace
  component(:is="todolistWorkplace.activeComponent")
</template>
<script>
import { mapGetters } from "vuex";
import workplaceGetTheme from "../workplace/workplaceGetTheme.vue";
import workplaceRenameTheme from "../workplace/workplaceRenameTheme.vue";
import workplaceRemoveTheme from "../workplace/workplaceRemoveTheme.vue";
export default {
  computed: {
    ...mapGetters(["todolistWorkplace"]),
  },
  components: {
    workplaceGetTheme,
    workplaceRenameTheme,
    workplaceRemoveTheme,
  },
};
</script>
<style scoped lang="scss">
.todolist__workplace {
  position: relative;
  width: 100%;
  height: 0px;
  visibility: hidden;
  border: 0px solid transparent;
  background: linear-gradient(var(--bgMain) 0 0) padding-box,
    var(--linearSectionMain) border-box;
  transition: height 0.5s linear 0.3s, border 0s linear 0.8s,
    visibility 0s linear 0.8s;
  overflow: hidden;
  z-index: 50;
}

.todolist__workplace--active {
  height: var(--workplaceHeight);
  visibility: visible;
  border: 5px solid transparent;
  border-top: 0px;
  transition: height 0.5s linear;

  .todolist__workplace-get-theme::before,
  .todolist__workplace-get-theme::after {
    opacity: 1;
    transition: opacity 0.3s linear 0.5s;
  }
}
</style>