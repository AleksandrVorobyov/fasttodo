<template lang="pug">
button.module-view__btn-exit(
  :type="btnType",
  :class="btnClass",
  :id="btnId",
  @click="$emit('clickAction', $event)"
) {{ btnText }}
</template>
<script>
export default {
  name: "module-view-btn-exit",
  props: {
    btnType: {
      type: String,
      default: "button",
    },
    btnClass: String,
    btnId: String,
    btnText: String,
  },
  emits: ["clickAction"],
};
</script>
<style scoped lang="scss">
.module-view__btn-exit {
  position: relative;
  width: fit-content;
  display: block;
  padding: 5px 10px;
  border: 1px solid #fff;
  outline: none;
  background: transparent;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 0.5px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: color 0.4s linear;
  background: rgba(255, 255, 255, 0.5);

  &:hover {
    color: rgb(250, 169, 169);
  }
}
</style>