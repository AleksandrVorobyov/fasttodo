<template lang="pug">
section#changeAvatar.change-avatar
  form.change-avatar__form
    h3.change-avatar__form-title {{ profile.changeAvatar.title }}
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
    button.change-avatar__form-btn-exit(
      type="button",
      @click="() => { toggleChangeAvatarFormModule(), loadProfileInputFile(), delPreloadImage(); }"
    ) {{ profile.changeAvatar.btnExit }}
</template>
<script>
import { mapGetters } from "vuex";
import mainBtn from "./mainBtn.vue";
import fileLoadSvg from "@/assets/img/iconVue/file-load.vue";
export default {
  computed: {
    ...mapGetters(["profile"]),
  },
  components: {
    mainBtn,
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
.change-avatar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}

.change-avatar.change-avatar--active {
  opacity: 1;
  pointer-events: all;
  visibility: visible;
}

.change-avatar__form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  gap: 20px;
  padding: 20px;
  width: 400px;
  background: linear-gradient(var(--bgMain) 0 0) padding-box,
    var(--linearMain) border-box;
  border: 4px solid transparent;
  border-radius: 8px;
}

.change-avatar__form-title {
  display: block;
  text-align: center;
  font-size: 26px;
  line-height: 34px;
  letter-spacing: 1px;
  font-weight: 700;
  color: white;

  @media (min-width: 720px) {
    font-size: 22px;
    line-height: 26px;
  }
}

.change-avatar__form-btn-exit {
  position: relative;
  width: fit-content;
  display: block;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 0.5px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: color 0.4s linear;

  &:hover {
    color: rgb(250, 169, 169);
  }
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