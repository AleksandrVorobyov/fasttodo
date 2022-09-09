<template lang="pug">
#todolistProfileMenu.todolist-profile__menu
  ul.todolist-profile__menu-list
    li.todolist-profile__menu-item
      button.todolist-profile__menu-btn(
        type="button",
        @click="toggleRenameFormModule(), todoMenuActive()"
      ) {{ profile.menu.btn.renameTextBtn }}
    li.todolist-profile__menu-item
      button.todolist-profile__menu-btn(
        type="button",
        @click="toggleChangeAvatarFormModule(), todoMenuActive()"
      ) {{ profile.menu.btn.renameImgBtn }}
    li.todolist-profile__menu-item
      button.todolist-profile__menu-btn(
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
    async toggleRenameFormModule() {
      await this.$store.dispatch("toggleRenameFormModule");
    },
    async toggleChangeAvatarFormModule() {
      await this.$store.dispatch("toggleChangeAvatarFormModule");
    },
  },
};
</script>
<style scoped lang="scss">
.todolist-profile__menu {
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

.todolist-profile__menu--active {
  right: 0;
  pointer-events: all;
  opacity: 1;
}

.todolist-profile__menu-item {
  width: 100%;
}

.todolist-profile__menu-list {
  min-width: 200px;
  min-height: 100px;
  display: grid;
  gap: 2px;
  background: white;
}

.todolist-profile__menu-btn {
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