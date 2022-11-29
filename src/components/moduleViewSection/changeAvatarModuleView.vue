<template lang="pug">
moduleView(viewClass="change-avatar", viewId="changeAvatar")
  moduleViewForm(formClass="change-avatar__form")
    moduleViewTitle(
      titleClass="change-avatar__form-title",
      :titleText="profile.changeAvatar.title"
    )
    img-file-input(
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
    main-btn(
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