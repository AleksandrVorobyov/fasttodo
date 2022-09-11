<template lang="pug">
moduleView(viewClass="change-avatar", viewId="changeAvatar")
  moduleViewForm(formClass="change-avatar__form")
    moduleViewTitle(
      titleClass="change-avatar__form-title",
      :titleText="profile.changeAvatar.title"
    )
    imageFileInput(
      inputClass="change-avatar__form-file",
      inputId="changeAvatarFormFile",
      inputName="changeAvatarFormFile",
      labelClass="change-avatar__form-file-label",
      labelId="changeAvatarFormFileLabel",
      :inputLoad="profile.changeAvatar.inputLoad",
      :inputFileSucess="profile.changeAvatar.inputFileSucess",
      :inputFile="profile.changeAvatar.inputFile",
      @changeAction="preloadingImageAvatar($event)"
    )
    mainBtn(
      elType="button",
      elId="formRenameBtn",
      elClass="form-rename__form-btn",
      :elText="profile.changeAvatar.btnSubmit",
      @clickAction="changeAvatar()"
    )
    moduleViewBtnExit(
      btnType="button",
      btnClass="change-avatar__form-btn-exit",
      :btnText="profile.changeAvatar.btnExit",
      @clickAction="toggleChangeAvatarFormModule(), loadProfileInputFile(), delPreloadImageAvatar($event);"
    )
</template>
<script>
import { mapGetters } from "vuex";
import mainBtn from "./mainBtn.vue";
import moduleView from "./moduleView.vue";
import moduleViewForm from "./moduleViewForm.vue";
import moduleViewBtnExit from "./moduleViewBtnExit.vue";
import moduleViewTitle from "./moduleViewTitle.vue";
import imageFileInput from "./imageFileInput.vue";
export default {
  computed: {
    ...mapGetters(["profile"]),
  },
  components: {
    mainBtn,
    moduleView,
    moduleViewForm,
    moduleViewBtnExit,
    moduleViewTitle,
    imageFileInput,
  },
  methods: {
    async toggleChangeAvatarFormModule() {
      await this.$store.dispatch("toggleChangeAvatarFormModule");
    },
    async changeAvatar() {
      await this.$store.dispatch("changeAvatar");
    },
    async preloadingImageAvatar(e) {
      await this.$store.dispatch("preloadingImageAvatar", e);
    },
    loadProfileInputFile() {
      this.$store.dispatch("loadProfileInputFile");
    },
    delPreloadImageAvatar(e) {
      this.$store.dispatch("delPreloadImageAvatar", e);
    },
  },
};
</script>
<style scoped lang="scss">
.change-avatar.change-avatar--active {
  opacity: 1;
  pointer-events: all;
  visibility: visible;
}
</style>