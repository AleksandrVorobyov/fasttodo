<template lang="pug">
section.todolist
  .container
    .todolist-wrap
      h2.todolist__title(v-if="login.userSelected !== true") {{ todolist.title }}
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["todolist", "login"]),
  },
};
</script>
<style scoped lang="scss">
.todolist {
  position: relative;
  padding: 100px 0 10px;
  overflow: hidden;
  z-index: 500;
}
.todolist-wrap {
  position: relative;
  background: var(--linearMain);
  width: 100%;
  min-height: 800px;
  border-radius: 16px;
  box-shadow: 0px 0px 6px var(--grayBorder);
  padding: 20px;
  z-index: 100;

  &::before {
    position: absolute;
    top: 10px;
    left: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    content: "";
    border-radius: 16px;
    background: #ffffff86;
    z-index: -1;
  }
}

.todolist__title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 48px;
  line-height: 56px;
  font-weight: 400;
  letter-spacing: 1px;
  max-width: 400px;
  font-family: "Benae";
}
</style>