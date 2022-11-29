<template lang="pug">
moduleView(viewClass="theme-rename", viewId="themeRename")
  moduleViewForm(formClass="theme-rename__form")
    moduleViewTitle(
      titleClass="theme-rename__form-title",
      :titleText="theme.rename.title"
    )
    main-btn(
      elType="button",
      elId="themeRenameBtn",
      elClass="theme-rename__form-btn",
      :elText="theme.rename.btnTtlRenameText"
      @clickAction="toggleThemeRenameFormModule(), toggleThemeRenameTtlFormModule()"
    )
    main-btn(
      elType="button",
      elId="themeRenameBtn",
      elClass="theme-rename__form-btn",
      :elText="theme.rename.btnTtlRenameimg"
      @clickAction="toggleThemeRenameFormModule(), toggleThemeRenameImgFormModule()"
    )
    moduleViewBtnExit(
      btnType="button",
      btnClass="theme-rename__form-btn-exit",
      :btnText="theme.rename.btnExit",
      @clickAction="toggleThemeRenameFormModule(), delInfoForRenameTheme()"
    )
</template>
<script>
import { mapGetters } from "vuex";
import moduleView from "../moduleView/moduleView.vue";
import moduleViewForm from "../moduleView/moduleViewForm.vue";
import moduleViewBtnExit from "../moduleView/moduleViewBtnExit.vue";
import moduleViewTitle from "../moduleView/moduleViewTitle.vue";

export default {
  computed: {
    ...mapGetters(["theme"]),
  },
  components: {
    moduleView,
    moduleViewForm,
    moduleViewBtnExit,
    moduleViewTitle,
  },
  methods: {
    async toggleThemeRenameFormModule() {
      await this.$store.dispatch("toggleThemeRenameFormModule");
    },
    async toggleThemeRenameTtlFormModule() {
      await this.$store.dispatch("toggleThemeRenameTtlFormModule");
    },
    async toggleThemeRenameImgFormModule() {
      await this.$store.dispatch("toggleThemeRenameImgFormModule");
    },
    delInfoForRenameTheme() {
      this.$store.commit("delInfoForRenameTheme");
    },
  },
};
</script>
<style scoped lang="scss">
</style>