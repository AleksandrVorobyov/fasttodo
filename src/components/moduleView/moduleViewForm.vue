<template lang="pug">
form.module-view__form(
  :class="formClass",
  :id="formId",
  :name="formName",
  :action="formAction",
  @submit.prevent
)
  slot
</template>
<script>
export default {
  name: "module-view-form",
  props: {
    formClass: String,
    formId: String,
    formAction: {
      type: String,
      default: "/",
    },
    formName: String,
  },
};
</script>
<style scoped lang="scss">
.module-view__form {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translate(0%, -50%);
  display: grid;
  gap: 20px;
  padding: 20px;
  width: calc(100% - 20px);
  background: linear-gradient(var(--bgMain) 0 0) padding-box,
    var(--linearMain) border-box;
  border: 4px solid transparent;
  border-radius: 8px;

  @media (min-width: 540px) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
  }
}
</style>