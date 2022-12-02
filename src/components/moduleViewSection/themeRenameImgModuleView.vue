<template lang="pug">
module-view(viewClass="theme-rename-img", viewId="themeRenameTtl")
  module-view-form(formClass="theme-rename-img__form")
    module-view-title(
      titleClass="theme-rename-img__form-title",
      :titleText="theme.rename.img.title"
    )
    img-file-input(
      inputClass="theme-rename-img__form-input",
      inputId="themeRenameTtlFormFile",
      inputName="themeRenameTtlFormName",
      labelClass="theme-rename-img__form-label",
      labelId="themeRenameTtlFormLabel",
      :inputLoad="theme.rename.img.inputLoad",
      :inputFileSucess="theme.rename.img.inputFileSucess",
      :inputFile="theme.rename.img.inputFile",
      @changeAction="preloadThemeRenameImgFormModule($event)"
    )
    main-btn(
      elType="button",
      elId="themeRenameTtlBtn",
      elClass="theme-rename-img__form-btn",
      :elText="theme.rename.img.btnSub",
      @clickAction="uploadThemeRenameImgFormModule().then(() => { delThemeRenameImgFormModule($event), toggleThemeRenameImgFormModule(); })"
    )
    module-view-btn-exit(
      btnType="button",
      btnClass="theme-rename-img__form-btn-exit",
      :btnText="theme.rename.img.btnExit",
      @clickAction="toggleThemeRenameImgFormModule(), delInfoForRenameTheme()"
    )
</template>
<script>
import { mapGetters } from "vuex";
import moduleView from "../moduleView/moduleView.vue";
import moduleViewForm from "../moduleView/moduleViewForm.vue";
import moduleViewBtnExit from "../moduleView/moduleViewBtnExit.vue";
import moduleViewTitle from "../moduleView/moduleViewTitle.vue";

export default {
  name: "rename-theme-img-module",
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
    async toggleThemeRenameImgFormModule() {
      await this.$store.dispatch("toggleThemeRenameImgFormModule");
    },
    async uploadThemeRenameImgFormModule() {
      await this.$store.dispatch("uploadThemeRenameImgFormModule");
    },
    delThemeRenameImgFormModule(e) {
      this.$store.dispatch("delThemeRenameImgFormModule", e);
    },
    delInfoForRenameTheme() {
      this.$store.commit("delInfoForRenameTheme");
    },
    preloadThemeRenameImgFormModule(e) {
      this.$store.dispatch("preloadThemeRenameImgFormModule", e);
    },
  },
};
</script>
<style scoped lang="scss">
</style>