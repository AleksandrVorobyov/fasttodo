<template lang="pug">
button#todo-burger.todo-burger(type="button", @click="todoBurgerBtnAnim()")
  span
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["header"]),
  },
  methods: {
    todoBurgerBtnAnim() {
      document
        .getElementById("todo-burger")
        .classList.toggle("todo-burger--active");
      document
        .getElementById("todo-menu")
        .classList.toggle("todo-menu--active");
    },
  },
};
</script>
<style scoped lang="scss">
.todo-burger {
  position: relative;
  display: block;
  width: 40px;
  height: 30px;
  background: transparent;
  border: none;
  outline: none;
  border-radius: 0px;
  cursor: pointer;

  &:hover {
    & > span::before {
      width: 50%;
    }
  }

  &::before,
  &::after,
  & > span::before {
    position: absolute;
    left: 0;
    content: "";
    width: 100%;
    height: 3px;
    background: white;
    pointer-events: none;
    user-select: none;
    border-radius: 3px;
    transition: top 0.4s linear, bottom 0.4s linear, transform 0.4s linear,
      opacity 0s linear, width 0.4s linear;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }

  & > span::before {
    top: 50%;
    transform: translateY(-50%);
    transition-delay: 0.4s;
  }
}

.todo-burger--active {
  &::before {
    top: 50%;
    transform: translateY(-50%) rotate(-45deg);
    transition: transform 0.4s linear;
  }

  &::after {
    bottom: 50%;
    transform: translateY(50%) rotate(45deg);
    transition: transform 0.4s linear;
  }

  & > span::before {
    opacity: 0;
    transition-delay: 0s;
    transition: transform 0.4s linear;
  }
}
</style>