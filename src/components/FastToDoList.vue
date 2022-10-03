<template lang="pug">
.todolist
  .container
    .todolist-wrap
      nav.totolist__nav
        .totolist__nav-col
          todoTitle(:title="fastToDoList.title")
        .totolist__nav-col
          todoListProfile
          todoListMenu
      .todolist__clock-wrap
        .todolist__img
          glitchImg(
            :glitchImg="fastToDoList.glitchImgOne",
            :glitchClass="'glitch-one'"
          )
        todoListClock
        .todolist__img
          glitchImg(
            :glitchImg="fastToDoList.glitchImgTwo",
            :glitchClass="'glitch-two'"
          )
      .totolist__theme-control-wrap
        todoListThemeControl
        todoListWorkPlace
      .totolist__theme-wrap
        todoListTheme
      .todolist__form-wrap
        todoListForm
      .todolist__footer
        todoListFooter
  changeName(v-show="profile.rename.show")
  changeAvatar(v-show="profile.changeAvatar.show")
  themeRename(v-show="theme.rename.show")
  themeRenameTtl(v-show="theme.rename.ttl.show")
  themeRenameImg(v-show="theme.rename.img.show")
</template>
<script>
import { mapGetters } from "vuex";
import todoTitle from "./parts/todoTitle.vue";
import todoListThemeControl from "./parts/todoListThemeControl.vue";
import todoListWorkPlace from "./parts/todoListWorkPlace.vue";
import todoListTheme from "./parts/todoListTheme.vue";
import todoListProfile from "./parts/todoListProfile.vue";
import todoListMenu from "./parts/todoListMenu.vue";
import todoListClock from "./parts/clock.vue";
import todoListForm from "./parts/todoListForm.vue";
import todoListFooter from "./parts/todoListFooter.vue";
import changeName from "./moduleViewSection/changeNameModuleView.vue";
import changeAvatar from "./moduleViewSection/changeAvatarModuleView.vue";
import themeRename from "./moduleViewSection/themeRenameModuleView.vue";
import themeRenameTtl from "./moduleViewSection/themeRenameTtlModuleView.vue";
import themeRenameImg from "./moduleViewSection/themeRenameImgModuleView.vue";
import glitchImg from "./parts/glitchImg.vue";

export default {
  components: {
    todoTitle,
    todoListThemeControl,
    todoListWorkPlace,
    todoListTheme,
    todoListProfile,
    todoListMenu,
    todoListClock,
    todoListForm,
    todoListFooter,
    changeName,
    changeAvatar,
    themeRename,
    themeRenameTtl,
    themeRenameImg,
    glitchImg,
  },
  computed: {
    ...mapGetters(["fastToDoList", "profile", "theme"]),
  },
};
</script>
<style scoped lang="scss">
.todolist {
  position: relative;
  overflow: hidden;
  z-index: 500;

  @media (min-width: 540px) {
    padding: 15px 0 15px;
  }

  @media (min-width: 1140px) {
    padding: 100px 0 100px;
  }
}

.container {
  padding: 0;
}

@media (min-width: 540px) {
  .container {
    padding: 0 15px;
  }
}

#todolist-time {
  position: relative;
  color: white;
}

.todolist-wrap {
  position: relative;
  display: inline-block;
  padding: 30px 8px;
  width: 100%;
  background: linear-gradient(var(--bgMain) 0 0) padding-box,
    var(--linearMain) border-box;

  z-index: 100;

  @media (min-width: 540px) {
    border: 8px solid transparent;
    border-radius: 16px;
  }

  @media (min-width: 820px) {
    padding: 50px 8px;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    background: var(--linearMain);
    width: 100%;
    height: 100%;
    border-radius: 16px;
    z-index: -2;
    opacity: 0.7;
    filter: blur(10px);
    transform: scale(1.1);
  }

  &::after {
    position: absolute;
    top: 8px;
    left: 8px;
    content: "";
    background: var(--bgMain);
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    border-radius: 16px;
    z-index: -1;
    opacity: 1;
  }
}

.totolist__nav {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.totolist__nav-col {
  display: flex;
  align-items: center;
  gap: 10px;
}

.totolist__nav,
.totolist__theme-control-wrap,
.todolist__clock-wrap {
  position: relative;
  margin-bottom: 20px;

  @media (min-width: 820px) {
    margin-bottom: 40px;
  }
}

.todolist__clock-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  @media (min-width: 1140px) {
    gap: 30px;
  }
}
</style>