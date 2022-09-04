<template lang="pug">
section#formRename.form-rename
  form.form-rename__form
    h3.form-rename__form-title {{ profile.rename.title }}
    formInput(
      elType="text",
      :elPlaceholder="profile.rename.placeholder",
      elClass="form-rename__form-input",
      elId="formRenameInput"
    )
    mainBtn(
      elType="button",
      elId="formRenameBtn",
      elClass="form-rename__form-btn",
      @clickAction="changeUserName()",
      :elText="profile.rename.btn"
    )
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
  padding: 20px;
  width: 400px;
  background: linear-gradient(var(--bgMain) 0 0) padding-box,
    var(--linearMain) border-box;
  border: 4px solid transparent;
  border-radius: 8px;
}

.form-rename__form-title {
  display: block;
  margin-bottom: 20px;
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
</style>