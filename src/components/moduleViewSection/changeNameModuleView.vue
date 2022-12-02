<template lang="pug">
module-view(viewClass="form-rename", viewId="formRename")
  module-view-form(formClass="form-rename__form")
    module-view-title(
      titleClass="form-rename__form-title",
      :titleText="profile.rename.title"
    )
    main-input(
      elType="text",
      :elPlaceholder="profile.rename.placeholder",
      elClass="form-rename__form-input",
      elId="formRenameInput",
      @inputAction="renameInputSave()",
      @keyup.enter.trim="changeUserName()"
    )
    main-btn(
      elType="button",
      elId="formRenameBtn",
      elClass="form-rename__form-btn",
      @clickAction.trim="changeUserName()",
      :elText="profile.rename.btn"
    )
    module-view-btn-exit(
      btnType="button",
      btnClass="form-rename__form-btn-exit",
      :btnText="profile.rename.btnExit",
      @clickAction="toggleRenameFormModule()"
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
  name: "change-name-module",
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
      changeUserName: async () => await store.dispatch("changeUserName"),
      toggleRenameFormModule: async () =>
        await store.dispatch("toggleRenameFormModule"),
      renameInputSave: () => store.dispatch("renameInputSave"),
    };
  },
};
</script>