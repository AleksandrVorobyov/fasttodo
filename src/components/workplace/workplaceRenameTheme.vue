<template lang="pug">
#todoListWorkPlaceRenameTheme.todolist__workplace-rename-theme
  workplaceThemeList(
    :rename="todolistWorkplace.rename",
    :list="theme.themeCards"
  )
</template>
<script>
import { mapGetters } from "vuex";
import workplaceThemeList from "./workplaceThemeList.vue";
export default {
  components: {
    workplaceThemeList,
  },
  computed: {
    ...mapGetters(["todolistWorkplace", "theme"]),
  },
};
</script>
<style scoped lang="scss">
.todolist__workplace-rename-theme {
  position: relative;
  padding: 10px;
  height: 100%;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (min-width: 540px) {
    padding: 20px 40px;
  }

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
</style>