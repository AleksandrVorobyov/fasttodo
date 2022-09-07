<template lang="pug">
moduleView(viewClass="change-avatar", viewId="changeAvatar")
  moduleViewForm(formClass="change-avatar__form")
    moduleViewTitle(
      titleClass="change-avatar__form-title",
      :titleText="profile.changeAvatar.title"
    )
    input#changeAvatarFormFile.change-avatar__form-file(
      type="file",
      name="changeAvatarFormFile",
      accept="image/*",
      @change="preloadingImage($event)"
    )
    label.change-avatar__form-file-label.label-fire(for="changeAvatarFormFile")
      fileLoadSvg
      span {{ profile.changeAvatar.inputLoad ? profile.changeAvatar.inputFileSucess : profile.changeAvatar.inputFile }}
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
      @clickAction="() => { toggleChangeAvatarFormModule(), loadProfileInputFile(), delPreloadImage(); }"
    )
</template>
<script>
import { mapGetters } from "vuex";
import mainBtn from "./mainBtn.vue";
import moduleView from "./moduleView.vue";
import moduleViewForm from "./moduleViewForm.vue";
import moduleViewBtnExit from "./moduleViewBtnExit.vue";
import moduleViewTitle from "./moduleViewTitle.vue";
import fileLoadSvg from "@/assets/img/iconVue/file-load.vue";
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
    fileLoadSvg,
  },
  methods: {
    async toggleChangeAvatarFormModule() {
      await this.$store.dispatch("toggleChangeAvatarFormModule");
    },
    async changeAvatar() {
      await this.$store.dispatch("changeAvatar");
    },
    async preloadingImage(e) {
      await this.$store.dispatch("preloadingImage", e);
    },
    loadProfileInputFile() {
      this.$store.dispatch("loadProfileInputFile");
    },
    delPreloadImage() {
      this.$store.dispatch("delPreloadImage");
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

.change-avatar__form-file-label {
  padding: 0;
  width: 100%;
  margin: auto;
  display: block;
  border: 2px solid #555;
  transition: border 0.4s linear;
}

.change-avatar__form-file-label--sucess {
  border: 2px solid rgb(52, 243, 61);
}

.change-avatar__form-file-label:hover,
.change-avatar__form-file-label:focus {
  border-color: #888;
}

.change-avatar__form-file {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.change-avatar__form-file + .label-fire {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 20px 10px;
  cursor: pointer;
}

.change-avatar__form-file-label.label-fire {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  span {
    color: rgb(243, 243, 243);
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.5px;
  }

  svg {
    width: 60px;
    height: 60px;
    fill: #fff;
  }
}
</style>