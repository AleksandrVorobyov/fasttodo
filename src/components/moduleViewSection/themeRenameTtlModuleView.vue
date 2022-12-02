<template lang="pug">
moduleView(viewClass="theme-rename-ttl", viewId="themeRenameTtl")
  moduleViewForm(formClass="theme-rename-ttl__form")
    moduleViewTitle(
      titleClass="theme-rename-ttl__form-title",
      :titleText="theme.rename.ttl.title"
    )
    main-input(
      elType="text",
      elClass="theme-rename-ttl__form-input",
      elId="themeRenameTtlFormInput",
      elValue="",
      :elPlaceholder="theme.rename.ttl.inputPlace",
      @inputAction="saveInputTtlThemeRename('themeRenameTtlFormInput')"
    )
    main-btn(
      elType="button",
      elId="themeRenameTtlBtn",
      elClass="theme-rename-ttl__form-btn",
      :elText="theme.rename.ttl.btnSub",
      @clickAction="changeThemeRenameTtlFormModule().then(() => { toggleThemeRenameTtlFormModule(), delInfoForRenameTheme(); })"
    )
    moduleViewBtnExit(
      btnType="button",
      btnClass="theme-rename-ttl__form-btn-exit",
      :btnText="theme.rename.ttl.btnExit",
      @clickAction="toggleThemeRenameTtlFormModule(), delInfoForRenameTheme()"
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
  name: "theme-rename-ttl-module",
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
      toggleThemeRenameTtlFormModule: async () =>
        await store.dispatch("toggleThemeRenameTtlFormModule"),
      changeThemeRenameTtlFormModule: async () =>
        await store.dispatch("changeThemeRenameTtlFormModule"),
      delInfoForRenameTheme: () => store.commit("delInfoForRenameTheme"),
      saveInputTtlThemeRename: (id) =>
        store.commit("saveInputTtlThemeRename", id),
    };
  },
};
</script>