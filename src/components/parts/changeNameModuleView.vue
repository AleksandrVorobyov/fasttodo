<template lang="pug">
section#formRename.form-rename
  form.form-rename__form
    h3.form-rename__form-title {{ profile.rename.title }}
    formInput(
      elType="text",
      :elPlaceholder="profile.rename.placeholder",
      elClass="form-rename__form-input",
      elId="formRenameInput"
      @inputAction="renameInputSave()"
    )
    mainBtn(
      elType="button",
      elId="formRenameBtn",
      elClass="form-rename__form-btn",
      @clickAction="changeUserName()",
      :elText="profile.rename.btn"
    )
    button.form-rename__form-btn-exit(
      type="button",
      @click="toggleRenameFormModule()"
    ) Отменить
</template>
<script>
import { mapGetters } from "vuex";
import formInput from "./formInput.vue";
import mainBtn from "./mainBtn.vue";
export default {
  computed: {
    ...mapGetters(["profile"]),
  },
  components: {
    formInput,
    mainBtn,
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
.form-rename {
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

.form-rename.form-rename--active {
  opacity: 1;
  pointer-events: all;
  visibility: visible;
}

.form-rename__form {
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

.form-rename__form-title {
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

.form-rename__form-btn-exit {
  position: relative;
  width: fit-content;
  display: block;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: .5px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: color .4s linear;

  &:hover {
    color: rgb(250, 169, 169);
  }
}
</style>