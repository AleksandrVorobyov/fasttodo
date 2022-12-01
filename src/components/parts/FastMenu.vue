<template lang="pug">
#todolistProfileMenu.todolist-profile__menu
  .todolist-profile__menu-header
    h5.todolist-profile__menu-header-username {{ webUser.username }}
    fast-nav-clock
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
import { computed } from "vue";
import { useStore } from "vuex";
import fastNavClock from "./FastNavClock.vue";
export default {
  name: "fast-menu",
  components: {
    fastNavClock,
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.user);

    return {
      user,
      profile: computed(() => store.getters.profile),
      webUser: computed(() => store.getters.webUser),
      loginToRouter: () => store.dispatch("loginToRouter"),
      todoMenuActive: () => store.commit("todoMenuActive"),
      toggleRenameFormModule: async () =>
        await store.dispatch("toggleRenameFormModule"),
      toggleChangeAvatarFormModule: async () =>
        await store.dispatch("toggleChangeAvatarFormModule"),
      logout: async () => {
        await store.dispatch("logout")
        return user.selected = false;
      },
    };
  },
};
</script>
<style scoped lang="scss">
.todolist-profile__menu {
  position: absolute;
  padding: 8px;
  display: grid;
  top: calc(100% + 20px);
  right: 0;
  background: var(--linearMain);
  z-index: 500;
  opacity: 0;
  pointer-events: none;
  right: 100px;
  transition: all 0.5s linear;

  @media (min-width: 720px) {
    top: calc(100% + 40px);
  }

  &::before {
    position: absolute;
    top: -20px;
    right: 10%;
    content: "";
    border: 10px solid transparent;
    border-bottom: 10px solid #2e81e2;
  }
}

.todolist-profile__menu-header {
  position: relative;
  display: grid;
  gap: 10px;
  margin-bottom: 10px;
  justify-content: flex-end;

  @media (min-width: 460px) {
    display: none;
  }
}

.todolist-profile__menu-header-username {
  font-size: 18px;
  line-height: 20px;
  color: #fff;
  text-align: right;
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