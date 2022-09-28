<template lang="pug">
moduleView(viewClass="theme-rename-ttl", viewId="themeRenameTtl")
  moduleViewForm(formClass="theme-rename-ttl__form")
    moduleViewTitle(
      titleClass="theme-rename-ttl__form-title",
      :titleText="theme.rename.ttl.title"
    )
    formInput(
      elType="text",
      elClass="theme-rename-ttl__form-input",
      elId="themeRenameTtlFormInput",
      elValue="",
      :elPlaceholder="theme.rename.ttl.inputPlace"
      @inputAction="saveInputTtlThemeRename('themeRenameTtlFormInput')"
    )
    mainBtn(
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
import { mapGetters } from "vuex";
import mainBtn from "../parts/mainBtn.vue";
import formInput from "../parts/formInput.vue";
import moduleView from "../moduleView/moduleView.vue";
import moduleViewForm from "../moduleView/moduleViewForm.vue";
import moduleViewBtnExit from "../moduleView/moduleViewBtnExit.vue";
import moduleViewTitle from "../moduleView/moduleViewTitle.vue";
export default {
  computed: {
    ...mapGetters(["theme"]),
  },
  components: {
    mainBtn,
    formInput,
    moduleView,
    moduleViewForm,
    moduleViewBtnExit,
    moduleViewTitle,
  },
  methods: {
    async toggleThemeRenameTtlFormModule() {
      await this.$store.dispatch("toggleThemeRenameTtlFormModule");
    },
    async changeThemeRenameTtlFormModule() {
      await this.$store.dispatch("changeThemeRenameTtlFormModule");
    },
    delInfoForRenameTheme() {
      this.$store.commit("delInfoForRenameTheme");
    },
    saveInputTtlThemeRename(id) {
      this.$store.commit("saveInputTtlThemeRename", id);
    },
  },
};
</script>
<style scoped lang="scss">
</style>