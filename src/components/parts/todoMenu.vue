<template lang="pug">
#todo-menu.todo-menu
  button(@click="logout(), loginToRouter()", type="button") Выйти из профиля?
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      return (this.user.selected = false);
    },
    loginToRouter() {
      this.$store.dispatch("loginToRouter");
    },
  },
};
</script>
<style scoped lang="scss">
.todo-menu {
  position: absolute;
  top: calc(100% + 40px);
  right: 0;
  width: 500px;
  height: 300px;
  background: white;
  z-index: 500;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s linear;
}

.todo-menu--active {
  opacity: 1;
  pointer-events: all;
}
</style>