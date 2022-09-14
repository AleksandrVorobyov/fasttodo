<template lang="pug">
form.view-module__form(
  :class="formClass",
  :id="formId",
  :name="formName",
  :action="formAction"
)
  slot
</template>
<script>
export default {
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
.view-module__form {
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
</style>