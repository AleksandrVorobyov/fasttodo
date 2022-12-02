<template lang="pug">
module-view(viewClass="theme-rename", viewId="themeRename")
  module-view-form(formClass="theme-rename__form")
    module-view-title(
      titleClass="theme-rename__form-title",
      :titleText="theme.rename.title"
    )
    main-btn(
      elType="button",
      elId="themeRenameBtn",
      elClass="theme-rename__form-btn",
      :elText="theme.rename.btnTtlRenameText",
      @clickAction="toggleThemeRenameFormModule(), toggleThemeRenameTtlFormModule()"
    )
    main-btn(
      elType="button",
      elId="themeRenameBtn",
      elClass="theme-rename__form-btn",
      :elText="theme.rename.btnTtlRenameimg",
      @clickAction="toggleThemeRenameFormModule(), toggleThemeRenameImgFormModule()"
    )
    module-view-btn-exit(
      btnType="button",
      btnClass="theme-rename__form-btn-exit",
      :btnText="theme.rename.btnExit",
      @clickAction="toggleThemeRenameFormModule(), delInfoForRenameTheme()"
    )
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import moduleView from "../moduleView/moduleView.vue";
import moduleViewForm from "../moduleView/moduleViewForm.vue";
import moduleViewBtnExit from "../moduleView/moduleViewBtnExit.vue";
import moduleViewTitle from "../moduleView/moduleViewTitle.vue";

export default {
  name: "rename-theme-module",
  components: {
    moduleView,
    moduleViewForm,
    moduleViewBtnExit,
    moduleViewTitle,
  },
  setup() {
    const store = useStore();
    return {
      theme: computed(() => store.getters.theme),
      toggleThemeRenameFormModule: async () =>
        await store.dispatch("toggleThemeRenameFormModule"),
      toggleThemeRenameTtlFormModule: async () =>
        await store.dispatch("toggleThemeRenameTtlFormModule"),
      toggleThemeRenameImgFormModule: async () =>
        await store.dispatch("toggleThemeRenameImgFormModule"),
      delInfoForRenameTheme: () => store.dispatch("delInfoForRenameTheme"),
    };
  },

};
</script>
<style scoped lang="scss">
</style>