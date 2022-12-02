<template lang="pug">
module-view(viewClass="change-avatar", viewId="changeAvatar")
  module-view-form(formClass="change-avatar__form")
    module-view-title(
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
    module-view-btn-exit(
      btnType="button",
      btnClass="change-avatar__form-btn-exit",
      :btnText="profile.changeAvatar.btnExit",
      @clickAction="toggleChangeAvatarFormModule(), loadProfileInputFile(), delPreloadImageAvatar($event)"
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
  name: "change-avatar-module",
  components: {
    moduleView,
    moduleViewForm,
    moduleViewBtnExit,
    moduleViewTitle,
  },
  setup() {
    const store = useStore();

    return {
      profile: computed(() => store.getters.profile),
      toggleChangeAvatarFormModule: async () =>
        await store.dispatch("toggleChangeAvatarFormModule"),
      changeAvatar: async () => await store.dispatch("changeAvatar"),
      preloadingImageAvatar: async (e) =>
        await store.dispatch("preloadingImageAvatar", e),
      loadProfileInputFile: () => store.dispatch("loadProfileInputFile"),
      delPreloadImageAvatar: (e) => store.dispatch("delPreloadImageAvatar", e),
    };
  },
};
</script>