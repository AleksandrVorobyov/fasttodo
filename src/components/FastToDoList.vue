<template lang="pug">
section.todolist
  .container
    .todolist-wrap
      .totolist__nav
        .totolist__nav-col
          todoTitle(:title="fastToDoList.title")
        .totolist__nav-col
          todoListProfile
          todoListMenu
      .todolist__clock-wrap
        span
        todoListClock
        span
      .totolist__categories-wrap
        todoListCategories
      .totolist__theme-wrap
        todoListTheme
      .todolist__form-wrap
        todoListForm
  changeName
  changeAvatar
</template>
<script>
import { mapGetters } from "vuex";
import todoTitle from "./parts/todoTitle.vue";
import todoListCategories from "./parts/todoListCategories.vue";
import todoListTheme from "./parts/todoListTheme.vue";
import todoListProfile from "./parts/todoListProfile.vue";
import todoListMenu from "./parts/todoListMenu.vue";
import todoListClock from "./parts/clock.vue";
import todoListForm from "./parts/todoListForm.vue";
import changeName from "./parts/changeNameModuleView.vue";
import changeAvatar from "./parts/changeAvatarModuleView.vue";

export default {
  components: {
    todoTitle,
    todoListCategories,
    todoListTheme,
    todoListProfile,
    todoListMenu,
    todoListClock,
    todoListForm,
    changeName,
    changeAvatar,
  },
  computed: {
    ...mapGetters(["todolist", "login", "clientTime", "fastToDoList"]),
  },
  methods: {
    localeTime() {
      this.$store.commit("localeTime");
    },
  },
};
</script>
<style scoped lang="scss">
.todolist {
  position: relative;
  padding: 100px 0 100px;
  overflow: hidden;
  z-index: 500;
}

#todolist-time {
  position: relative;
  color: white;
}

.todolist-wrap {
  position: relative;
  display: inline-block;
  padding: 50px 8px;
  width: 100%;
  background: linear-gradient(var(--bgMain) 0 0) padding-box,
    var(--linearMain) border-box;
  border: 8px solid transparent;
  border-radius: 16px;
  z-index: 100;

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
.totolist__categories-wrap {
  position: relative;
  margin-bottom: 40px;
}

.todolist__clock-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-bottom: 40px;

  & > span {
    width: 250px;
    height: 250px;
    border: 5px solid transparent;
    box-sizing: content-box;
    border-image: var(--linearMain);
    border-image-slice: 1;
  }

  span:first-child {
    background: url("~@/assets/img/clock/bg-1.png") center center / contain
      no-repeat;
  }

  span:last-child {
    background: url("~@/assets/img/clock/bg-2.png") center center / contain
      no-repeat;
  }
}
</style>