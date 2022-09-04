<template lang="pug">
#todo-profile__menu.todo-profile__menu
  ul.todo-profile__menu-list
    li.todo-profile__menu-item
      button.todo-profile__menu-btn(type="button" @click="openRenameFormModule(), todoMenuActive()",) {{ profile.menu.btn.renameTextBtn }}
    li.todo-profile__menu-item
      button.todo-profile__menu-btn(type="button" @click="changeUserName(), todoMenuActive()") {{ profile.menu.btn.renameImgBtn }}
    li.todo-profile__menu-item
      button.todo-profile__menu-btn(
        @click="logout(), todoMenuActive(), loginToRouter()",
        type="button"
      ) {{ profile.menu.btn.exitBtn }}
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["user", "profile"]),
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      return (this.user.selected = false);
    },
    loginToRouter() {
      this.$store.dispatch("loginToRouter");
    },
    todoMenuActive() {
      this.$store.commit("todoMenuActive");
    },
    openRenameFormModule() {
      this.$store.commit("openRenameFormModule");
    },
    async changeUserName() {
      await this.$store.dispatch("changeUserName");
    },
  },
};
</script>
<style scoped lang="scss">
.todo-profile__menu {
  position: absolute;
  padding: 8px;
  display: grid;
  top: calc(100% + 40px);
  right: 0;
  background: var(--linearMain);
  z-index: 500;
  opacity: 0;
  pointer-events: none;
  right: 100px;
  transition: all 0.5s linear;

  &::before {
    position: absolute;
    top: -20px;
    right: 10%;
    content: "";
    border: 10px solid transparent;
    border-bottom: 10px solid #2e81e2;
  }
}

.todo-profile__menu--active {
  right: 0;
  pointer-events: all;
  opacity: 1;
}

.todo-profile__menu-item {
  width: 100%;
}

.todo-profile__menu-list {
  min-width: 200px;
  min-height: 100px;
  display: grid;
  gap: 2px;
  background: white;
}

.todo-profile__menu-btn {
  position: relative;
  width: 100%;
  background: rgba(162, 138, 202, 0.6);
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 0.3px;
  height: 40px;
  color: #fff;
  cursor: pointer;
  border: none;
  z-index: 10;

  &::before {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 100%;
    content: "";
    background: rgba(0, 0, 255, 0.3);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
    z-index: -1;
  }

  &:hover::before {
    width: 100%;
    opacity: 1;
  }
}
</style>