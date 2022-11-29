<template lang="pug">
moduleView(viewClass="form-rename", viewId="formRename")
  moduleViewForm(formClass="form-rename__form")
    moduleViewTitle(
      titleClass="form-rename__form-title",
      :titleText="profile.rename.title"
    )
    main-input(
      elType="text",
      :elPlaceholder="profile.rename.placeholder",
      elClass="form-rename__form-input",
      elId="formRenameInput",
      @inputAction="renameInputSave()"
    )
    main-btn(
      elType="button",
      elId="formRenameBtn",
      elClass="form-rename__form-btn",
      @clickAction="changeUserName()",
      :elText="profile.rename.btn"
    )
    moduleViewBtnExit(
      btnType="button",
      btnClass="form-rename__form-btn-exit",
      :btnText="profile.rename.btnExit",
      @clickAction="toggleRenameFormModule()"
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
    ...mapGetters(["profile"]),
  },
  components: {
    moduleView,
    moduleViewForm,
    moduleViewBtnExit,
    moduleViewTitle,
  },
  methods: {
    async changeUserName() {
      await this.$store.dispatch("changeUserName");
    },
    async toggleRenameFormModule() {
      await this.$store.dispatch("toggleRenameFormModule");
    },
    renameInputSave() {
      this.$store.commit("renameInputSave");
    },
  },
};
</script>
<style scoped lang="scss">
</style>